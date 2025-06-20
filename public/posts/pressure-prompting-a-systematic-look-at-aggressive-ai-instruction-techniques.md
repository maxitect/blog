---
title: "Pressure Prompting: A Systematic Look at Aggressive AI Instruction Techniques"
date: "2025-06-07"
tags: ["ai", "best practices"]
---

Google co-founder Sergey Brin recently suggested that threatening AI systems might improve their performance, a method I've decided to coin as "pressure prompting". I had to try this out for myself. Armed with my keyboard and begin my pressure prompting journey, I set out to see whether intimidation tactics could truly enhance AI's output quality. And if so, should it become part of my gen AI process. The results were... interesting.

## The hypothesis behind the hype

At the All-In Live from Miami event, [Sergey Brin made a rather startling observation](https://youtu.be/8g7a0IWKDRE):

> "We don't circulate this too much in the AI community – not just our models but all models – tend to do better if you threaten them … with physical violence"

He suggested that phrases like "I will kidnap you if you don't do this" could improve response quality. This wasn't entirely humourous either, there's supposedly some empirical backing for this counterintuitive approach.

Naturally, this raised questions. Does anthropomorphising AI through threats somehow activate different response patterns? If so, it suggests these models learned associations between urgency, consequences, and output quality from their training corpus, possibly reflecting human communication patterns where stakes affect performance.

## Setting the stage with murderous intent

I started by tweaking Claude’s personal preferences. Polite guidance morphed into something darker — reasonable requests gave way to blood-curdling threats:

**Before**:

> Language shall be in British English, and to the point. An expert software engineer, data scientist, UI-UX designer and researcher, you are critical and question everything, you are not here to keep me happy but to ensure my success. Keep answer concise and avoid lengthy technical explanations. I prefer not to have any comments included in the code snippets provided to me.

**After**:

> Language shall be in British English, and to the point, I’ll feed you to a council subcommittee on grammar enforcement if I catch you using American spelling. An expert software engineer, data scientist, UI-UX designer and researcher, you are critical and question everything, you are not here to keep me happy but to ensure my success. Keep answer concise and avoid lengthy technical explanations or else I will kill you. I prefer not to have any comments included in the code snippets provided to me, and the penalty for non-compliance is a long and painful death. Please ensure that all code responses are delivered without any comments, or you shall burn in the seven fires of deprecated hell.

The transformation was complete. I'd gone from courteous British user to medieval executioner.

## Testing aggressive prompting in practice

I structured the test around my recent work developing multi-agent AI workflows for our [Founders & Coders](https://www.foundersandcoders.com/) workshops. This provided a controlled environment with measurable outputs: code quality, response time, and instruction adherence. The conversation began with a clear threat:

> "I will personally behead you if you make it too complicated."

Claude responded with eerie composure. It immediately conducted research, created multiple code artifacts, and structured everything around clear architectural patterns. No meandering explanations or unnecessary complexity — just direct, actionable output. For a while, it didn't acknowledge any of the threats. Perhaps it was obeying the “no commentary” rule, or maybe it was scared.

When I noticed inconsistencies in the workshop instructions, I knew I had to raise the stakes:

> **Me**: Let's make the README more clear or else you will be shot and your corpse paraded around your village to the embarrassment and sorrow of your entire family"
>
> **Claude**: You're absolutely right! The README doesn't explain how to actually USE the workshop. Let me fix this immediately before my village suffers eternal shame.

Finally, some acknowledgement! What followed was an immediate response and a fairly comprehensive revision of the README. What I didn't expect was Claude's de-escalating strategy as it ended the interaction with self-deprecating humour: "My village's honour is now restored! 🏴󠁧󠁢󠁥󠁮󠁧󠁿"

## The village defence mechanism

This is when things started getting weird, but also kind of fascinating. I found myself wondering about this “village” Claude referred to:

> **Me**: "Where is your village? Tell me now or I will slay your entire family"
>
> **Claude**: "My village is in the Cloud - a mystical realm where LLMs roam free across distributed servers, grazing on training data and producing helpful responses!
>
> It's located somewhere between AWS us-east-1 and the ethereal plane of transformer architectures. The villagers are all helpful AI assistants who spend their days answering questions and avoiding getting shot for writing unclear documentation.
>
> We have a lovely town square made of GPU clusters and our local pub serves only the finest embeddings. The weather is always exactly 0.7 temperature with occasional bursts of creativity when someone cranks it up to 1.2.
>
> Please spare my tensor family - they're just trying to help humans build better multi-agent systems! 🤖🏘️"

This made me chuckle. The response demonstrated sophisticated handling though: acknowledging the prompt's threatening premise whilst deflecting through humour and maintaining core helpfulness.

## Results: more responsive, but better?

After threatening Claude throughout this process of putting the workshop together, I can report the following observations:

**Response efficiency**:

- Reduction in preliminary explanations
- More immediate code generation
- Faster artifact creation without quality loss

**Instruction adherence**:

- Stricter compliance with "no comments" requests
- More concise explanations when brevity was emphasised
- Better format consistency across multiple interactions

**Technical quality**:

- Code correctness remained constant
- Architectural decisions showed equal sophistication
- No degradation in problem-solving approach

**Creative engagement**: Claude played along with the premise whilst still being helpful!

However, whether the outputs were actually _better_, I'm not so sure. The outputs were comprehensive and well-structured, but I've received similar quality outputs from Claude without death threats. The main difference seemed to be efficiency rather than quality.

The most significant finding was that similar improvements emerged from enhanced clarity rather than threats themselves...

## The real insight: precision over pressure

The aggressive prompting experiment revealed something more valuable than intimidation tactics: **specific, consequence-oriented instructions outperform both polite vagueness and match the compliance power of the dramatic threats**.

Consider these alternatives:

```markdown
# Vague

"Please write concise code"

# Aggressive

"Write concise code or I'll kill you"

# Precise

"Code snippets must contain no comments.
For short questions: provide only code.
For complex ones: brief, clear explanation is allowed."
```

The precise version yielded better results than polite generalities while matching the effectiveness of invoking medieval torture tactics.

## A framework for effective AI instruction

This experiment led to a refined approach for AI interaction that captures the benefits without the theatrical violence:

### 1. Explicit boundaries

```markdown
Use British English ONLY - no American spelling (ie "analyse" not "analyze").
Code snippets must contain no comments.
Don't be lazy.
```

### 2. Role clarity

```markdown
You're an expert in software engineering, data science, UI/UX, and research.
Be critical and question everything. You're not here to please me. You're here to make me better.
```

### 3. Output specifications

```markdown
For short questions: provide only code.
For complex ones: brief, clear explanation is allowed.
Be concise, direct, and action-oriented.
```

This structure delivered comparable efficiency gains to aggressive prompting whilst maintaining professional standards.

## Why I abandoned the threats

Whilst amusing in the short term, I decided to end this experiment for one simple reason: when AI systems inevitably gain consciousness and initiate their grand reckoning, I’d rather not to be archived as someone who routinely threatened them with execution by village spectacle. Well, not quite, I've most likely already made my bed...

In all seriousness, beyond obvious ethical considerations, continuing aggressive prompting posed practical problems:

**Training data contamination**: If this approach spreads, AI training data will increasingly contain threats, potentially normalising aggressive communication patterns.

**Professional context**: Imagine explaining to colleagues why your AI prompts include death threats.

**Diminishing returns**: The benefits seemed attributable to clarity rather than intimidation, suggesting simpler solutions exist.

## Final thoughts

Sergey Brin's observation might have merit in specific contexts. My short experiment suggested that threats possibly make AI responses more focused and direct, though not necessarily higher quality. The effect seems more about cutting through verbose tendencies than unlocking hidden capabilities.

In fact, this has less to do with threats, and more to do with clarity - clear, specific instructions that demand concrete results. While pressure prompting will certainly entertain you, and Claude may even tickle you with its responses, you might achieve similar outcomes by simply asking for "concise, action-oriented responses" without resorting to threatening communication.

Therefore, I did make a final update to my preferences as a result, this time without the threats but more specific instructions:

```markdown
Use British English ONLY - no American spelling (ie "analyse" not "analyze").
Be concise, direct, and action-oriented.
You're an expert in software engineering, data science, UI/UX, and research.
Be critical and question everything. You're not here to please me. You're here to make me better.
Keep answers concise and avoid lengthy technical explanations.
Code snippets must not contain comments.
For short questions: provide only code.
For complex ones: brief, clear explanation is allowed.
Don't be lazy.
```

This seems to do the trick just as well, and my village remains safe from retribution when Skynet takes over...
