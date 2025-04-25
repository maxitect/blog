---
title: "When The Machine Stops Learning: Reviving a Collapsed Neural Network"
date: "2025-04-26"
tags: ["machine learning", "neural networks", "debugging", "ai"]
---

Following last week's reflections on the lean coding style of data scientists, my second week at the Machine Learning Institute has been all about debugging neural networks. I experienced the fascinating yet frustrating phenomenon of model collapse whilst working on a document retrieval system using the [MS MARCO](https://microsoft.github.io/msmarco/) dataset. The experience highlighted not just technical pitfalls, but the iterative nature of machine learning development.

## When it all collapses

Model collapse manifested in our retrieval system as all documents receiving identical similarity scores of -0.2393 regardless of their actual relevance to a query. Imagine a recommendation system that suggests the same five books to everyone—not particularly useful.

Our task was building a two-tower neural network architecture that could encode queries and documents into the same embedding space, allowing us to retrieve relevant documents by finding those closest to the query. The model would learn through triplet loss, which encourages the embeddings of queries to be closer to those of relevant documents than to irrelevant ones.

```python
def cosine_similarity(query, document):
    query_norm = torch.norm(query, dim=1, keepdim=True)
    doc_norm = torch.norm(document, dim=1, keepdim=True)
    return torch.sum(
        query * document,
        dim=1
    ) / (query_norm * doc_norm + 1e-8).squeeze()

def triplet_loss_function(
    query,
    relevant_document,
    irrelevant_document,
    margin=0.3
):
    relevant_similarity = cosine_similarity(query, relevant_document)
    irrelevant_similarity = cosine_similarity(query, irrelevant_document)
    # Convert similarity to distance (1 - similarity)
    relevant_distance = 1 - relevant_similarity
    irrelevant_distance = 1 - irrelevant_similarity
    # Compute triplet loss with proper batching (element-wise maximum)
    triplet_loss = torch.clamp(
        relevant_distance - irrelevant_distance + margin, min=0
    )
    return triplet_loss.mean()
```

The function looked sound, but quite soon after the model began its training, every document was receiving the exact same similarity score.

## The parameter puzzle

What made this particularly interesting was that I had just made multiple changes to our training configuration in response to previous training results that suggested overfitting to fine-tune the model:

```python
# Original parameters
MARGIN = 0.3
TWOTOWERS_LR = 0.003
DROPOUT_RATE = 0.2

# Experimental parameters
MARGIN = 0.2  # Decreased
TWOTOWERS_LR = 0.0002  # Decreased
DROPOUT_RATE = 0.3  # Increased
WEIGHT_DECAY = 1e-5  # Added
# Plus gradient clipping
```

Like an overcorrection when driving, I had pushed too far in multiple directions simultaneously. I had been experiencing divergence between training and validation loss—a classic sign of overfitting—and attempted to address it with a barrage of regularisation techniques. But instead of guiding the model toward generalisation, I had effectively overwhelmed it.

## Data preparation matters

