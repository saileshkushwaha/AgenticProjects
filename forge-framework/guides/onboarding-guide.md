# Onboarding Guide - Forge Engineering Lifecycle Framework

## Prerequisites

- AI agent or LLM with instruction-following capability
- Context window: 8K+ tokens (32K+ recommended)
- Basic familiarity with software development

## 5-Minute Quick Start

1. **Load system prompt** from `core/system-prompt.md`
2. **Select workflow** based on task (see QUICK-REFERENCE.md)
3. **Load workflow** as context
4. **Execute task** following workflow steps
5. **Review output** against quality gates

## First Project: Research Task

1. Load `core/system-prompt.md` as system prompt
2. Load `workflows/01-research.md` as context
3. Ask: "Research the best database for a Python microservice handling 10K transactions/second"
4. Agent follows 7-step research workflow
5. Output uses `templates/research-report.md` format

## Configuration

Create `forge.config.md` in project root:

```markdown
# Forge Configuration
## Global Settings
- output_format: markdown
- quality_gates: enabled
- verbosity: standard
- language: en
```

## Team Adoption

| Week | Activity |
|------|----------|
| 1 | Single workflow (research or implementation), individual try |
| 2 | Expand to 2-3 workflows, use on real projects |
| 3 | All workflows active, team trained |
| 4 | Customize for domain, create templates |

## Common Pitfalls

1. **Skipping quality gates** — Always verify outputs
2. **Loading too many workflows** — Use only current task workflow
3. **Ignoring templates** — Templates ensure consistency
4. **Not providing enough context** — Give sufficient background
5. **Expecting perfect output first time** — Iterate and refine

## FAQ

**Q: Can I use multiple workflows at once?**
A: Better to focus on one workflow at a time. Complete one phase before starting the next.

**Q: What if a workflow step doesn't apply?**
A: Skip the step but document why. Quality gates should still be satisfied.

**Q: How do I handle large projects?**
A: Break into phases. Complete one workflow, use its output as input to the next.

**Q: Can I customize workflows?**
A: Yes. Fork and modify to fit your specific needs.

**Q: What AI models work with Forge?**
A: Any instruction-tuned LLM. Tested with Claude, GPT-4/5, Gemini, Llama.

**Q: How much context window do I need?**
A: Minimum 8K tokens. 32K+ recommended for complex projects.

**Q: How do I know if research is deep enough?**
A: Check accuracy metrics. Verification rate ≥80% and completeness ≥90% = good.

**Q: What if I disagree with the recommendation?**
A. Review evidence chain. If insufficient, ask for additional research.
