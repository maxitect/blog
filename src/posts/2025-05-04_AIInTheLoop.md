---
title: "AI in the Loop: Reflections on Delivering the HULA Workshops at Founders & Coders"
date: "2025-05-04"
github: "https://github.com/maxitect/multi-agent"
tags: ["ai", "software development", "workshops"]
---

A month ago, I had the chance to facilitate a workshop series at [Founders & Coders](https://www.foundersandcoders.com/) with Jack Casstles-Jones, my co-facilitator, introducing developers to a new approach for building software with AI as a partner. The room was filled with developers of varying experience levels, all curious about how AI might change their day-to-day work. In preparation for these sessions, we spent time researching and experimenting with different ways of bringing AI into the software process, with the idea being that it would enhance your learning rather than atrophying your skills. What we ended up with was quite an elaborate framework which we decided to call the HULA (Human-in-the-Loop) framework, a term we "borrowed" as it is already being [used in AI and ML](https://cloud.google.com/discover/human-in-the-loop) with a slightly different meaning. Over several sessions, we continued to develop this framework from constant feedback given to us by the attendees who tested it themselves. This month, we are starting these up again to explore agentic workflows and more, so it is a good moment for me to look back and reflect on the first iteration of these.

[Read more about the HULA Framework](https://docs.google.com/document/d/e/2PACX-1vRjKWt-AiAvAsvxoo3njsqnQZZbJ1gCEDiA1Sv1zoiEQmYY8YkPOfbO9M75P2kNdaVSQwQssXvUiREh/pub): if you are interested in using the framework on your projects, you can find our documentation by clicking on the link.

## AI as an unstoppable force

We began each workshop by opening the floor to participants' thoughts on AI, from opportunities to legal, ethical and environmental concerns. Among the various perspectives shared, one comparison stood out to me: the parallel with the _industrial revolution_. Historically, this comparison is often drawn in a positive light, emphasising how initial fears of machines taking jobs ultimately led to more skilled work and the modern work culture we know today. Of course, this transformation wasn't without significant growing pains - economists recognise [Engels' Pause](https://en.wikipedia.org/wiki/Engels%27_pause), that difficult 50-year period where technological advancement outpaced wage growth, creating widespread hardship before benefits eventually diffused through society. More concerning still, one participant insightfully noted that the industrial revolution came with enormous environmental costs that we're still paying for. Similarly, training large AI models carries a significant carbon footprint, raising valid environmental concerns even as the technology creates new possibilities.

What history has shown us, though, is that technological revolutions tend to be unstoppable forces. The Luddites who opposed industrial machinery were ultimately swept aside by the wave of progress. If we accept that AI development follows a similar trajectory, then regardless of our ethical or environmental concerns, we have little choice but to adapt. The sensible approach seems to be embracing AI while maintaining both healthy scepticism and a clear moral compass to guide our engagement with it.

## Learning to be a senior engineer

After the initial discussion, we continued to clarify what the workshop was not about. These sessions weren't aimed at building the next _ChatGPT_ or a deep dive into tools like _LangChain_ and _LangGraph_. Our focus was using AI as a collaborative tool in regular software development - treating AI like a team member whilst keeping a human in control of decisions.

As AI becomes increasingly proficient in coding, more tickets that previously would have been assigned to juniors can now go directly to AI assistants. This shift means that senior engineering skills are becoming more valuable. The industry may eventually evolve towards a model where human engineers focus on high-level decision-making while AI handles implementation details (with a strong guiding hand). In essence, we could be witnessing a compression of the traditional career ladder.

The concept we introduced was of the "human-in-the-loop", which means using AI as a highly proficient junior developer and pair programming partner while retaining control over the architectural and design decisions. This allows us as developers to focus our attention on higher-level logic such as [architecture](https://en.wikipedia.org/wiki/Software_architecture), [system design](https://en.wikipedia.org/wiki/Systems_design) and how [components](https://en.wikipedia.org/wiki/Software_component) and [interfaces](<https://en.wikipedia.org/wiki/Interface_(computing)>) should interact. It is not about taking shortcuts to senior roles, but rather about intelligent upskilling in areas where AI isn't yet masterful. It's about maximising the value of your time by focusing on developing skills that complement rather than compete with AI. By understanding this dynamic, developers can position themselves strategically in an evolving industry landscape. This framing set the stage for the practical methodology that followed.

## Tools and model taxonomy

We established a taxonomy of AI models to help developers choose the right tool for each task:

| **Category**          | **Model Examples**            | **Notable Capabilities**                        |
| --------------------- | ----------------------------- | ----------------------------------------------- |
| Reasoning Models      | o1, DeepSeek-R1, Claude 3.7   | Mathematical reasoning, logical inference       |
| Thinking Models       | o3, Llama 2, Grok3            | General cognitive tasks, creativity             |
| Conversational Models | ChatGPT 4o, Claude 3.5, Grok2 | Dialogue, user intent understanding, lower cost |

This taxonomy was mapped to different phases of development in the HULA framework. We had participants explore popular large language models and consider where in the [software development lifecycle](https://aws.amazon.com/what-is/sdlc/) each might be most useful.

To get everyone comfortable with AI-assisted coding, we had them install a CLI tool called [_Aider_](https://github.com/Aider-AI/aider) or Anthropic's newly released [_Claude Code_](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview) to build a simple Node.js calculator app. This practical exercise demonstrated how an AI pair-programmer can accelerate trivial coding tasks through natural language commands, and got everyone set up quickly for the main task of the day.

## Maintaining critical thinking: actions to follow when working with AI

One key part that we wanted to stress was a general set of actions that can help you work with AI effectively and intelligently, to avoid the blind copy-pasting of AI outputs and ensure your project is on the right track. These can apply to any situation where you might use AI in your work, and these actions should be repeated at each stage of the HULA process described next. They are:

1. **Iterate**: Share your ideas with an LLM and build the required output through iterative refinement. You can prompt AI to ask targeted questions to help develop detailed requirements.
2. **Question**: Review AI's output summary, identify gaps, and refine the output as well as your understanding of it (if required) through follow-up questions.
3. **Review/Create**: Review the generated output, understand it. When necessary, combine AI insights with your ideas to create a final spec in plain text format. If AI has presented 10 solutions, you come up with the 11th. File the output in your repo.
4. **Explain**: Present the output to stakeholders/team members/clients, emphasising its clear foundation and alignment with architectural principles set out by you (if applicable). For this, we encouraged participants to communicate with those on their table at the end of each phase and explain to one another.

## The HULA Framework: six phases of AI-assisted development

The core of our workshop that participants' were asked to follow when developing was the six-phase HULA structure, with each phase aligning to a typical stage of software development:

1. **Conception**: Using a conversational AI to brainstorm and define requirements. Through iterative Q&A, the AI helps flesh out a detailed [functional specification](https://github.com/maxitect/multi-agent/blob/main/templates/functional-spec.md). Think of this as rubber ducking with a powerful sounding board that can look up information much faster than you would be able to otherwise. Output: SPEC.md.

2. **Design and Architecture**: Using a thinking model to aid in designing the system architecture. The AI suggests possible designs, discusses trade-offs, and considers principles that you feed it such as [KISS](https://en.wikipedia.org/wiki/Unix_philosophy#Eric_Raymond's_17_Unix_Rules) and [DOTADIW](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well). Explore component breakdowns and design patterns, question choices for scalability and maintainability, then integrate the best ideas. Output: [Architecture Decision Record](https://github.com/maxitect/multi-agent/blob/main/templates/adr.md) (ADR.md).

3. **Planning**: With the spec and ADR, now we employ a thinking model to outline a detailed [implementation plan](https://github.com/maxitect/multi-agent/blob/main/templates/implementation-plan.md). The AI helps draft a step-by-step blueprint for the build, breaking the project into small, manageable chunks. Iterate and question how incremental and atomic each step should be. Optionally, if time allows, we also recommended using a conversational AI before this to discuss and draw up a [project standards spec](https://github.com/maxitect/multi-agent/blob/main/templates/standards-spec.md). The latter can be used to guide the implementation model to write code the way you would write it and avoid AI [spaghetti code](https://en.wikipedia.org/wiki/Spaghetti_code). Output: PLAN.md and optionally STANDARDS.md.

4. **Implementation**: Switching to a reasoning model for actual coding. Taking prompts from the plan and feeding them to the AI, then testing and reviewing the generated code, and improving on it as you progress. This process is repeated incrementally for each prompt in the plan.

5. **Testing**: Using the same AI that helped write the code to generate unit tests, suggest edge-case scenarios, and ensure good test coverage. In a [TDD](https://en.wikipedia.org/wiki/Test-driven_development) workflow, this phase can be combined with the previous.

6. **Deployment**: Employing AI for deployment planning and automation. The AI outlines deployment strategies and generates configuration scripts, which are then verified and tweaked by developers.

Throughout all phases, we emphasised the importance of model selection - using the right AI tool for each job.

## Effective Prompting with HULA

For each HULA phase, we demonstrated a specific prompting structure:

**Anatomy of the Prompts**

1. **Role**: Give the LLM an expert role for an agentic-like workflow. LLMs respond better when given a specific perspective.
2. **Task**: The actual prompt - what we want to get out of the interaction.
3. **Criteria**: Special criteria the model should follow (e.g., use PEP 8 standards for Python code).
4. **Output**: We provided templates for outputs at each phase:
   - [Functional spec template](https://github.com/maxitect/multi-agent/blob/main/templates/functional-spec.md) (Phase 1)
   - [Architectural decision record template](https://github.com/maxitect/multi-agent/blob/main/templates/adr.md) (Phase 2)
   - [Project standards spec template](https://github.com/maxitect/multi-agent/blob/main/templates/standards-spec.md) (Phase 3)
   - [Implementation plan template](https://github.com/maxitect/multi-agent/blob/main/templates/implementation-plan.md) (Phase 3)

These templates are based on IEEE 830 standard for SRS, but participants could also use their own formats or allow the LLM to determine the best structure.

## HULA in action: how far did we get?

To put theory into practice, we suggested participants build a Travel Planning App using the HULA framework, though many actually used the opportunity to work on personal projects they'd been wanting to start for some time, and we encouraged this. This flexibility allowed them to apply the framework to problems they were genuinely invested in solving.

Participants primarily worked individually with AI rather than in teams, coming together between phases to compare and discuss their outputs. This approach revealed how different conversations with AI led to varied functional specifications even when starting from similar prompts. For the conception phase, developers engaged with models through browser interfaces like _ChatGPT_ using custom prompts that positioned the AI as an "expert Product Requirements Engineer." When comparing notes afterward, it was interesting to see how their individual interactions had steered the AI toward different aspects of the project.

Moving through the subsequent phases (Design & Architecture and Planning) participants continued this pattern of individual work followed by group discussion. Some fed their specs to more powerful models like _OpenAI_'s o3, setting its persona to "expert Software Architect" and debating the AI's suggestions based on their own experience. We encouraged those with less expertise to continuously question the AI about decisions it wants you to make in order to understand and be able to make an informed judgement. The Planning phase yielded task lists that became prompt scripts for implementation, though few reached this final stage within the workshop timeframe.

During implementation, we encouraged participants to move to the CLI, using tools like _Aider_ or _Claude Code_. Some participants were already familiar with AI-assisted code editors such as _Cursor_ or _Windsurf_ and opted to continue in those environments, while others did brave the command line. From these interfaces, they were able to follow the prompt plan generated in the previous phase and reached diferent levels of success with it. During this phase, we stressed the importance of following the 4 actions, particularly the review part - no line of code should be commited until you understand what it does.

Given the intensive nature of the process, most participants were unable to complete their projects during the workshop. Some showed impressive progress with partially functioning applications, while others indicated they would continue using the HULA workflow at home to complete their project. This outcome wasn't surprising - the framework is thorough and demands significant mental engagement at each stage.

In our closing reflection, one participant's comment underlined the mental exercise that is this process: they felt mentally exhausted after working through the framework. Far from seeing this as negative, they recognised it as evidence they were genuinely stretching their capabilities rather than taking shortcuts. This sentiment echoed our core message, which is that HULA isn't about offloading thinking to AI, but rather about structuring your collaboration with AI to push your understanding further. Several participants expressed how they could see immediately applying this framework to their projects, appreciating its balance of structure and flexibility.

## Looking ahead: multi-agent workflows

The workshops were an experiment in teaching not just how to write code, but how to collaborate with AI to write code - all while reinforcing software engineering fundamentals. By focusing on high-level concepts and problem-solving while letting AI handle some of the rote tasks, developers potentially learn faster and build more without losing depth of understanding.

The core principle of being the human-in-the-loop remains crucial. As we reminded participants, "This is the worst AI will ever be, and the worst you will ever be at using AI". The technology will only get more powerful, and we as developers will get better at harnessing it.

The HULA framework gives developers a language and structure to work with AI systematically rather than ad-hoc. It's not the only approach, but it's a solid starting point that balances AI power with human control.

Later this month, we'll be taking this concept further with two new workshops exploring multi-agent workflows. The first will have participants simulate a team of AI agents by assigning each team member a specific role (Architect, UI/UX Designer, Developer, Tester) paired with a dedicated AI assistant. In the second workshop, we'll develop a framework to automate these multi-agent workflows and integrate them into familiar coding tools. Both sessions represent the natural evolution of our HULA approach - from single human-AI collaboration to orchestrating teams of specialised AI agents while maintaining that crucial human oversight.

If we keep human creativity and judgement at the centre while embracing what AI has to offer, we might just build better software than ever before.

## Sources

A curated list of sources we referred to in developing the HULA framework:

- [Ethan Mollick - _Co-Intelligence_](https://www.penguin.co.uk/books/460207/co-intelligence-by-mollick-ethan/9780753560778)
- [Ethan Mollick - _A new generation of AIs_](https://open.substack.com/pub/oneusefulthing/p/a-new-generation-of-ais-claude-37?r=16cm69&utm_medium=ios)
- [Simon Willison - _Here’s how I use LLMs to help me write code_](https://simonwillison.net/2025/Mar/11/using-llms-for-code/#vibe-coding-is-a-great-way-to-learn)
- [Harper Reed - _My LLM codegen workflow atm_](https://harper.blog/2025/02/16/my-llm-codegen-workflow-atm/)
- [Addy Osmani's LinkedIn post](https://www.linkedin.com/posts/addyosmani_softwareengineering-programming-ai-ugcPost-7289554698972340225-T2gO/)
- [Wannita Takerngsaksiri - _Human-In-the-Loop Software Development Agents_](https://arxiv.org/abs/2411.12924)
- [Aalap Davjekar - _AI-Assisted Software Development_](https://aalapdavjekar.medium.com/ai-assisted-software-development-a-comprehensive-guide-with-practical-prompts-part-1-3-989a529908e0)
- [Terrance Craddock - _From Code Monkeys to AI Whisperers_](https://medium.com/mr-plan-publication/from-code-monkeys-to-ai-whisperers-the-existential-pivot-every-junior-developer-must-make-55b635b3349e)