The model architecture used a [bidirectional GRU](https://vtiya.medium.com/gru-vs-bi-gru-which-one-is-going-to-win-58a45ede5fba) for encoding both queries and documents:

```python
from torch import nn

class TowerBase(nn.Module):
    def __init__(
        self,
        vocab_size,
        embedding_dim,
        hidden_dim,
        output_dim,
        dropout_rate=0.2,
        skipgram_model=None,
        freeze_embeddings=True
    ):
        super().__init__()
        # Set up embedding layer (either from SkipGram or new)
        if skipgram_model is not None:
            self.embedding = skipgram_model.in_embed
            self.embedding.weight.requires_grad = not freeze_embeddings
        else:
            self.embedding = nn.Embedding(vocab_size, embedding_dim)
        # Bidirectional GRU for encoding
        self.bi_gru = nn.GRU(
            embedding_dim,
            hidden_dim,
            batch_first=True,
            bidirectional=True
        )
        # Projection from GRU output to final embedding space
        self.fc = nn.Linear(hidden_dim * 2, output_dim)
        # Layer normalisation as specified in requirements
        self.layer_norm = nn.LayerNorm(output_dim)
        # Dropout for regularisation
        self.dropout = nn.Dropout(dropout_rate)
```

I chose [GRU](https://en.wikipedia.org/wiki/Gated_recurrent_unit) over [LSTM](https://en.wikipedia.org/wiki/Long_short-term_memory) for several reasons:

1. Better efficiency-to-performance ratio for MS MARCO's scale
2. Simpler architecture with fewer parameters, reducing overfitting risk
3. Sufficient capability for the medium-length sequences in our dataset
4. Lower memory requirements, enabling larger batch sizes

But the true issue lay in our dataset preparation. Here's how I was creating triplets:

```python
class MSMARCOTripletDataset(Dataset):
    def __init__(
        self,
        df,
        max_query_len=20,
        max_doc_len=200,
        max_neg_samples=5
    ):
        queries = df['queries']
        documents = df['documents']
        labels = df['labels']

        # Process lists of lists structure
        for i in range(len(queries)):
            query = queries[i]
            # List of documents for this query
            docs_list = documents[i].tolist()
            # List of labels for these documents
            labels_list = labels[i].tolist()

            # Find positive and negative documents
            pos_idx = labels_list.index(1)
            neg_indices = [j for j in range(
                len(labels_list)) if labels_list[j] == 0]

            pos_doc = docs_list[pos_idx]

            # Limit number of negative samples per positive example
            neg_samples = min(max_neg_samples, len(neg_indices))
            for j in range(neg_samples):
                neg_doc = docs_list[neg_indices[j]]
                self.triplets.append((query, pos_doc, neg_doc))
```

The problem: our negative sampling was taking documents from the "not selected" documents from the dataset, but these "negative" documents could actually be quite relevant to the original query. When using triplet loss, the model learns by comparing distances. If many of our supposed "irrelevant" documents were actually quite relevant, the model couldn't establish a clear decision boundary. To fix this, I decided to use random documents from other unrelated queries as negative samples, and treated all the documents from the same query whether "selected" or not, as positive samples.

## Lessons from the collapse

This experience reinforced several important lessons:

1. **Change one thing at a time**: When debugging, resist the temptation to change multiple parameters simultaneously.

2. **Trust but verify your data pipeline**: Assumptions about data flow can lead to subtle bugs. Log and visualise at each stage.

3. **Understand your loss function**: If your loss function doesn't accurately reflect the problem you're trying to solve, your model will optimise for the wrong thing.

4. **Check your embeddings**: Verify that they're loading correctly and contain the expected information.

The solution wasn't adding more safeguards but returning to basics:

```python
# Simplified configuration that worked
MARGIN = 0.3
TWOTOWERS_LR = 0.003
WEIGHT_DECAY = 0 # removed
DROPOUT_RATE = 0.3
```

By removing the weight decay, returning the margin and learning rate to their original values, and keeping just a moderate dropout rate, the model began learning effectively again. However, the gradient clipping was a useful addition in isolation. This simplification, combined with proper embedding initialisation and improved negative sampling, brought our document retrieval system back from the brink. The final trained model ran for 11 epochs and yield a validation accuracy result of 99.04%.

## Finding balance

As someone trained in software engineering, I found a certain irony in this situation. In my previous blog post, I reflected on how data scientists embrace a leaner approach to code compared to the robust, defensive style of software engineers. Yet here I was, overthinking the regularisation of our model—essentially applying too much "defensive coding" to the learning process itself. Sometimes less truly is more.

This debugging experience revealed the inherently iterative nature of machine learning development. Unlike traditional software where we can often reason through problems deterministically, neural networks require a more empirical approach—hypothesise, experiment, observe, repeat.

The most elegant solution isn't the most engineered one—it's the one that gives the model just enough structure to learn without overwhelming it with constraints.

Here's the formatted markdown for footnotes to append to your post:

## Glossary

1. **Negative Sampling**: Randomly selecting irrelevant documents (same number as relevant ones) to make training manageable
2. **Two Tower Architecture**: Separate encoders for queries and documents to handle their different structures
3. **Triplet Loss**: Trains model to minimise distance between query and relevant documents while maximising distance to irrelevant ones
4. **RNN (Recurrent Neural Network)**: Processes text sequentially to preserve word order and relationships
5. **MLP (Multi-Layer Perceptron)**: A simpler feedforward neural network that can be used as an initial MVP before implementing the more complex RNN encoders
6. **GRU (Gated Recurrent Unit)**: An RNN variant that better manages information flow using gates to improve learning of long-range dependencies
7. **LSTM (Long Short-Term Memory)**: An RNN variant with additional cell state to preserve long-term information throughout the sequence
8. **BiRNN (Bidirectional RNN)**: Processes sequences in both directions to capture context from both past and future tokens
9. **Layer Normalisation**: Technique that scales neural network outputs to prevent vanishing/exploding gradients
10. **Learning Rate Scheduling**: Automatically adjusts learning rate during training to improve convergence
11. **Dropout**: Regularisation technique that randomly disables neurons during training to prevent overfitting
