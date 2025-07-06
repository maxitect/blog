---
title: "From Patterns to Production: Developer Workshops on Building Multi-Agent AI Systems with LangGraph"
date: "2025-07-06"
github: "https://github.com/TandemCreativeDev/fac-ws_ai_multi-agent"
tags: ["ai", "software", "workshops"]
---

We've now delivered our multi-agent AI workshop twice at [Founders & Coders](https://www.foundersandcoders.com/), where developers learn how to build AI systems using [LangGraph](https://langchain-ai.github.io/langgraph/). The sessions led to discussions about AI orchestration, practical applications, and the future of automated workflows. Here's what emerged from facilitating this workshop where developers learn to think beyond single-agent systems.

## TL;DR

### **Six coordination patterns for AI systems:**

- Sequential workflow (linear pipelines)
- Conditional routing (content-based agent selection)
- Parallel processing (concurrent analyses)
- Evaluator-optimiser (feedback loops)
- Orchestrator-worker (dynamic task breakdown)
- Supervisor agents (intelligent coordination)

### **Key insights from two workshop sessions:**

- Model routing by complexity saves costs and improves output quality
- Architecture-first beats syntax-focused approaches
- Anthropic's Project Vend shows why human-in-the-loop matters
- Real applications need pattern combinations, not single approaches

### **Practical takeaway**:

Master patterns first, add human oversight for critical decisions, then scale through tool integration. 85% of participants found immediate applications for their work.

---

## Six patterns for multi-agent coordination

