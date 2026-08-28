# Model & Tool Compatibility Guide - Forge Engineering Lifecycle Framework

## Model-Agnostic Compatibility

### Core Principles
1. **No model-specific features**: Only text-based instructions
2. **Template-enforced structure**: All outputs follow defined templates
3. **Objective quality gates**: Measurable, not model-dependent
4. **Fallback mechanisms**: Clear procedures for different outputs

### Model Capability Tiers

| Tier | Examples | Configuration |
|------|----------|---------------|
| **Full** | Claude 3.5+, GPT-4+, Gemini Pro+ | Default settings |
| **Mid** | Claude 3, GPT-3.5, Gemini, Llama 2 70B | strict_mode: true, verbosity: standard |
| **Basic** | Smaller/older models | verbosity: minimal, break into smaller steps |

### Model Adaptation

| Model Trait | Adaptation |
|-------------|------------|
| Verbose | verbosity: minimal, request concise, use bullets |
| Concise | verbosity: detailed, request comprehensive, ask for examples |
| Format-Challenged | strict_mode: true, provide explicit template |

### Output Normalization

1. **Validate Structure**: Check all required sections present
2. **Normalize Format**: Convert to proper Markdown, standardize headers
3. **Fill Gaps**: Request missing sections, use template to prompt

### Hallucination Detection

| Pattern | Detection |
|---------|-----------|
| Fabricated statistics | Source verification |
| False citations | Cross-reference check |
| Invented features | Plausibility check |
| Incorrect versions | Consistency check |

**Handling**: Flag as unverified, request source, mark if unverifiable

### Iterative Refinement

If output doesn't meet quality gates:
1. Identify which gates failed
2. Provide specific feedback
3. Request targeted revision
4. Re-validate
5. Repeat up to 3 times

## Agentic Tool Compatibility

| Category | Examples | Adaptation |
|----------|----------|------------|
| **CLI** | Kilo, Claude CLI, GPT CLI | System prompt + workflow as context |
| **Web** | ChatGPT, Claude.ai, Gemini | System prompt field or prepend |
| **API** | OpenAI API, Anthropic API | System message + user message |
| **IDE** | Cursor, Copilot, Cody | Adapt to IDE prompt structure |
| **Custom** | LangChain, AutoGPT, CrewAI | Agent persona + task description |

### Tool Capability Detection

| Capability | Adaptation |
|------------|------------|
| Web Search | Use real-time search for research |
| No Web Search | Rely on training data, note limitations |
| Code Execution | Execute examples to verify |
| No Code Execution | Provide code for manual execution |

### Context Window Management

| Size | Strategy |
|------|----------|
| **Small (<8K)** | System prompt OR workflow, minimal verbosity |
| **Medium (8K-32K)** | System prompt + one workflow, standard verbosity |
| **Large (32K+)** | System prompt + workflow + context, detailed verbosity |

### Session Management

**Single-Session**: Load system prompt → Load workflow → Execute → Review

**Multi-Session**: Complete phase → Save artifact → Next session load artifact → Next phase

**Context Preservation**: Reference previous artifacts, include key decisions, maintain decision log

## Consistency Validation

| Metric | Target |
|--------|--------|
| Structure consistency | 100% (all outputs match template) |
| Finding consistency | ≥80% (key findings agree) |
| Recommendation consistency | ≥90% (recommendations agree) |
| Quality gate pass rate | ≥90% |

## Universal Configuration

```markdown
# forge.config.md
## Global Settings
- output_format: markdown
- quality_gates: enabled
- verbosity: standard
- language: en
- strict_mode: true
- validate_output: true
- normalize_output: true
```
