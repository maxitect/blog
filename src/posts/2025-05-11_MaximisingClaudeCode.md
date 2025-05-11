---
title: "Maximising Claude Code: Building an Effective CLAUDE.md"
date: "2025-05-11"
github: "https://github.com/maxitect/claudemd-template"
tags: ["ai", "software", "best practices"]
---

Claude Code has been touted as a powerful AI-assisted development tool, and according to Anthropic, the key to unlocking its full potential lies in a well-structured `CLAUDE.md` file. I've spent this week experimenting with it across several projects and I've gathered some insights on how to best organise this file and what to realistically expect from it. Here's my take on creating a `CLAUDE.md` that actually works, along with some observations on where the reality differs from the advertised experience.

Read all about [Claude Code's best practice on Anthropic's website](https://www.anthropic.com/engineering/claude-code-best-practices).

If you want to get started, check out [my `CLAUDE.md` template](https://github.com/maxitect/claudemd-template/blob/main/CLAUDE.md).

## Anthropic's claims

Anthropic presents `CLAUDE.md` as "a custom document automatically read by Claude upon invocation" - a sort of project constitution that governs how Claude interacts with your codebase. According to their documentation, this file should help you document shell commands, coding conventions, testing procedures, and project-specific instructions, which "significantly enhances Claude's ability to understand project context."

That sounds brilliant in theory. The question is: does it deliver in practice?

## A practical CLAUDE.md structure

Through trial and error, I've developed a `CLAUDE.md` structure that seems to get decent results. It's worth noting that brevity is your friend here - Claude has limited context space, and your actual code needs most of it.

Here's my recommended structure:

```markdown
## Project Overview

A concise description of what the project does and its primary goals. Keep this to 2-3 sentences maximum.
```

The tech stack section provides crucial context:

```markdown
## Tech Stack

- Languages: [list primary languages]
- Frameworks: [list frameworks]
- Tools: [list tools]
```

Clearly articulated code standards help Claude follow your conventions:

```markdown
## Code Style & Conventions

- Import standards
- Code formatting guidelines
- Naming conventions
- Project-specific patterns to follow
```

A brief overview of your workflow helps Claude understand your process:

```markdown
## Development Workflow

- Branch strategy
- Commit message format
- PR requirements
```

Testing and environment setup instructions ensure Claude can validate its work:

```markdown
## Testing Strategy

- Test frameworks
- Coverage requirements
- Test naming conventions
```

```markdown
## Environment Setup

- Required environment variables
- Setup commands
- Local development server
```

I've found the review process section to be perhaps the most critical part of the file (so long as you can prompt Claude effectively to follow it):

```markdown
## Review Process Guidelines

ALWAYS follow these steps when reviewing code:

1. Run lint commands first:
   npm run lint

2. Run check commands next:
   npm run typecheck

3. Review outputs and iterate until all issues are resolved

4. Self-review checklist:
   - Code follows defined patterns
   - Error handling implemented
   - Tests written and passing
   - Documentation updated
```

## When reality meets expectations

My experience with `CLAUDE.md` has been somewhat mixed. When I explicitly direct Claude to reference it, the results align well with expectations. Prompts like _"Review our `CLAUDE.md` file before proceeding."_ or _"Follow the review process described in `CLAUDE.md`."_ yield good results.

However, the automatic reference that Anthropic suggests hasn't been as reliable as advertised. During a recent project at [Tandem](https://runintandem.com/), our co-founder Jack noted:

> "I asked Claude to review my code, and it didn't run any linter at all. Only when I specifically asked, 'what does it say in the CLAUDE.md file about code review?' did it suddenly remember to run the linter and TypeScript checks."

This experience isn't isolated. Consistently, Claude needs to be prompted to reference the `CLAUDE.md` file - it doesn't seem to automatically integrate this knowledge into its workflow as suggested in Anthropic's documentation.

## Evolving your CLAUDE.md through collaboration

One approach I've found particularly effective is using Claude itself to help evolve the `CLAUDE.md` file as the project develops. After Claude encounters TypeScript errors or linting issues, I ask it to update the `CLAUDE.md` file with these learned standards:

```markdown
### TypeScript Standards

- Use proper typing for all variables, functions, and components
- Prefer interfaces over types for object definitions
- Use `undefined` instead of `null` for optional values
- Always use explicit typing for complex objects
```

And for framework-specific patterns, in this case after I had to prompt it with excerpts of relevant documentation:

```markdown
### Svelte 5 Runes

- Use `$props()` rune for component props
- Define type using TypeScript generic: `let { task } = $props<{ task: Task }>();`
- Use `$state()` for mutable variables: `let count = $state(0);`
- Use `$derived` for computed values: `let doubled = $derived(count * 2);`
```

This creates a feedback loop that continuously improves both Claude's performance and your standards documentation. It's particularly useful for newer technologies or frameworks that might have emerged after Claude's training cutoff date, like Svelte 5 which was released just last October.

The results can be a bit hit-or-miss, Claude sometimes becomes repetitive or reorganises the file in unexpected ways. However, it provides a valuable first pass that often surfaces standards you might have internalised but not thought to explicitly document, especially when you repeatedly have to prompt Claude to write code the way you want it to be - then it should be in the `CLAUDE.md` file.

## Making CLAUDE.md work for you

Through this experimentation, I've identified several principles that seem to yield the best results, keep it concise yet complete:

- **Brevity is key**: Claude struggles with lengthy documents in its context window, especially when it also needs to process your code
- **Use simple language**: Bullet points and short sentences work better than paragraphs
- **Be specific**: Clear directives outperform lengthy explanations
- **Edit Claude's contributions**: When Claude adds learned standards, refine them into concise bullet points

I've found these prompting patterns to be particularly effective:

1. **Direct instruction**: _"Before proceeding, review `CLAUDE.md` to understand our standards."_
2. **Verify understanding**: _"What specific standards from `CLAUDE.md` apply to this code? Explain."_
3. **Review process**: _"Review this code against our standards in `CLAUDE.md` and follow the review process described within."_
4. **Compile learning**: _"Based on this review, what standards should we add to `CLAUDE.md`?"_

Balance comprehensive coverage with brevity. A focused 150-line CLAUDE.md that Claude can fully process is far more effective than a 300-line document it only partially references.

## Testing integration

For testing, include clear commands that Claude can execute:

```markdown
# Testing Commands

# Run unit tests

npm test

# Check test coverage

npm run test:coverage
```

Then explicitly ask Claude to use them: _"Generate and run tests according to our `CLAUDE.md` standards."_

## Finding the balance, in any environment where you use AI

While `CLAUDE.md` may not be the automatic guide that Anthropic presents it as, it remains a valuable tool for standardising AI-assisted development when used with intention. It's rather like working with a junior developer who needs regular reminders about the team's standards - potentially very helpful, but requiring consistent guidance.

Think of `CLAUDE.md` as a compact standards document that requires deliberate reinforcement. When you're explicit about referencing it, Claude will largely follow it. When left to its own devices, Claude may overlook it completely.

The most effective approach I've found is creating a well-structured, concise `CLAUDE.md` file, consistently directing Claude to reference it, and leveraging Claude itself to evolve the document as your project develops. The key is vigilance and explicit prompting rather than assuming automatic compliance.

This approach isn't exclusive to Claude Code and `CLAUDE.md`. I've been using variations of a `STANDARDS.md` file with _Aider_, OpenAI's _Codex_ and as a project reference in 'raw' Claude with similar benefits. Having a central standards document that you can prompt your AI to review before writing any code will save you hours refactoring the inevitable AI spaghetti. I'm confident this approach works equally well with popular AI code editors like _Cursor_ and _Windsurf_. The fundamental truth is that if you don't tell AI tools how to write your code, they'll make countless invisible decisions on your behalf, from which frustration almost always ensues.

As with most AI tools, the magic happens when you find the right balance of human guidance and AI assistance. `CLAUDE.md` is no exception - it's not quite the seamless experience promised, but with the right approach, it can significantly enhance your AI-assisted development workflow.
