---
title: "Beyond Solo AI: How Pair-Programming with Claude Code Transforms Team Development"
date: "2025-06-01"
github: "https://github.com/TandemCreativeDev/fac-ws_ai_pair-programming"
tags: ["ai", "software", "workshops"]
---

Last month, I wrote about introducing developers to AI-assisted development through our [HULA framework](/posts/ai-in-the-loop-reflections-on-delivering-the-hula-workshops-at-founders-coders) at [Founders & Coders](https://www.foundersandcoders.com/). The workshop focused on individual developers learning to collaborate effectively with AI while maintaining human oversight. This month, we evolved the concept to explore a different challenge: **how do development teams work together when each developer has their own AI assistant?**

The results revealed valuable insights about coordination, consistency, and the importance of understanding AI's well-established limitations whilst showcasing innovative solutions that emerged from structured team collaboration.

If you are interested to try this out, [this is the material for the day](https://github.com/TandemCreativeDev/fac-ws_ai_pair-programming).

## From Individual AI to Human Pair-Programming with AI

Rather than teaching individuals to work with AI, this workshop paired developers together to collaborate on a project, each with their own Claude Code instance. The task remained straightforward—build a collaborative Kanban board application—but the process explored how teams coordinate when everyone has an AI pair programming partner.

The day followed a structured approach:

**Collaborative conception**: Teams worked together on specifications, architectural decisions, and coding standards using a shared Claude Code instance.

**Parallel implementation**: Developers split to individual machines with separate AI instances, working through structured tickets whilst maintaining coordination.

**Systematic context management**: Given Claude's limited memory, we implemented disciplined context clearing with detailed progress tracking.

**Regular synchronisation**: Progress sync sessions ensured teams stayed aligned despite working with separate AI assistants.

## The Environment Setup Reality Check

One team discovered firsthand why our guidance around environment setup proved critical. Our advice that **framework initialisation, scaffolding and package installation should be handled manually** before engaging AI for development work, given AI tools' well-documented struggles with rapidly changing dependencies and package versions.

However, one team decided to test whether Claude could manage the entire setup process. This resulted in time lost to debugging, compatibility issues, failed installations, and outdated configuration suggestions that would have been current months ago but were now obsolete.

As one participant reflected: "A review of the created tickets would have been helpful, along with some tips for successful project setup."

This highlighted a critical principle: **when you start with bad foundations, every subsequent task requires rework**. The teams that followed our recommended approach progressed smoothly through development, whilst those who attempted full AI delegation found themselves rebuilding foundations while their teammates moved ahead with actual feature development.

## Coordination Through Living Documents

The workshop revealed coordination challenges we'd anticipated from our preparatory testing. Each Claude Code conversation operates independently—no shared memory between instances, no collective understanding of the project's evolving state. This is precisely why we'd built structured prompts like `DEPENDENCY CHECK` and emphasised shared specification documents in our framework.

However, one team of three developers created an unexpected innovation. They prompted Claude to generate dependency graphs alongside their development tickets, evolving simple task lists into sophisticated visual coordination systems:

```
SETUP-1 ─┬─ SETUP-2 ────── UI-4 ────────────────────┐
         │                                          │
         │                               ┌── UI-3 ──┼─ FUNC-1A ── FUNC-1B ── ENH-1 ── ENH-2 ── TEST-1
         │                               │          │
         └─ DATA-1 ─┬─ DATA-2A ── UI-1 ─ UI-2 ──────┼─ FUNC-2 ── ENH-3 ─────────────┘
                    │                               │
                    └─ DATA-2B ───────────────┘     │
                    │                               │
                    └─ DATA-2C ───────────────────┘ │
                                                     │
                                                     └─ FINAL-1

                                                     └─ FINAL-2
```

These dependency graphs became living documents where tickets could be "locked" until prerequisites were completed, with each pull request updating the coordination structure. The team subdivided bottleneck tickets like `DATA-2: Create Svelte Stores` into atomic components (`DATA-2A: Basic Tasks Store`, `DATA-2B: UI State Store`, `DATA-2C: Derived Stores`) to prevent cascading blocks.

**This innovation solved a critical coordination problem**: how do you orchestrate multiple AI assistants working on interdependent features? The visual dependency tracking became a shared brain for the team which emerged from the pressure of coordinating three developers rather than the typical pair.

## Context Windows and Persistent Memory

The workshop highlighted Claude's context window limitations—a challenge that affects both individual and team AI usage. Claude Code conversations disappear once closed, unlike browser interactions you can reference later, and long conversations can exceed context limits regardless of whether you're working solo or in a team.

Our solution involved `HISTORY_[NAME].md` files—summaries each developer maintained to preserve context across sessions. However, participants questioned this approach. If context windows have limited capacity, why include potentially irrelevant previous interactions? Some teams found the shared dependency documents more valuable than individual history files.

As one participant noted: "The focus on saving and resetting context is gold," whilst another observed: "I found the documentation and audit trails of work to be really helpful."

This tension highlights the broader challenge of **balancing context preservation with focus**. Individual history files serve as safety nets for developers, but living shared documents often prove more actionable for coordination and project continuity.

## Shared Specifications: The Foundation of Team AI Coordination

Working with multiple AI instances exposed the critical importance of shared specifications. Teams that established comprehensive [`CLAUDE.md`](https://www.maxitect.blog/posts/maximising-claude-code-building-an-effective-claudemd), `FUNCTIONAL.md`, and `ARCHITECTURE.md` files during conception produced far more coherent results than those with informal or inconsistent documentation.

**Standardised prompting becomes even more crucial when everyone has an AI assistant.** Small variations in how developers prompt their Claude instances can lead to dramatically different code styles, architectural assumptions, and implementation approaches. Teams that referenced their shared specifications consistently—always directing Claude to review standards before coding—maintained architectural coherence across multiple development streams.

One participant emphasised this: "The range of prompts was much greater than what I've been using. I will definitely be taking a lot of these into my daily use of AI, particularly the history prompt."

## The IQRE Methodology: Structured Collaboration

Our IQRE methodology (**Iterate**, **Question**, **Review/Create**, **Explain**) proved valuable for maintaining discipline in AI interactions whilst enabling team coordination. Participants consistently expressed surprise at AI's effectiveness: "Continually surprised by just how powerful and effective using AI to code can be from each workshop."

The "Explain" phase became particularly critical—we used structured pull request templates to ensure developers could articulate their AI collaboration process:

```markdown
## How I Worked with Claude

- Initial prompts/ideas I shared
- How I refined Claude's suggestions
- Questions I asked to fill knowledge gaps
- My own contributions beyond Claude's suggestions

## Code Understanding

Demonstrate your understanding of the key code sections by
explaining what each part does and why it's implemented this way

## What I Learned

- New concepts/techniques I discovered
- Challenges faced and how I overcame them
- How I'd approach similar problems in future
```

This template forced developers to reflect on their AI collaboration whilst providing transparency for code review. One participant specifically appreciated "learning the new workflow of using claude code with claude.md files," highlighting how structured approaches to AI assistance create reproducible team practices.

As another noted: "It's fundamental to learn how to use AI as a peer for peer programming, and even more important, to do it in a repeatable and consistent way so that collaboration in teams is possible."

## Human Oversight Scales Differently

Individual AI assistance requires personal discipline to review and understand AI output. Team AI coordination requires systematic processes to ensure multiple streams of AI-generated code integrate coherently.

The workshop demonstrated that **human oversight doesn't simply multiply when you add more AI assistants—it requires qualitatively different coordination mechanisms**. Teams needed shared standards, systematic review processes, and disciplined synchronisation to maintain architectural coherence.

Teams that succeeded weren't those who delegated most to AI, but those who structured their human-AI collaboration most effectively whilst maintaining rigorous coordination between team members.

## Beyond the Workshop: Templated Development

The structured approach we developed extends beyond individual projects. For teams serious about AI-assisted development, creating reusable templates becomes invaluable. We've experimented with cookiecutter templates that establish consistent project structures, environment configurations, and AI collaboration patterns from the start.

Rather than rebuilding standards for each project, teams can codify their learnings into templates that automatically generate appropriate `CLAUDE.md` files, dependency structures, and development workflows. This approach scales the lessons from pair programming workshops into organisational practice.

Several participants requested deeper exploration of applying these techniques to existing codebases rather than greenfield projects. One observed: "Next time, it might be beneficial to start with an existing project—reviewing its structure and functionality—then build on top of it using established standards."

## Practical Takeaways for Development Teams

For teams considering AI pair programming workflows, our workshop suggests several key principles:

**Start simple, not ambitious**: AI's capabilities can tempt teams toward overengineered solutions. The most successful participants resisted feature creep and focused on core functionality first. Technical debt, code review overhead, and knowledge transfer still require significant time investment—even with AI assistance.

**Establish shared specifications early**: Comprehensive `CLAUDE.md`, `FUNCTIONAL.md`, and `ARCHITECTURE.md` files become critical for team coordination when everyone has an AI assistant.

**Handle environment concerns manually**: Save AI assistance for logic and architecture, not tooling and dependencies that change frequently.

**Implement structured coordination**: Living dependency documents, systematic pull request templates, and regular synchronisation points prevent integration chaos.

**Maintain disciplined review processes**: Human oversight requires more structure when coordinating multiple streams of AI-generated code, not less.

## The Road Ahead: From Workshop to Professional Practice

The workshop demonstrated that AI pair programming requires fundamentally different coordination approaches than individual AI assistance. One participant observed: "Working in pairs was perfect; larger teams would have been extremely messy"—though this raises interesting questions about optimal team sizes for AI-assisted development and whether additional coordination mechanisms might enable larger teams to work effectively.

Several participants expressed interest in seeing **"AI being used effectively in real-life workplaces"**, pointing to a key next step: moving beyond workshop environments to professional contexts.

**Emerging orchestration technologies** point toward more sophisticated coordination solutions. Anthropic's Model Context Protocol (MCP) provides "a universal, open standard for connecting AI systems with data sources, replacing fragmented integrations with a single protocol." Think of MCP like a USB-C port for AI applications—it standardizes how applications provide context to LLMs, enabling AI assistants to maintain shared context across different tools and datasets.

Meanwhile, frameworks like LangGraph offer "stateful, orchestration framework that brings added control to agent workflows" with "fine-grained control over both the flow and state of your agent applications". These technologies suggest a future where team AI coordination becomes more systematic—imagine development environments where AI assistants automatically coordinate through standardised protocols, maintaining architectural coherence without requiring manual synchronisation.

Our next workshops will build on these foundations in two directions:

**Human-AI pair programming on legacy codebases**: Moving beyond greenfield projects to explore how teams integrate AI assistance with existing systems—a more realistic professional scenario that many organisations face.

**Multi-agentic system development**: Teaching developers to build the tools behind AI assistants themselves using frameworks like LangGraph, exploring how tool-using AI agents coordinate to complete complex tasks.

The future of team development lies not in replacing human coordination with AI, but in developing orchestration frameworks that leverage AI capabilities whilst preserving human architectural control. Success requires understanding not just effective prompting, but effective team coordination when everyone has an AI assistant.

AI pair programming represents an evolution in how development teams collaborate, requiring new disciplines around specification sharing, coordination mechanisms, and quality assurance. The teams that master these practices early will have significant advantages as AI assistance becomes ubiquitous in software development.
