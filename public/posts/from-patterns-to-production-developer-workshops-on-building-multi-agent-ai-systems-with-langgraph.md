---
title: "From Patterns to Production: Developer Workshops on Building Multi-Agent AI Systems with LangGraph"
date: "2025-07-06"
github: "https://github.com/TandemCreativeDev/fac-ws_ai_multi-agent"
tags: ["ai", "software", "workshops", "machine learning"]
---

We've now delivered our multi-agent AI workshop twice at [Founders & Coders](https://www.foundersandcoders.com/), where developers learn to build AI systems using [LangGraph](https://langchain-ai.github.io/langgraph/). This is our third AI workshop in a series, the first was about [solo AI-assisted development](/posts/ai-in-the-loop-reflections-on-delivering-the-hula-workshops-at-founders-coders) and the second about [working in pairs with AI](/posts/beyond-solo-ai-how-pair-programming-with-claude-code-transforms-team-development). What started as a straightforward technical workshop revealed something more interesting: how developers naturally think about AI coordination when given the right architectural frameworks.

## Teaching patterns, not syntax

The workshop structure deliberately inverts typical AI education. Rather than starting with LangGraph syntax, we begin with architectural decision-making. The reason is simple: you can generate most of the syntax if you give an LLM the LangGraph documentation and your architectural plan. The challenge is knowing which pattern to choose.

