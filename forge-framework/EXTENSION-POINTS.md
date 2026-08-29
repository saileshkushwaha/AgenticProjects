# Extension Points - Forge Engineering Lifecycle Framework

## Overview

The Forge framework is designed to be extensible. This document describes how to extend the framework with custom workflows, templates, capabilities, and integrations.

## Extension Points

### 1. Custom Workflows

Add new workflows to cover domain-specific needs.

**Location**: `workflows/`

**Naming Convention**: `##-name.md` (zero-padded number, hyphenated name)

**Structure**:
```markdown
# Workflow ##: [Name]

**Duration**: [X-Yh] | **Outputs**: [artifact list]

## Trigger
- [condition 1]
- [condition 2]

## Steps
### Step 1: [Name]
[actions]
**Time**: [X-Y min/h].

## Quality Gates
| Gate | Criteria |
|------|----------|
| QG1 | [criteria] |

## Anti-Patterns
1. **[Name]**: [description]

## Output
Use: `templates/[name]-template.md` | Capability: `capabilities/[name].md`
```

**Validation Rules**:
- Must have at least 3 steps
- Must have quality gates
- Must have anti-patterns section
- Must reference a template and capability

### 2. Custom Templates

Add new artifact templates for domain-specific outputs.

**Location**: `templates/`

**Naming Convention**: `name-template.md` or `name-report.md`

**Required Sections**:
```markdown
# [Template Name]

**Created**: [ISO 8601] | **Phase**: [phase] | **Status**: [draft|review|approved]
**Author**: [Name] | **Version**: [SemVer]

## Executive Summary
[2-3 sentences]

## [Main Content Sections]

## Decisions & Rationale
| Decision | Options Considered | Rationale |

## Risks & Mitigations
| Risk | Probability | Impact | Mitigation |

## Assumptions
- [Assumption 1]: [basis]

## Open Issues
- [Issue 1]: [blocker]

## Next Steps
1. [Action item 1]

## References
- [Reference 1]: [citation]
```

### 3. Custom Capabilities

Add new capability definitions.

**Location**: `capabilities/`

**Naming Convention**: `name.md`

**Structure**:
```markdown
# [Name] Capability

## Definition
[Description of the capability]

## Proficiency Levels
| Level | Title | Description |
|-------|-------|-------------|
| 1 | Novice | [description] |
| 2 | Competent | [description] |
| 3 | Proficient | [description] |
| 4 | Expert | [description] |
| 5 | Master | [description] |

## Scope
**In Scope**: [items]
**Out of Scope**: [items]

## Skills
### [Skill Category]
- [skill 1]
- [skill 2]

## Assessment Criteria
### Level 1 (Novice)
- [ ] [criterion]

## Quality Criteria
- [criterion 1]

## Related Workflows
- `workflows/##-name.md` - Primary workflow
```

### 4. Custom Guides

Add new guides for specific topics.

**Location**: `guides/`

**Naming Convention**: `name-guide.md`

**Structure**:
```markdown
# [Topic] Guide

## Overview
[Purpose and scope]

## [Section 1]
[Content]

## [Section 2]
[Content]

## References
- [Reference 1]
```

### 5. Custom Configuration

Extend the configuration options.

**Add to `forge.config.md`**:
```markdown
## Custom Settings
- custom_option: value
```

**Document in `guides/configuration-guide.md`**:
```markdown
### custom_option
[Description, valid values, default]
```

### 6. Integration Extensions

Add new tool integrations.

**Location**: `guides/tool-connectors.md` (or create new guide)

**Structure**:
```markdown
### [Tool Name] Integration

| Capability | Description | API Endpoint |
|------------|-------------|--------------|
| [capability] | [description] | [endpoint] |

**Configuration**:
```markdown
## [Tool] Configuration
- enabled: true/false
- [option]: [value]
```
```

## Extension Validation

### Workflow Validation Checklist

When adding a new workflow, verify:
- [ ] Follows naming convention (##-name.md)
- [ ] Has at least 3 steps
- [ ] Has quality gates (minimum 3)
- [ ] Has anti-patterns section
- [ ] References existing template or new template provided
- [ ] References existing capability or new capability provided
- [ ] Time estimates provided for each step
- [ ] Edge cases documented

### Template Validation Checklist

When adding a new template, verify:
- [ ] Follows naming convention
- [ ] Has all required sections
- [ ] Uses proper header format
- [ ] Uses tables for structured data
- [ ] Uses consistent terminology

### Capability Validation Checklist

When adding a new capability, verify:
- [ ] Follows naming convention
- [ ] Has 5 proficiency levels
- [ ] Has assessment criteria for each level
- [ ] Has defined scope (in/out)
- [ ] Has quality criteria

## Extension Examples

### Example: Adding a "Machine Learning Model Development" Workflow

1. Create `workflows/35-ml-model-development.md`:
```markdown
# Workflow 35: ML Model Development

**Duration**: 8-40h | **Outputs**: Model card, training report, evaluation results

## Trigger
- New ML model needed
- Model improvement required
- Research prototype to production

## Steps
### Step 1: Problem Definition
Define ML problem type, success metrics, constraints.
**Time**: 1-2h.

### Step 2: Data Assessment
Assess data availability, quality, and preparation needs.
**Time**: 2-4h.

[... additional steps ...]

## Quality Gates
| Gate | Criteria |
|------|----------|
| QG1 | Problem clearly defined |
| QG2 | Data assessment complete |
| QG3 | Baseline model trained |
| QG4 | Evaluation metrics met |
| QG5 | Model card complete |

## Anti-Patterns
1. **Skipping EDA** — Jumping to modeling without understanding data
2. **Data leakage** — Using test data during training
3. **No baseline** — Not establishing a simple baseline first

## Output
Use: `templates/ml-model-card.md` | Capability: `capabilities/ml-development.md`
```

2. Create `capabilities/ml-development.md` following the capability structure
3. Create `templates/ml-model-card.md` following the template structure
4. Update `README.md` to include the new workflow
5. Update `CHANGELOG.md` with the addition

## Versioning for Extensions

When extending the framework:

- **PATCH**: Adding examples, clarifying existing content
- **MINOR**: Adding new workflows, templates, or capabilities
- **MAJOR**: Breaking changes to existing structure

## Contributing Extensions

See `CONTRIBUTING.md` for the full contribution process.

### Extension Review Process

1. Validate against extension checklists
2. Test with at least one AI model
3. Submit pull request with description of extension
4. Address review comments
5. Merge upon approval

## Extension Compatibility

Extensions should maintain compatibility with:
- Existing workflows and templates
- Configuration options
- Quality gate structure
- Output format specification

## Extension Deprecation

When deprecating an extension:
1. Mark as deprecated in current MINOR version
2. Include migration guidance
3. Remove in next MAJOR version
4. Document in CHANGELOG.md