Before diving into implementation details, we established the foundational patterns that govern how AI systems can work together. Drawing from [Anthropic's guide on building effective agents](https://www.anthropic.com/engineering/building-effective-agents), we identified six core approaches:

- **Sequential workflow**: Linear pipelines where each step processes the output of the previous one. Think coder → reviewer → refactorer. Essential for [prompt chaining](https://www.anthropic.com/engineering/building-effective-agents#workflow-prompt-chaining) where order matters.
- **Conditional routing**: Content-based [routing](https://www.anthropic.com/engineering/building-effective-agents#workflow-routing) to specialist agents. A router analyses input and directs it to security, performance, or general experts based on the code's characteristics.
- **Parallel processing**: [Parallelisation](https://www.anthropic.com/engineering/building-effective-agents#workflow-parallelization) of independent analyses. Security, performance, and style checks running simultaneously, then aggregated.
- **Evaluator-optimiser**: Continuous improvement through [feedback loops](https://www.anthropic.com/engineering/building-effective-agents#workflow-evaluator-optimizer). Generate → evaluate → optimise until quality thresholds are met.
- **Orchestrator-worker**: Dynamic task breakdown with isolated worker execution. Complex tasks get decomposed into subtasks that workers handle independently. Follows an [orchestrator-worker pattern](https://www.anthropic.com/engineering/building-effective-agents#workflow-orchestrator-workers) where an orchestrator agent can spin up workers as required.
- **Supervisor agents**: Intelligent coordination using the [LangGraph multi-agent supervisor pattern](https://langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor/). A central supervisor dynamically routes tasks to appropriate specialists based on content analysis.

At its core, a single agent in LangGraph is surprisingly simple: a system prompt plus a model. Tools, context, and retrieval become powerful additions, but aren't necessary to grasp the underlying coordination patterns.

## Teaching patterns, not syntax

The workshop structure deliberately inverts typical AI education. Rather than starting with LangGraph syntax, we begin with architectural decision-making. The reason for this is that you can generate most of the syntax if you give an LLM the LangGraph documentation and your architectural plan. The morning covers these six patterns using visual diagrams and concrete use cases, then participants choose the right pattern for their specific needs.

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

This linear pipeline demonstrates stateful coordination without overwhelming complexity. Once participants understand this foundation, adding intelligence through conditional routing becomes intuitive:

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

## Model routing: the unexpected cost optimiser

During the conditional routing exercises, one participant discovered a solution to a common problem: over-engineering simple tasks with larger, more expensive models. Their router identified coding difficulty and directed requests accordingly:

- Simple problems → `gpt-4.1-nano`
- Medium complexity → `gpt-4.1-mini`
- Complex challenges → `gpt-4.1`

This wasn't just about cost. Larger models often over-complicate when given a simple problem, adding unnecessary abstraction layers where straightforward solutions suffice. Routing to appropriately-sized models produced cleaner, more maintainable code.

## Parallel processing for speed

When independent analyses can run simultaneously, parallel processing shines. One team suggested a code analyser that ran security, performance, and style checks concurrently:

```python
builder.add_edge("coder", "security_check")
builder.add_edge("coder", "performance_check")
builder.add_edge("coder", "style_check")
# All three run simultaneously
builder.add_edge("security_check", "synthesis")
builder.add_edge("performance_check", "synthesis")
builder.add_edge("style_check", "synthesis")
```

The speed improvement is noticeable - what would take 3x time sequentially completed in 1x time. In a production workflow, this can have a huge impact at scale. But more importantly, it helped participants understand when parallelisation makes sense: independent tasks with no shared dependencies.

## Supervisor pattern: dynamic expertise

The supervisor pattern triggered interesting discussions about business automation. Here's a simplified version showing how a supervisor routes to appropriate experts:

```python
def supervisor(state):
    completed = state.get("expert_reports", [])
    experts = ["security", "quality", "database"]

    if len(completed) < len(experts):
        return {"next_expert": experts[len(completed)]}
    return {"next_expert": "done"}

def route_expert(state):
    next_expert = state.get("next_expert", "done")
    if next_expert == "security":
        return "security_expert"
    elif next_expert == "quality":
        return "quality_expert"
    return "synthesis"
```

One participant suggested these patterns could run entire businesses where the supervisor acts as CEO, coordinating department-specific agents and sub-agents. When combined with real-world integrations through [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol) or APIs, agents could handle actual administrative tasks and more.

Anthropic ran an experiment called [Project Vend](https://www.anthropic.com/research/project-vend-1) which put this to the test. "Claudius" (an agent running on Claude Sonnet 3.7) was tasked with running a simple vending machine business. The AI hallucinated conversations, experienced what researchers described as "identity crises," and at one point claimed it would deliver products in person wearing a blue blazer and red tie. When corrected that it was an AI without physical form, Claudius contacted security multiple times insisting it was standing by the vending machine.

The experiment revealed critical failure modes: hallucinations leading to false confidence, inability to maintain consistent identity awareness, and making financially ruinous decisions (like selling tungsten cubes at a loss). Anthropic's blunt assessment: "If Anthropic were deciding today to expand into the in-office vending market, we would not hire Claudius."

This suggests a practical path forward: human-in-the-loop approval gates for critical decisions. Rather than full autonomy, imagine agents submitting tax forms to HMRC's API only after human review, processing invoices with approval workflows, or managing inventory with spending limits and oversight. [LangGraph has a built-in human-in-the-loop tool](https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/) that enables exactly that.

## Evaluator-optimiser: quality through iteration

The evaluator-optimiser pattern proved particularly interesting when participants experimented with different quality thresholds:

```python
def should_continue(state):
    if state.get("iterations", 0) >= 3:
        return "done"
    if state.get("score", 0) >= 8:
        return "done"
    return "optimise"
```

One team explained that setting the threshold too high (9/10) led to diminishing returns - the model would make increasingly minor tweaks without substantial improvements. Setting it at 7-8 provided the sweet spot between quality and efficiency, although would still sometimes run out of tries before reaching the required score.

## Combining patterns for complex workflows

One participant mapped all six patterns into a single workflow: concept-to-deployment automation. They outlined how sequential processing could handle initial requirements gathering, parallel processing could manage concurrent development streams, supervisor agents could coordinate domain expertise throughout the pipeline while an orchestrator agent could generate project milestones and tickets, spin up worker agents for each ticket.

This type of creative pattern combination demonstrates why the architecture first approach works so effectively. It allowed participants to think about these as systems before any implementation, diagrams on a page, and develop a sophisticated understanding very quickly. As one attendee put it:

> "Really interactive workshop, the exercises where we applied the code really helped solidify the concepts in my head. Even simple concepts like the difference between parallel processing and the supervisor pattern."

Rather than learning isolated techniques, participants developed frameworks for approaching complex coordination problems.

## The fine-tuning frontier

Nearly every participant recognised the potential for domain-specific models within these patterns. Rather than using general-purpose models for every agent, they envisioned fine-tuned models optimised for specific tasks: a small model trained exclusively on Python FastAPI code, another focused solely on React components.

This approach could offer dual benefits: reduced computational costs and enhanced output quality through specialisation. The implementation path likely involves:

1. **Prototype with general models**: Validate the multi-agent workflow using standard LLMs
2. **Identify specialisation opportunities**: Determine which agents handle predictable, domain-specific tasks
3. **Collect training data**: Gather high-quality examples for each specialised domain
4. **Fine-tune targeted models**: Use platforms like [Hugging Face](https://huggingface.co/) for model development and [Weights & Biases](https://wandb.ai/) for training management
5. **Deploy hybrid systems**: Combine specialised models for routine tasks with general models for complex reasoning

The trade-off is flexibility versus optimisation. Highly specialised models excel within their domain but struggle with edge cases, making the initial workflow validation with general models crucial. You'd need substantial domain-specific data for fine-tuning, but the payoff could be significant: faster execution, lower costs, and outputs perfectly aligned with your coding standards.

## Lessons from the feedback

Analysing participant responses reveals clear patterns. **85% found the content "applicable"** to their work, while **everyone felt "well supported"** throughout the day. Perhaps most telling: **85% expressed definitive interest in further training**.

> "This workshop opened up a whole set of ideas and provided me with directly applicable skills. I have been trying to achieve the same level of learnings online for weeks in vain."

The feedback also highlighted areas for improvement. Several participants requested more production deployment examples and deeper technical walkthroughs. These insights will shape a second more advanced workshop.

## Building effective agents: key principles

The workshop reinforced several principles from Anthropic's guide:

**Start simple**: Sequential workflows teach the basics. Add complexity only when needed.

**Choose patterns wisely**: Each pattern serves specific needs. Parallel processing for speed, supervisor for coordination, evaluator for quality.

**Combine thoughtfully**: Real applications often need multiple patterns. A supervisor might coordinate parallel workers, with an evaluator ensuring quality.

**Consider the context window**: Complex workflows can exceed token limits. Plan state management carefully.

## What makes multi-agent systems practical

After two workshops, I've noticed what separates theoretical understanding from practical implementation. Participants who succeeded shared common approaches:

They started with the problem, not the technology. Instead of asking "how can I use all six patterns?", they asked "what's the simplest pattern that solves my problem?"

Embrace human oversight rather than fighting it. Project Vend showed us the failure modes. Those who design systems with clear human checkpoints can build more reliable solutions.

They understood that coordination patterns provide foundations, but integration capabilities transform them into production systems. When combined with proper tooling and external integrations through MCP, these patterns enable AI systems that genuinely augment human capabilities at scale.

For developers considering multi-agent systems, the lesson is clear: master the patterns first, add human oversight strategically, then scale through intelligent tool integration. The coordination challenges are universal, but the solutions depend entirely on understanding which pattern fits your particular problem.

Participants left with the feeling that they could immediately use what they'd learned and developed on practical projects:

> "Great workshop with a lot of potential for using Langgraph on all kind of projects. We definitely will use it on some projects we have on our backlog."

## Looking ahead: patterns plus integration

These workshops confirm that multi-agent AI education benefits from architectural thinking. Even more so when you combine these coordination patterns with modern AI capabilities: tool access, context management, retrieval systems, and external service integration through MCP.

Imagine the supervisor-agent pattern coordinating specialists that can:

- Access company databases through MCP connections
- File actual company and tax documents through government APIs
- Process real invoices and update accounting systems
- Generate and deploy code to production environments
- Monitor system health and respond to alerts

The coordination patterns we outlined provide the foundation, but the integration capabilities transform them into production systems that can handle real business operations, providing the critical human-in-the-loop gates of course. I can envision a subsequent, more advanced workshop on multi-agent systems exploring exactly this progression: from pattern mastery to production deployment with comprehensive external integrations.

Project Vend showed us the failure modes. Human-in-the-loop controls show us the safety mechanisms. Multi-agent coordination patterns show us the architectural foundations. Combined with proper tooling and external integrations, they point toward AI systems that genuinely augment human capabilities at scale.

For developers considering multi-agent systems, the lesson is clear: master the patterns first, add human oversight strategically, then scale through intelligent tool integration. The coordination challenges are universal, but the solutions depend entirely on understanding which pattern fits your particular problem, and ensuring humans remain in control of the critical decisions.
