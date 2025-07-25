---
title: "The Spec Trap: Can Amazon's KIRO Replace Thoughtful AI Development?"
date: "2025-07-25"
tags: ["ai", "software", "best practices"]
---

[Amazon's new KIRO tool](https://kiro.dev/) landed with considerable fanfare this month, promising to transform AI-assisted development through "spec-driven workflows." Having spent considerable time experimenting with it, I've reached an uncomfortable conclusion: KIRO is essentially a productised version of our [HULA framework](/posts/ai-in-the-loop-reflections-on-delivering-the-hula-workshops-at-founders-coders) developed at [Founders & Coders](https://www.foundersandcoders.com/), but one that systematically removes some important parts.

The parallels are striking. KIRO's three-phase approach maps almost directly onto our framework of our [AI-assisted development workshops](/posts/beyond-solo-ai-how-pair-programming-with-claude-code-transforms-team-development): their `requirements.md` mirrors our `FUNCTIONAL.md`, their `design.md` resembles our `ARCHITECTURE.md`, and their `tasks.md` functions like our `TICKETS.md`. Amazon has clearly identified the same fundamental problem we've been addressing in our workshops: moving beyond "vibe coding" toward structured AI collaboration through spec development.

I found myself wondering if this tool could replace thoughtful (and time-consuming) AI development. However, I have concerns. It seems KIRO productises the outputs whilst gutting the process that makes them effective.

## The promise of structured AI development

KIRO's three-phase approach: requirements generation, technical design, and planning. The platform generates detailed user stories using [EARS notation](https://medium.com/paramtech/ears-the-easy-approach-to-requirements-syntax-b09597aae31d), creates comprehensive technical architecture documentation, and breaks work into sequenced tasks with dependency mapping.

On paper, this sounds like exactly what we've been advocating. Our workshops emphasise moving beyond casual prompting to structured collaboration with AI systems. KIRO appears to automate this structured approach.

So, I had to test it out for myself, wondering if this could streamline my existing workflows.

## Project one: Drone architectural film website

My first KIRO project was a drone architectural film studio website. Half a day later, I had a fully functional website. Showreel splash, services, portfolio, testimonials, contact forms with API routes. The experience was success - a single prompt evolved into comprehensive requirements, then detailed technical specifications, then working code.

I fed the platform a prompt about showcasing the aerial videography work, detailing services and some information about my desired tech stack. Within minutes, KIRO generated comprehensive specifications. The requirements document outlined user stories for portfolio browsing, service enquiries, testimonials etc. The technical design frameworks, detailed the component architecture, and mapped out the architecture. The implementation plan broke everything into sequential tasks with clear dependencies.

There were a few gaps in the specs I had to fill but it was a good balance between being thorough but also being concise, for easy consumption by both human and AI. This was exactly the kind of structured planning we encourage in our workshops, except generated automatically from a single prompt rather than through deliberate human-AI collaboration.

Once I carefully refined and iterated over the spec, I went into full vibe coding mode. I just ran through the tasks without looking too much at the code. Everything worked more or less as specified. The rapid progression from concept to working application felt like real progress.

Then I peeped at the code.

## The maintainability crisis

Buried beneath KIRO's polished specifications was a familiar problem: the generated code was fundamentally unmaintainable. Components repeated identical logic across files. Complex components spanning hundreds of lines mixing multiple concerns. State management was scattered and inconsistent. There was no architectural coherence beyond what the specifications explicitly mandated.

Here's what KIRO generated for the Hero section:

```typescript
export default function Hero({
  videoSrc,
  title,
  subtitle,
  ctaText,
  ctaHref,
}: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoPlayerState>({
    isPlaying: false,
    isMuted: true,
    currentTime: 0,
    duration: 0,
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 50+ lines of useEffect hooks for video management
  // 30+ lines of event handlers
  // 40+ lines of JSX with embedded logic
  // All in a single component
}
```

This Hero component exemplifies the maintainability trap. Video state management, motion preference detection, keyboard handling, and UI rendering are all tangled together. When a client requests a simple design change, you're editing a component that handles five different concerns.

Even worse, KIRO repeated navigation logic across multiple files:

```typescript
// Footer.tsx - 80 lines of navigation handling
const navigationItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  // ... repeated in three different files
];

const handleNavClick = (href: string) => {
  const targetId = href.substring(1);
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Header.tsx - Nearly identical logic, 90+ lines
const handleNavClick = (href: string) => {
  const targetId = href.substring(1);
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  setIsMobileMenuOpen(false); // Slight variation
};
```

The specifications themselves were thorough and well-structured. The problem was simpler: KIRO generated them from my minimal prompt, making hundreds of assumptions without asking. The AI filled every gap with its own preferences, not mine.

You can edit the specs afterwards, and I did. But here's the trap: once you're presented with comprehensive documentation, there's psychological resistance to major changes. It feels wasteful to dismantle something that looks complete and professional. This is precisely why the conversation needs to happen before generation begins. Otherwise, you're either stuck with assumptions you don't want, or burning through tokens generating/iterating spec after spec until something finally fits.

This revealed KIRO's fundamental limitation: it covers the functional requirements (`requirements.md`), architectural decisions (`design.md`), and task breakdown (`tasks.md`) from our framework, but it's missing a critical piece - the equivalent of our `STANDARDS.md` or `CLAUDE.md` files that define how code should actually be written.

## The missing conversation

Our HULA framework emphasises the "Human-in-the-Loop" principle through structured dialogue. The conception phase involves deliberate questioning: What coding patterns do you prefer? How do you handle state management? What are your testing requirements? This conversation shapes what gets built and how.

KIRO skips this conversation entirely. You provide a prompt, review generated specifications, and either accept or refine them. But the AI doesn't encourage discussion about implementation preferences, coding standards, or architectural principles. You're presented with fait accompli specifications that embed countless unstated assumptions. The only options are approve or reject, after which you edit it manually or ask it to regenerate the whole spec in a different flavour, but it never asks for feedback or encourages a refinement process.

This creates a dangerous illusion of structure. Yes, you have detailed specs, but if those specs were generated through the same "vibe-driven" process that produces poor code, you're simply doing sophisticated vibe coding with extra documentation.

## Project two: The accessibility trap

My second KIRO experiment involved enhancing an existing component generation pipeline to produce WCAG 2.2 AA compliant React forms. This was a feature I genuinely cared about for a client project, and I was curious whether KIRO's structured approach could help tackle this accessibility challenge.

The platform generated impressively detailed specifications, which I did opt to get involved in refining them alongside the AI, trying to force the conversational approach. I ended up editing the specs manually and using another AI assistant to help me do so because it cause too much friction to try and do this with KIRO, which constantly wants to rewrite the entire spec. I had a [refined accessibility audit document](https://github.com/TandemCreativeDev/llm_nextjs_audit_sheets/blob/main/accessibility/AUDIT.md) which I put together to feed it which was useful.

The requirements document outlined specific WCAG criteria, semantic HTML structures, and screen reader compatibility needs. The technical design proposed comprehensive accessibility utilities, focus management systems, and ARIA attribute generation. The task breakdown included validation functions, testing procedures, and touch target compliance.

But KIRO generated yet another maintainability nightmare. Here's the animation system it created for the About section:

```typescript
// KIRO generated this complex animation system in About.tsx
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
  visibleNoMotion: {
    opacity: 1,
    transition: { duration: 0 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  // ... 20+ more animation variants defined inline
};
```

The tool had seduced me into over-speccing dangerously. Because it generates specs automatically, it's easy to keep refining and expanding them while losing sight of whether the additional complexity serves your actual goals. This is an issue with any spec-driven workflow actually, even ours. However, having that initial conversation first before any spec is produced gives you the opportunity to outline your scope, timeline, priorities and set those expectations early.

What started as a focused accessibility enhancement became an elaborate system with validation frameworks, comprehensive testing suites, and detailed documentation generation. The specifications were thorough, technically sound, and completely disproportionate to what I actually needed.

## What KIRO gets right (and why it matters)

Despite these concerns, KIRO represents significant progress in AI-assisted development. The spec-driven approach is fundamentally sound, and seeing Amazon invest significantly in these patterns validates much of what we've been exploring in our workshops.

The tool's persistence of context through project files addresses a real pain point in AI-assisted development. Rather than losing architectural decisions across conversation resets, KIRO maintains them in version-controlled documentation. This is exactly the kind of systematic approach that scales beyond individual developers to team coordination.

## What KIRO is missing (and what to do to fill that gap)

The HULA workflow's strength lies in its emphasis on human agency and deliberate decision-making throughout the development process. The [IQRE methodology](/posts/ai-in-the-loop-reflections-on-delivering-the-hula-workshops-at-founders-coders) (**Iterate**, **Question**, **Review/Create**, **Explain**) ensures that AI suggestions are always filtered through human judgment and project-specific requirements.

Most critically, having a `STANDARDS.md` or `CLAUDE.md` live document establishes coding conventions before any implementation begins. This prevents the maintainability issues I encountered with KIRO-generated code. When AI knows your preferred patterns, naming conventions, and architectural principles, it produces code that fits your project rather than generic implementations.

Compare KIRO's monolithic approach to a more maintainable pattern I use in production projects:

```typescript
// Extracted navigation logic into a custom hook
export const useNavAnimation = ({
  pathname,
  menuRoutes,
  isFrench,
  navRef,
  navItemRefs,
}) => {
  // Focused logic for navigation animation
  return { activeRouteIndex, isAnimating, getBallStyles, handleAnimationEnd };
};

// Clean, focused components
export default function FilterButton({
  filter,
  isSelected,
  onToggle,
  ...props
}) {
  return (
    <button
      className={clsx(
        "py-2 px-4 rounded-full transition-colors duration-200",
        isSelected ? "bg-orange text-black" : "bg-gray-200 text-gray-800"
      )}
      onClick={onToggle}
      aria-pressed={isSelected}
      {...props}
    >
      {filter}
    </button>
  );
}
```

The difference is architectural intention. KIRO generates comprehensive functionality within single components, whilst thoughtful development extracts concerns into focused, testable units. The FilterButton handles one job well. The Hero component tries to handle five jobs adequately.

The workshop format we've developed also addresses the collaboration challenge that KIRO doesn't quite solve yet: [how do development teams coordinate when everyone has their own AI assistant?](/posts/beyond-solo-ai-how-pair-programming-with-claude-code-transforms-team-development) Our `TICKETS.md` live dependency mapping approach creates shared context that enables multiple developers to work with separate AI instances while maintaining architectural coherence. This is only the start to fully solve this coordination challenge, and there are plenty of other underlying issues to resolve before such a methodology can be used in real large scale production teams.

## The automation seduction

KIRO represents a seductive proposition: structured development without the effort of creating structure. But automation without proper foundation simply scales up existing problems. If you don't establish clear standards and priorities before engaging with AI, no amount of specification detail will prevent you from building the wrong thing efficiently.

The platform works best when you resist its push toward immediate acceptance of generated specs. My successful drone videography website project happened because I spent time refining the specifications thoughtfully, not because I trusted the initial AI output. I was essentially applying the IQRE methodology within KIRO's interface.

## Where KIRO fits (and where it doesn't)

KIRO excels at rapid prototyping and client projects where speed matters more than code quality. For consultancy work, proof-of-concepts, and demonstrations, the tool's ability to generate working systems quickly is genuinely remarkable.

But for projects you plan to maintain long-term, or codebases that matter to your business, I'd recommend caution. The generated specifications look comprehensive, but they lack the human discussion and iterative refinement that create truly robust architectures.

This is where our workflow remains more effective. The deliberate emphasis on human-in-the-loop coordination, standards documents, and collaborative specification development produces better outcomes for complex projects, even if it takes longer initially.

## The Claude Code comparison

Having extensively used various AI development tools with multi-agent workflows running under the hood, [Claude Code](https://www.anthropic.com/claude-code) continues to outperform alternatives for me, including KIRO. Although both use the same underlying Anthropic models (CLaude Sonnet), the key differences are transparency, customisation and quality. You can observe and influence the reasoning process rather than accepting black-box specifications. The custom slash commands and hooks enable comprehensive workflow automation. But crucially, a more sophisticated multi-agent reasoning and planning process leads to higher quality outputs.

When Claude Code generates implementation plans, you see the decision-making process and it is presented concisely. When KIRO generates specifications, you see polished outputs without understanding the underlying assumptions. This transparency enables course correction before problems compound.

## Practical recommendations

Amazon's investment in KIRO validates the structured approach to AI-assisted development that we've been developing through our workshops. But tools alone don't solve the fundamental challenge of maintaining human agency whilst leveraging AI capabilities.

If you're considering KIRO for your projects, treat it as a sophisticated interface to AI assistance rather than a replacement for thoughtful development process. The platform can accelerate specification generation, but you still need to apply your own standards, judgment and existing AI workflows on top.

Most importantly, establish coding standards and architectural principles before engaging with any AI development tool. Whether you're using KIRO, Claude Code, or traditional prompting approaches, the quality of your output depends on the clarity of your requirements and standards. Generating this to an acceptable standard from a single prompt is simply unrealistic.

The future of AI-assisted development lies not in automation that replaces human judgment, but in tools that amplify human expertise through structured collaboration. KIRO takes a step in the right direction, but we're not there yet.

Specification without conversation is just sophisticated guessing. Until AI tools can engage in meaningful dialogue about implementation preferences and project priorities, human-led frameworks remain essential for professional development work.

KIRO is a powerful addition to the AI development toolkit. Just don't mistake its comprehensive specifications for comprehensive thinking. The conversation that happens before you write any specs remains the most important part of the process. That conversation, for now, requires human initiative.