We identified six core coordination patterns, drawing from [Anthropic's guide on building effective agents](https://www.anthropic.com/engineering/building-effective-agents):

**Sequential workflow**: Linear pipelines where each step processes the output of the previous one. Essential for [prompt chaining](https://www.anthropic.com/engineering/building-effective-agents#workflow-prompt-chaining) where order matters.

**Conditional routing**: Content-based [routing](https://www.anthropic.com/engineering/building-effective-agents#workflow-routing) to specialist agents based on input characteristics.

**Parallel processing**: [Parallelisation](https://www.anthropic.com/engineering/building-effective-agents#workflow-parallelization) of independent analyses running simultaneously.

**Evaluator-optimiser**: Continuous improvement through [feedback loops](https://www.anthropic.com/engineering/building-effective-agents#workflow-evaluator-optimizer) until quality thresholds are met.

**Orchestrator-worker**: Dynamic task breakdown with isolated worker execution following an [orchestrator-worker pattern](https://www.anthropic.com/engineering/building-effective-agents#workflow-orchestrator-workers).

**Supervisor agents**: Intelligent coordination using the [LangGraph multi-agent supervisor pattern](https://langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor/).

The morning covers these patterns using visual diagrams and concrete use cases, then participants choose the right pattern for their specific needs.

## Prompt chaining: the simple pattern

At its core, a single agent in LangGraph is surprisingly straightforward: a system prompt plus a model. Tools, context, and retrieval become powerful additions, but aren't necessary to grasp the underlying coordination patterns.

Consider the simplest pattern, a sequential workflow of coder → reviewer → refactorer using prompt chaining:

```python
llm = ChatOpenAI(model="gpt-4.1-nano")

def coder(state):
    response = llm.invoke(f"Write Python code for: {state['input']}")
    return {"code": response.content}

def reviewer(state):
    response = llm.invoke(f"Review this code:\n{state['code']}")
    return {"review": response.content}

def refactorer(state):
    response = llm.invoke(f"Based on suggestions, refactor this code:\n{state['code']},\n{state['review']}")
    return {"code": response.content}

builder = StateGraph(State)
builder.add_node("coder", coder)
builder.add_node("reviewer", reviewer)
builder.add_node("refactorer", refactorer)

builder.add_edge(START, "coder")
builder.add_edge("coder", "reviewer")
builder.add_edge("reviewer", "refactorer")
builder.add_edge("refactorer", END)

workflow = builder.compile()
```

This linear pipeline demonstrates stateful coordination without overwhelming complexity. Once participants understand this, adding intelligence through conditional routing becomes intuitive.

## The cost optimiser: model routing

After laying down the foundations with the sequential workflow, we uncovered how to add a node to this graph to evolve into a conditional routing pattern. Consider a simple route to expert node that conditionally consults one of the expert agents depending on the request:

```python
def route_to_expert(state: State) -> str:
    route = state.get("route", "general")
    return f"{route}_expert"

builder.add_conditional_edges("router", route_to_expert, {
    "security_expert": "security_expert",
    "performance_expert": "performance_expert",
    "general_expert": "general_expert"
})
```

During this exercises, one participant discovered an elegant solution going beyond an agent's system prompt programming. Their router identified coding difficulty and directed requests to different models entirely:

- Simple problems → `gpt-4.1-nano`
- Medium complexity → `gpt-4.1-mini`
- Complex challenges → `gpt-4.1`

This wasn't just about cost. Larger models often over-complicate simple problems, adding unnecessary abstraction layers. Routing to appropriately-sized models produced cleaner, more maintainable code.

## Parallel processing revelations

When one team suggested automated test generation across different domains of the same codebase, the speed improvement was immediately noticeable. Rather than waiting for sequential test creation, you had agents writing unit tests, integration tests, and end-to-end tests simultaneously:

```python
builder.add_edge("coder", "unit_test_writer")
builder.add_edge("coder", "integration_test_writer")
builder.add_edge("coder", "e2e_test_writer")
builder.add_edge("unit_test_writer", "test_runner")
builder.add_edge("integration_test_writer", "test_runner")
builder.add_edge("e2e_test_writer", "test_runner")
```

This way, the unit test agent can focus on edge cases and error conditions. The integration agent can think about data flow and API contracts. The end-to-end agent can craft user journey scenarios. Running all three in parallel means comprehensive test coverage without the usual bottleneck of sequential test development.

This helped participants understand when parallelisation makes sense: independent tasks with no shared dependencies. Each testing domain could work from the same codebase without overlapping.

## Business automation: the supervisor CEO

The supervisor pattern triggered the most interesting discussions. One participant suggested this workflow could be set up to run an entire business - the supervisor acting as CEO, coordinating department-specific agents. When combined with real-world integrations through [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol), agents could handle actual administrative tasks, reporting, customer acquisitions and client relations.

Then I mentioned Anthropic's [Project Vend](https://www.anthropic.com/research/project-vend-1) experiment. "Claudius" (an agent running on Claude Sonnet 3.7) was tasked with running a simple vending machine business. The AI hallucinated conversations, experienced what researchers described as "identity crises," and at one point claimed it would deliver products in person wearing a blue blazer and red tie. Anthropic's blunt assessment: "If Anthropic were deciding today to expand into the in-office vending market, we would not hire Claudius."

This sobered the business automation enthusiasm, but pointed toward a practical path: providing human oversight at critical points in the process to ensure teh AI outputs are in line with the business model. What is needed are human-in-the-loop approval gates for those critical decisions, presenting exactly all the information for approval or if not, a process by which changes can be requested. [LangGraph has a built-in human-in-the-loop tool](https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/) that enables exactly that.

## Hyperparametric heaven: the evaluator-optimiser for neural networks

The evaluator-optimiser pattern proved particularly compelling for participants fresh from [MLX](https://ml.institute/), where they'd spent weeks wrestling with hyperparameter optimisation for neural networks and language models. One team immediately saw how this could automate the tedious trial-and-error of training:

```python
def should_continue(state):
    if state.get("epochs", 0) >= 10:
        return "done"
    if state.get("val_loss", float('inf')) <= 0.15:
        return "done"
    return "optimise"
```

Having just emerged from manually adjusting learning rates, batch sizes, and dropout parameters for their LLM training, they were interested in the prospect of an agent that could intelligently modify hyperparameters based on validation metrics. The sporadic nature of neural network training - where small parameter changes can cause dramatic performance swings - made this pattern particularly appealing.

I've experienced this first-hand in my own ML work and in fact wrote a whole [post describing the debugging cycle of model collapse](/posts/when-the-machine-stops-learning-reviving-a-collapsed-neural-network).

## Combining patterns for complex workflows

One participant mapped all six patterns into a single workflow: concept-to-deployment automation. Sequential processing for initial requirements gathering, parallel processing for concurrent development streams, supervisor agents coordinating domain expertise, orchestrator agents generating project milestones and spinning up worker agents for each ticket.

This type of creative pattern combination demonstrates why the architecture first approach works so effectively. It allowed participants to think about these as systems before any implementation, diagrams on a page, and develop a sophisticated understanding very quickly. As one attendee put it:

> "Really interactive workshop, the exercises where we applied the code really helped solidify the concepts in my head. Even simple concepts like the difference between parallel processing and the supervisor pattern."

Rather than learning isolated techniques, participants developed frameworks for approaching complex coordination problems.

## What the feedback revealed

**85% found the content "applicable"** to their work, while **everyone felt "well supported"** throughout the day. Perhaps most telling: **85% expressed definitive interest in further training**.

> "This workshop opened up a whole set of ideas and provided me with directly applicable skills. I have been trying to achieve the same level of learnings online for weeks in vain."

The feedback also highlighted areas for improvement. Several participants requested more production deployment examples and deeper technical walkthroughs. These concepts detract from the architectural patterns for this introduction workshop but will form the basis for a more advanced workshop.

Nearly every participant recognised the potential for domain-specific models within these patterns. Rather than using general-purpose models for every agent, they envisioned fine-tuned models optimised for specific tasks: a small model trained exclusively on Python FastAPI code, another focused solely on React components.

## Practical takeaways from facilitating

After two workshops, I've noticed what separates theoretical understanding from practical implementation. Participants who succeeded shared common approaches:

They started with the problem, not the technology. Instead of asking "how can I use all six patterns?", they asked "what's the simplest pattern that solves my problem?"

They embraced human oversight rather than fighting it. Project Vend showed us the failure modes. Those who design systems with clear human checkpoints can build more reliable solutions.

They understood that coordination patterns provide foundations, but integration capabilities transform them into production systems. When combined with proper tooling and external integrations through MCP, these patterns enable AI systems that genuinely augment human capabilities.

The coordination challenges are universal, but the solutions depend entirely on understanding which pattern fits your particular problem. Master the patterns first, add human oversight strategically, then scale through intelligent tool integration.

As one participant noted:

> "Great workshop with a lot of potential for using Langgraph on all kind of projects. We definitely will use it on some projects we have on our backlog."

The architecture-first approach works because it allows developers to think about AI coordination as a systems problem rather than a syntax challenge. That mindset shift makes all the difference between theoretical knowledge and practical implementation.
