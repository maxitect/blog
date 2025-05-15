---
title: "From Strawberries to Dropout: How I Built a RAG Chatbot That Knows When to Shut Up"
date: "2025-05-16"
github: "https://github.com/maxitect/telegram-rag-chatbot"
tags: ["ai", "software", "workshops", "machine learning"]
---

This week, I attended a fascinating workshop at [Founders & Coders](https://www.foundersandcoders.com/) led by a RAG and AI agent expert from Neo4j. I decided to attend because at [Tandem](https://runintandem.com/), we're working on an AI IT helpdesk bot for Teams that will answer employee questions based on internal documents and create helpdesk tickets when human intervention is needed. Rather than diving straight into complex enterprise solutions, I decided to build a simpler version first to understand the fundamentals properly.

What I ended up with was a Telegram RAG chatbot that indexes my blog posts and provides contextual answers. It's turned out to be a surprisingly effective tool for testing RAG concepts, and building it taught me valuable lessons about chunking strategies, prompt engineering, and the practical differences between building document retrieval systems from scratch versus using modern libraries.

If you want to check it out, [speak to my bot here](https://t.me/maxitect_bot).

## From training neural networks to off-the-shelf solutions

In my previous post, [When the Machine Stops Learning](/posts/when-the-machine-stops-learning-reviving-a-collapsed-neural-network), I wrote about building a document retrieval system from scratch using neural networks and the MS MARCO dataset. That was an excellent learning exercise - understanding how embeddings work, implementing cosine similarity, and debugging collapsed models. But when you need to build something that actually works reliably, sometimes the best approach is to stand on the shoulders of giants.

This project represents the opposite philosophy: leverage proven libraries, pre-trained embeddings, and robust APIs to create something functional quickly. It's the difference between learning to build an engine versus learning to drive.

## Practising what I preach

Given my recent exploration of [AI-assisted development](/posts/ai-in-the-loop-reflections-on-delivering-the-hula-workshops-at-founders-coders), I decided to lean on AI to help build this RAG chatbot to accelerate the process and my learning. I followed the IQRE methodology I'd been advocating: **Iterate**, **Question**, **Review/Create**, and **Explain**. This proved particularly valuable when refining the system's prompt engineering.

Initially, when AI generated a boilerplate OpenAI client module, it suggested this prompt for the RAG system:

```markdown
You are a helpful assistant. Use the following context to answer the
user's question. If the context doesn't contain relevant information,
say so.

Context:
{context}
User question: {message}
```

This seemed reasonable at first glance. However, the bot was still drawing on its general knowledge rather than restricting itself to the provided context. When I sent "Strawberries are green", the bot confidently responded:

> _The statement "Strawberries are green" is incorrect. Strawberries are typically red when ripe. They start out green when unripe, but they are generally considered to be red at maturity._

This was factually correct but not relevant - there is nothing about strawberries in my blog posts (at least until now!). The bot was essentially reverting to general ChatGPT behaviour rather than staying within the retrieved context.

The issue was that it was too vague. The instruction "If the context doesn't contain relevant information, say so" wasn't precise enough to prevent the AI from falling back on its general knowledge. After several iterations, I settled on this more targeted version:

```markdown
Based on the context provided below, extracted from the results of
this query: {message}, answer the user's question. If the context
doesn't contain relevant information, say so. Do not try to make
anything up or infer additional information than the context provided.

Context:
{context}
```

The key addition was the explicit boundary: "Do not try to make anything up or infer additional information than the context provided." This single authorative instruction was enough to ensure consistent relevance checks. The 'context' variable here contains the actual content retrieved from ChromaDB - chunks of my blog posts that are semantically similar to the user's query (the 'message').

And there it was. With the updated prompt, the bot behaves as intended:

> **Tell me about dropout**  
> _Dropout is a regularisation technique that randomly disables neurons during training. It helps to make the neural network more robust by preventing it from relying on a few dominant pathways._

> **What is the dropout rate in schools?**  
> _The context does not contain relevant information about the dropout rate in schools._

The bot correctly answered about neural network dropout (which appears in my machine learning post) whilst refusing to answer about school dropout rate (which doesn't). This demonstrates that effective prompting is about precision and brevity.

## Why ChromaDB for this application

After researching various vector database options, ChromaDB emerged as an appropriate solution for this project because it is well-documented, hosted locally and quick to set up. It's essentially a one-stop shop that handles three critical tasks:

1. **Downloads pre-trained embeddings** from Hugging Face automatically
2. **Embeds your documents** without requiring manual model management
3. **Sets up a local vector database** with minimal configuration

The alternative would have been managing separate embedding models, handling vectorisation manually, employing a seperate library for RAG and configuring a more complex database setup. ChromaDB cleanly abstracts all of this complexity whilst remaining surprisingly fast for local development.

```python
class ChromaModule:
    def __init__(
            self,
            persist_directory: str = "./chroma_db",
            collection_name: str = "documents"
    ):
        self.client = chromadb.PersistentClient(path=persist_directory)
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}
        )
```

The simplicity is what sealed it for this particular use-case in the context of a one-day workshop. Three lines of code give you a persistent, optimised vector database with cosine similarity search.

## The chunking conundrum

One of the most critical decisions in any RAG system is how to chunk your documents. Too large, and your embeddings become too general to match specific queries effectively. Too small, and you lose crucial context that makes answers meaningful.

I experimented with various chunk sizes and eventually settled on 500 characters as a baseline, with smart paragraph-aware chunking:

```python
def chunk_text(
        self, text: str, chunk_size: int = 500
) -> List[str]:
    chunks = []
    paragraphs = text.split('\n\n')
    current_chunk = ""

    for paragraph in paragraphs:
        if len(current_chunk) + len(paragraph) > chunk_size:
            if current_chunk:
                chunks.append(current_chunk.strip())
                current_chunk = paragraph
            else:
                words = paragraph.split()
                for i in range(0, len(words), chunk_size // 10):
                    chunk = ' '.join(words[i:i + chunk_size // 10])
                    chunks.append(chunk)
        else:
            current_chunk += (
                "\n\n" + paragraph if current_chunk else paragraph
            )

    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks
```

This approach respects paragraph boundaries whilst ensuring chunks remain within a manageable size. For my blog posts, which contain code snippets and technical explanations, this preserved enough context whilst creating sufficiently specific embeddings.

## Implementing retrieval-augmented generation

The RAG pipeline itself is refreshingly straightforward once you have the pieces in place:

```python
def get_response(self, message: str) -> str:
    context = self.chroma.get_context_for_query(message)

    response = self.client.responses.create(
        model="gpt-4.1-nano",
        input=prompt
    )
    return response.output_text
```

The `get_context_for_query` method handles the vector similarity search and formats the results into a coherent context string, respecting a maximum length to avoid overwhelming the language model:

```python
def get_context_for_query(
        self, query: str, max_context_length: int = 3000
) -> str:
    results = self.query_documents(query, n_results=5)

    context_parts = []
    current_length = 0

    for result in results:
        content = result['content']
        source = result['metadata']['source']

        part = f"From {source}:\n{content}\n\n"

        if current_length + len(part) > max_context_length:
            break

        context_parts.append(part)
        current_length += len(part)

    return ''.join(context_parts)
```

## Telegram as the interface

I chose Telegram for its simplicity and universal accessibility. It was super straightforward and fast to get a bot up and running directly inside the app without needing to set up a dev account or tweaking any settings. I was able to set simple instructions of how to do so in the readme:

```markdown
1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot`
3. Choose a name for your bot
4. Choose a username ending in `bot`
5. Save the API token provided
```

Using Telegram meant I could test the bot immediately without deploying web interfaces - the response time was impressively quick for local development.

The bot supports two main interactions:

- Direct messages for RAG-powered conversations
- `/query` command for explicit document searches
- `/code` command to retrieve the repository link

```python
async def handle_message(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
) -> None:
    message_text = update.message.text
    response = openai_module.get_response(message_text)
    await update.message.reply_text(response)
```

This kept the interface minimal whilst remaining fully functional across any device.

## Lessons for enterprise applications

Building this prototype provided valuable insights for our Teams bot project at Tandem:

**Chunking strategy matters**. Enterprise documents often contain mixed content - technical specifications, policies, FAQs. Different document types may require different chunking approaches.

**Prompt engineering is still relevant**. It can prevent hallucination in professional contexts. The cost of providing incorrect information in an IT helpdesk scenario far outweighs being occasionally unhelpful.

**Document metadata is critical at scale**. Tracking source documents, chunk indices, and content types enables better debugging and user transparency.

## The beauty of modern tooling

What struck me most was how accessible RAG has become. ChromaDB handles the complex vector operations, OpenAI provides reliable language understanding, and Telegram offers a robust messaging API. The entire system runs locally for development and scales straightforwardly for production.

This isn't about avoiding learning fundamentals - understanding how embeddings and neural networks function (as in my previous post) remains valuable. Rather, it's about choosing the right tool for the task. Sometimes you need to build the engine; sometimes you just need to drive.

This prototype came together in a single day, and it’s intentionally lean. There’s no confidence thresholding, no reranking of retrievals, no formal evaluation - just structured prompts and a willingness to iterate. But even at this early stage, it surfaced key behaviours worth formalising later. The simplicity was a constraint, not a flaw, and that constraint helped highlight what actually matters in getting a chatbot to stay quiet when it should.

For anyone considering RAG applications, I'd recommend starting with a simple prototype like this. It's remarkably enlightening to see how quickly you can go from idea to functional system, and the lessons learned scale directly to more complex enterprise applications.
