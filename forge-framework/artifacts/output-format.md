# Artifact Output Format Specification

## Standard Artifact Structure

```markdown
# [Artifact Title]

**Created**: [ISO 8601 timestamp]
**Phase**: [Current workflow phase]
**Status**: [draft | review | approved]
**Author**: [Agent/Team name]
**Version**: [Semantic version]

---

## Executive Summary
[2-3 sentence overview]

## [Main Content Sections]
[Phase-specific content as defined in the template]

## Decisions & Rationale
| Decision | Options Considered | Rationale |
|----------|-------------------|-----------|

## Risks & Mitigations
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|

## Assumptions / Open Issues / Next Steps / References
```

## Header Fields

| Field | Format | Required |
|-------|--------|----------|
| Created | ISO 8601 | Yes |
| Phase | Workflow name | Yes |
| Status | draft/review/approved | Yes |
| Author | String | Yes |
| Version | SemVer | Yes |

## Section Definitions

| Section | Purpose | Format |
|---------|---------|--------|
| Executive Summary | Quick overview | 2-3 sentences |
| Decisions & Rationale | Key decisions | Table |
| Risks & Mitigations | Risk management | Table |
| Assumptions | Documented assumptions | Bulleted list |
| Open Issues | Unresolved items | Bulleted list |
| Next Steps | What happens next | Numbered list |
| References | Sources | Bulleted list |

## Artifact Types

| Type | Template | Phase |
|------|----------|-------|
| Research Report | `research-report.md` | Research |
| Analysis Report | `analysis-report.md` | Analysis |
| Design Document | `design-document.md` | Design |
| Implementation Plan | `implementation-plan.md` | Implementation |
| Test Plan | `test-plan.md` | Testing |
| Debug Report | `debug-report.md` | Debugging |
| Deployment Plan | `deployment-plan.md` | Deployment |
| Modernization Plan | `modernization-plan.md` | Modernization |

## Formatting Rules

1. Use Markdown (ATX-style headers, not underlines)
2. Use fenced code blocks with language identifiers
3. Use tables for structured comparisons
4. Use bulleted lists for unordered items
5. Use numbered lists for sequential items
6. Use descriptive link text

## Status Workflow

```
draft → review → approved
  ↑         ↓
  └── revise ←──┘
```

## Versioning

Semantic versioning (MAJOR.MINOR.PATCH):
- **MAJOR**: Significant content changes
- **MINOR**: Additions (new sections, updated findings)
- **PATCH**: Corrections (typos, minor updates)

## Model-Agnostic Output Rules

1. **Always use the exact template** - never improvise structure
2. **Always include all required sections** - even if minimal content
3. **Always use the exact header format** specified
4. **Always use Markdown tables** for structured data
5. **Never use HTML tags** - use only Markdown syntax
6. **Never skip sections** - write "None identified" or "N/A" if empty
7. **Always cite sources** for claims, statistics, external information

## Output Validation Procedure

### Step 1: Structure Validation
Verify all required sections from template are present.

### Step 2: Format Normalization
Ensure proper Markdown formatting (headers, tables, lists, code blocks).

### Step 3: Content Validation
Verify claims supported, decisions documented, risks have mitigations.

### Step 4: Hallucination Check
Verify claims have citations, references are real, technical details accurate.

## Iterative Refinement

If output doesn't meet quality gates:
1. Identify failed gates
2. Provide specific feedback
3. Request targeted revision
4. Re-validate
5. Repeat up to 3 times

```
The output does not meet these quality gates:
- [Failed gates]

Please revise to address:
- [Specific issues]

Ensure the revised output follows the [template name] template exactly.
```
