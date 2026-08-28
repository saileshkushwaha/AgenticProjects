# Configuration Guide - Forge Engineering Lifecycle Framework

## Configuration Levels

### Global Configuration
File: `forge.config.md` in project root. Applies to all workflows.

### Per-Workflow Configuration
Overrides global settings for specific workflows.

### Per-Project Configuration
Settings specific to a project.

## Configuration Options

| Option | Default | Values | Description |
|--------|---------|--------|-------------|
| `output_format` | markdown | markdown, html, json | Artifact output format |
| `quality_gates` | enabled | enabled, disabled | Enable quality gates |
| `verbosity` | standard | minimal, standard, detailed | Output detail level |
| `language` | en | en, es, fr, de, ja, zh | Output language |
| `strict_mode` | false | true, false | Enforce rules strictly |
| `time_estimate` | true | true, false | Include time estimates |
| `tool_recommendations` | true | true, false | Include tool suggestions |
| `examples` | true | true, false | Include worked examples |
| `edge_cases` | true | true, false | Include edge case handling |

## Configuration by Project Type

| Type | Verbosity | Examples | Strict Mode |
|------|-----------|----------|-------------|
| Greenfield | detailed | true | false |
| Maintenance | standard | false | false |
| Modernization | detailed | true | true |
| Research | detailed | true | false |

## Configuration by Team Size

| Size | Verbosity | Examples | Strict Mode |
|------|-----------|----------|-------------|
| Solo | minimal | false | false |
| Small (2-5) | standard | true | false |
| Medium (6-20) | detailed | true | true |
| Large (20+) | detailed | true | true |

## Configuration by Compliance

| Compliance | Strict Mode | Documentation |
|------------|-------------|---------------|
| SOC 2 | true | comprehensive |
| HIPAA | true | security_review: required |
| GDPR | true | privacy_review: required |

## Minimal Configuration
```markdown
# forge.config.md
- output_format: markdown
- quality_gates: enabled
```

## Comprehensive Configuration
```markdown
# forge.config.md
## Global Settings
- output_format: markdown
- quality_gates: enabled
- verbosity: detailed
- language: en
- strict_mode: false

## Workflow Overrides
- 01-research:
  - verbosity: detailed
  - tool_recommendations: true
- 07-deploy:
  - strict_mode: true

## Project Settings
- project_type: greenfield
- team_size: 8
- tech_stack: [react, node, postgres, redis]
- compliance: [soc2]
```

## Validation Rules
1. All workflows referenced must exist
2. All configuration values must be valid
3. Per-workflow overrides must not conflict with global settings
4. Project type must be: greenfield, maintenance, modernization, or research
