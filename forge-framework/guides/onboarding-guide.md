# Onboarding Guide - Forge Engineering Lifecycle Framework

## Prerequisites

- AI agent or LLM with instruction-following capability
- Context window: 8K+ tokens (32K+ recommended)
- Basic familiarity with software development

## 5-Minute Quick Start

### Step 1: Load the System Prompt
Copy the contents of `core/system-prompt.md` into your agent's system prompt field.

**For Claude.ai**: Paste into the "System prompt" field in your project settings.
**For GPT**: Paste into the "Custom Instructions" section.
**For CLI tools**: Use `--system` flag or equivalent.

### Step 2: Select a Workflow
Identify what you need to do and select the corresponding workflow:

| Need | Workflow |
|------|----------|
| Research a technology | `workflows/01-research.md` |
| Analyze requirements | `workflows/02-analyze.md` |
| Design architecture | `workflows/03-design.md` |
| Write code | `workflows/04-implement.md` |
| Test software | `workflows/05-test.md` |
| Fix a bug | `workflows/06-debug.md` |
| Deploy software | `workflows/07-deploy.md` |

See `QUICK-REFERENCE.md` for all 34 workflows.

### Step 3: Load the Workflow
Provide the selected workflow as context to your agent. You can:
- Paste the workflow content directly
- Reference the workflow file path
- Include as part of your prompt

### Step 4: Execute the Task
Ask your agent to perform the task. It will follow the workflow steps.

**Example prompt:**
```
I need to research the best database for a Python microservice 
handling 10K transactions/second. Please follow the research workflow 
and provide a detailed comparison.
```

### Step 5: Review the Output
Check the output against the quality gates defined in the workflow. If quality gates fail, ask for revisions.

## First Project: Research Task (Detailed)

1. Load `core/system-prompt.md` as system prompt
2. Load `workflows/01-research.md` as context
3. Ask: "Research the best database for a Python microservice handling 10K transactions/second"
4. Agent follows 7-step research workflow:
   - Defines objectives
   - Gathers information from multiple sources
   - Verifies claims across independent sources
   - Evaluates options using weighted scoring
   - Identifies best practices
   - Synthesizes findings
   - Produces a research report
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
- strict_mode: false

## Workflow Overrides
- 01-research:
  - verbosity: detailed
- 04-implement:
  - verbosity: detailed
```

## Context Window Management

| Context Size | Strategy |
|--------------|----------|
| **Small (<8K)** | Load system prompt OR workflow (not both), use minimal verbosity |
| **Medium (8K-32K)** | Load system prompt + one workflow, use standard verbosity |
| **Large (32K+)** | Load system prompt + workflow + additional context, use detailed verbosity |

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
