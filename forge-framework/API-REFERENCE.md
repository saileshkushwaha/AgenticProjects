# API Reference - Forge Engineering Lifecycle Framework

## Overview

This document provides a machine-readable reference for the Forge framework structure, enabling tooling and automation.

## Framework Metadata

```json
{
  "name": "forge-framework",
  "version": "3.0.0",
  "description": "Production-ready, markdown-based agentic framework for end-to-end SDLC operations",
  "license": "MIT",
  "minContextWindow": 8192,
  "recommendedContextWindow": 32768,
  "languages": ["en", "es", "fr", "de", "ja", "zh"]
}
```

## Directory Structure Specification

```json
{
  "structure": {
    "core": {
      "path": "core/",
      "files": ["system-prompt.md", "persona.md", "principles.md"],
      "required": true
    },
    "workflows": {
      "path": "workflows/",
      "pattern": "##-name.md",
      "count": 34,
      "required": true
    },
    "capabilities": {
      "path": "capabilities/",
      "pattern": "name.md",
      "count": 34,
      "required": true
    },
    "templates": {
      "path": "templates/",
      "pattern": "name-template.md",
      "count": 34,
      "required": true
    },
    "artifacts": {
      "path": "artifacts/",
      "files": ["output-format.md"],
      "required": true
    },
    "guides": {
      "path": "guides/",
      "pattern": "name-guide.md",
      "required": false
    },
    "examples": {
      "path": "examples/",
      "pattern": "name-example.md",
      "required": false
    }
  }
}
```

## Workflow Specification

```json
{
  "workflow": {
    "required_fields": [
      "name",
      "duration",
      "outputs",
      "trigger",
      "steps",
      "quality_gates",
      "anti_patterns",
      "output_reference"
    ],
    "step_fields": {
      "required": ["name", "actions", "time_estimate"],
      "optional": ["tools", "edge_cases", "code_examples"]
    },
    "quality_gate_fields": {
      "required": ["id", "criteria"]
    }
  }
}
```

## Template Specification

```json
{
  "template": {
    "required_sections": [
      "header",
      "executive_summary",
      "main_content",
      "decisions_rationale",
      "risks_mitigations",
      "assumptions",
      "open_issues",
      "next_steps",
      "references"
    ],
    "header_fields": [
      "Created",
      "Phase",
      "Status",
      "Author",
      "Version"
    ],
    "status_values": ["draft", "review", "approved"]
  }
}
```

## Capability Specification

```json
{
  "capability": {
    "required_fields": [
      "definition",
      "proficiency_levels",
      "scope",
      "skills",
      "quality_criteria"
    ],
    "proficiency_level_fields": {
      "required": ["level", "title", "description"]
    },
    "assessment_criteria_fields": {
      "required": ["level", "criteria"]
    }
  }
}
```

## Configuration Schema

```json
{
  "forge.config.md": {
    "type": "object",
    "properties": {
      "output_format": {
        "type": "string",
        "enum": ["markdown", "html", "json"],
        "default": "markdown"
      },
      "quality_gates": {
        "type": "string",
        "enum": ["enabled", "disabled"],
        "default": "enabled"
      },
      "verbosity": {
        "type": "string",
        "enum": ["minimal", "standard", "detailed"],
        "default": "standard"
      },
      "language": {
        "type": "string",
        "enum": ["en", "es", "fr", "de", "ja", "zh"],
        "default": "en"
      },
      "strict_mode": {
        "type": "boolean",
        "default": false
      },
      "validate_output": {
        "type": "boolean",
        "default": true
      },
      "normalize_output": {
        "type": "boolean",
        "default": true
      }
    }
  }
}
```

## Quality Gate Schema

```json
{
  "quality_gate": {
    "type": "object",
    "properties": {
      "id": {
        "type": "string",
        "pattern": "^QG[0-9]+$"
      },
      "criteria": {
        "type": "string",
        "minLength": 10
      }
    },
    "required": ["id", "criteria"]
  }
}
```

## Artifact Status Workflow

```json
{
  "status_workflow": {
    "states": ["draft", "review", "approved", "revise"],
    "transitions": [
      {"from": "draft", "to": "review"},
      {"from": "review", "to": "approved"},
      {"from": "review", "to": "revise"},
      {"from": "revise", "to": "review"}
    ]
  }
}
```

## Extension Points

The framework supports extension at these points:

### 1. Custom Workflows
- Add new files in `workflows/` following the naming pattern `##-name.md`
- Create matching capability in `capabilities/`
- Create matching template in `templates/`

### 2. Custom Templates
- Add new files in `templates/`
- Reference from workflow output section

### 3. Custom Guides
- Add new files in `guides/`
- Reference from README.md

### 4. Configuration Extensions
- Add new properties to `forge.config.md`
- Document in configuration-guide.md

## Validation Rules

```json
{
  "validation": {
    "workflow": {
      "must_have_quality_gates": true,
      "must_have_anti_patterns": true,
      "must_have_output_reference": true,
      "min_steps": 3
    },
    "template": {
      "must_have_header": true,
      "must_have_executive_summary": true,
      "must_have_decisions_table": true,
      "must_have_risks_table": true
    },
    "capability": {
      "must_have_proficiency_levels": true,
      "must_have_assessment_criteria": true,
      "proficiency_levels_count": 5
    }
  }
}
```

## Tool Integration

### MCP Server Configuration

```json
{
  "mcp": {
    "server_name": "forge-framework",
    "capabilities": ["workflow_selection", "template_validation", "quality_gate_check"]
  }
}
```

### CLI Interface

```bash
# Select workflow
forge workflow select <task_type>

# Validate artifact
forge validate <artifact_path> --template <template_name>

# Check quality gates
forge qg-check <artifact_path> --workflow <workflow_name>
```
