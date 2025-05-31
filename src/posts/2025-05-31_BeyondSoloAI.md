---
title: "Beyond Solo AI: How Pair-Programming with Claude Code Transforms Team Development"
date: "2025-05-31"
github: "https://github.com/TandemCreativeDev/fac-ws_ai_pair-programming"
tags: ["ai", "software", "workshops"]
---

Following our successful [HULA framework workshops](/posts/ai-in-the-loop-reflections-on-delivering-the-hula-workshops-at-founders-coders), we evolved the concept at [Founders & Coders](https://www.foundersandcoders.com/) to explore a different challenge: **how do development teams coordinate when each developer has their own AI assistant?** Rather than teaching individuals to work with AI, this workshop paired developers to collaborate on projects whilst each maintained separate Claude Code instances.

The results exceeded expectations: **90% of participants found the content relevant**, **65% felt very well supported**, and **every team completed functional Kanban applications with persistent storage**. More importantly, the structured team coordination revealed a powerful innovation that points toward scalable solutions for larger development teams.

## From Individual AI to Team Coordination

Participants formed pairs (with one group of 3) and the day followed a deliberate progression designed to surface coordination challenges:

- **Collaborative conception**: Teams worked together using a shared Claude Code instance to develop specifications, architectural decisions, and coding standards. This established common ground before splitting into parallel development.

- **Parallel implementation**: Developers moved to individual machines with separate AI instances, working through structured tickets whilst maintaining coordination through shared documentation.

- **Systematic context management**: Given [Claude's limited memory](/posts/maximising-claude-code-building-an-effective-claudemd), we implemented disciplined context clearing with detailed progress tracking through `HISTORY.md` files—summaries each developer maintained to preserve context across sessions.

- **Regular synchronisation**: Progress sync sessions ensured teams stayed aligned despite working with separate AI assistants.

The task remained straightforward, build a collaborative Kanban board application, but the process explored how teams coordinate when everyone has an AI pair programming partner.

## The IQRE Methodology in Team Context

Our established IQRE methodology (**Iterate**, **Question**, **Review/Create**, **Explain**) proved valuable for maintaining discipline in AI interactions whilst enabling team coordination. The "Explain" phase became particularly critical through structured pull request templates:

```markdown
## How I Worked with Claude

- Initial prompts/ideas I shared
- How I refined Claude's suggestions
- Questions I asked to fill knowledge gaps
- My own contributions beyond Claude's suggestions

## Code Understanding

Demonstrate your understanding by explaining what each key section does

## What I Learned

- New concepts/techniques discovered
- Challenges faced and solutions found
```

As one participant noted:

> "I think that it's fundamental to learn how to use AI as a peer for peer programming, and, even more important, to do it in a repeatable and consistent way so that collaboration in teams is possible. This workshop gives you a workflow that you can use yourself to always be in control of your code, and share with your team." "The range of prompts was much greater than what I've been using. I will definitely be taking a lot of these into my daily use of AI, particularly the history prompt."

## Shared Specifications: The Foundation of Team AI Coordination

Working with multiple AI instances exposed the critical importance of shared specifications, the content of some of these specs are discussed in more detail in my previous [AI in the loop](/posts/ai-in-the-loop-reflections-on-delivering-the-hula-workshops-at-founders-coders). Teams established comprehensive [`CLAUDE.md`](/posts/maximising-claude-code-building-an-effective-claudemd), `FUNCTIONAL.md`, and `ARCHITECTURE.md` files during conception, creating common standards before splitting into parallel development.

**Standardised prompting becomes crucial when everyone has an AI assistant.** Small variations in how developers prompt their Claude instances can lead to dramatically different code styles, architectural assumptions, and implementation approaches. Teams that consistently referenced shared specifications—always directing Claude to review standards before coding—maintained architectural coherence across multiple development streams.

One participant emphasised:

> "Excellent experience of collaborative development with AI supporting. I found the documentation and audit trails of work to be really helpful."

## Context Windows and the Documentation Challenge

The workshop highlighted Claude's context window limitations. This is a challenge affecting both individual and team AI usage. Our initial approach involved `HISTORY.md` files, summaries each developer maintained to preserve context across sessions when Claude conversations exceeded limits or needed to be reset.

However, participants questioned this approach. If the context window is precious, why include potentially irrelevant previous interactions? Some teams found shared dependency documents more valuable than individual history files, especially when these are treated as live documents, leading to an unexpected innovation.

## The Core Discovery: Live Documentation as Team Coordination

Rather than maintaining individual `HISTORY.md` files as we'd suggested, one three-developer team created a living `TICKETS.md` document that evolved throughout development:

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

This wasn't a static dependency chart. The team continuously updated ticket statuses, subdivided bottleneck tasks, and "locked" dependencies in real-time. When `DATA-2: Create Svelte Stores` became a blocking issue, they immediately split it into atomic components (`DATA-2A: Basic Tasks Store`, `DATA-2B: UI State Store`, `DATA-2C: Derived Stores`) to enable parallel progress.

**This innovation solved a critical coordination problem**: how do you orchestrate multiple AI assistants working on interdependent features? The visual dependency tracking became a shared brain for the team, emerging from the pressure of coordinating three developers rather than the typical pair that the workshop was planned for.

## Environment Setup: The Reality Check

One practical lesson emerged around AI delegation boundaries, revealing an uncomfortable irony. Teams that attempted full environment setup through Claude—scaffolding, dependencies, framework initialisation—encountered predictable delays as AI tools consistently suggested outdated patterns (deprecated Next.js routing conventions, obsolete package versions). This creates a frustrating paradox: the very boilerplate work that AI should eliminate becomes more time-consuming when AI gets it wrong, forcing developers to spend more time on mundane setup tasks rather than less.

Our guidance that **framework initialisation, scaffolding and package installation should be handled manually** before engaging AI for development work proved critical. Teams following this approach progressed smoothly through feature development whilst those attempting full AI delegation found themselves rebuilding foundations as teammates moved ahead.

As one participant reflected: **"A review of the created tickets would have been helpful, along with some tips for successful project setup."** This highlighted the principle: **when you start with bad foundations, every subsequent task requires rework**.

## Why Live Documentation Trumps Individual Context

The `TICKETS.md` approach revealed why shared living documentation becomes more valuable than individual context preservation when coordinating multiple AI instances:

- **Prevented duplicate work** through clear ownership assignment
- **Enabled intelligent work breakdown** when bottlenecks emerged
- **Provided shared context** that any team member could reference with their AI
- **Created audit trails** for decision-making and progress tracking

Individual history files, by contrast, may consume precious context window space unnecessarily. The live documentation approach optimised for team coordination rather than individual AI sessions.

## Team Coordination at Scale

Several participants requested deeper workplace integration, noting: **"AI being used effectively in real-life workplaces"** as their primary interest. The `TICKETS.md` innovation points toward broader applications in professional development environments, all enabled through [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol) connections:

- **GitHub Issues integration** for automated ticket management
- **Jira synchronisation** for enterprise environments
- **Slack integration** for real-time team notifications
- **CI/CD pipeline triggers** based on ticket completion

## Multi-Agent Coordination: The Next Evolution

The coordination challenges we observed point toward emerging solutions in AI orchestration. Our upcoming workshop series explores two complementary approaches:

**Human-AI pair programming on legacy codebases**: Moving beyond greenfield projects to examine how teams integrate AI assistance with existing systems—addressing the professional scenario that **"most engineers are going to be working on existing projects"**.

**Multi-agent system development using [LangGraph](https://www.langchain.com/langgraph)**: Teaching developers to build coordinated AI systems that handle complex, multi-step workflows whilst maintaining human oversight. Think supervisor agents that coordinate specialist AI workers through structured dependency graphs.

Our workshop material includes six progressive patterns, from simple sequential workflows to production-ready multi-agent systems with error handling and human-in-the-loop approval gates. These patterns could solve the coordination problems we observed manually by encoding team coordination logic into AI systems.

Consider how a LangGraph supervisor pattern could automate the `TICKETS.md` coordination:

```python
def supervisor(state: State) -> State:
    completed_tickets = get_completed_tickets(state)
    blocked_tickets = identify_blocked_dependencies(state)

    if blocked_tickets:
        return {"action": "subdivide_bottleneck", "target": blocked_tickets[0]}

    available_tickets = get_unblocked_tickets(state)
    if available_tickets:
        return {"action": "assign_ticket", "target": available_tickets[0]}

    return {"action": "synthesis"}
```

## Framework Evolution for Professional Practice

The workshop demonstrated that effective AI team coordination requires fundamentally different approaches than individual AI assistance. Success patterns included:

- **Shared specifications early**: Teams with precise and deliberate project documentation produced coherent results across multiple development streams.

- **Structured coordination mechanisms**: Live dependency documents prevented integration chaos whilst systematic review processes ensured quality.

- **Disciplined boundaries**: Identifying the ["jagged frontier" of AI](https://www.hbs.edu/ris/Publication%20Files/24-013_d9b45b68-9e74-42d6-a1c6-c72fb70c7282.pdf) - manual environment setup combined with AI-assisted logic development optimised both speed and reliability.

The feedback was overwhelmingly positive:

> "Continually surprised by just how powerful and effective using AI to code can be from each workshop. Can't wait for the next one."

## Looking Forward: Orchestrated Development

The `TICKETS.md` innovation reveals how effective team AI coordination can emerge organically from well-structured constraints. Rather than complex orchestration frameworks, simple shared documentation patterns enabled effective parallel development.

This approach scales through emerging technologies. Model Context Protocol provides standardised interfaces for AI tools to access project data, whilst LangGraph enables teams to codify coordination logic into automated workflows. Together, they point toward development environments where AI assistants coordinate seamlessly whilst preserving human architectural control.

As one participant noted: **"Working in pairs was perfect; larger teams would have been extremely messy"**. However, this raises interesting questions about optimal team sizes and whether additional coordination mechanisms might enable larger teams to work effectively.

The future of team development lies not in replacing human coordination with AI, but in developing orchestration frameworks that leverage AI capabilities whilst preserving human architectural control. The teams that master these practices early will have significant advantages as AI assistance becomes ubiquitous in software development.
