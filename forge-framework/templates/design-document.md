# Design Document

**Created**: [ISO 8601] | **Phase**: Design | **Status**: [draft|review|approved]
**Author**: [Name] | **Version**: [SemVer]

## Executive Summary
[2-3 sentences: what was designed, key decisions, rationale]

## Design Objectives
- Objective 1: [description]
- Objective 2: [description]

## Requirements Traceability

| Requirement | Design Element | Status |
|-------------|----------------|--------|
| [REQ-01] | [Component/Module] | [addressed] |

## Architecture

### Architectural Style
[Selected style and rationale]

### System Context
[Diagram and description of system boundaries]

### Component Architecture
[Diagram and description of major components]

### Deployment Architecture
[Diagram and description of deployment topology]

## Component Designs

### Component 1: [Name]
**Responsibility**: [single responsibility]
**Interface**: [inputs, outputs, protocols]
**Dependencies**: [list]
**Design Patterns**: [patterns applied]
**Internal Structure**: [classes, modules, functions]

## Data Model

### Entity-Relationship Diagram
[ER diagram]

### Entity Definitions

#### Entity 1: [Name]
| Attribute | Type | Constraints | Description |
|-----------|------|-------------|-------------|
| [attr] | [type] | [constraints] | [description] |

### Indexes
| Entity | Index | Type | Purpose |
|--------|-------|------|---------|
| [entity] | [columns] | [type] | [purpose] |

## API Specification

### API 1: [Name]
**Endpoint**: `[METHOD] /path/to/resource`
**Request**: ```json { "field": "type - description" } ```
**Response**: ```json { "field": "type - description" } ```
**Errors**: [Status]: [Code] - [Description]

## Architecture Decision Records

### ADR-001: [Title]
**Status**: [proposed|accepted|superseded]
**Context**: [What is the issue?]
**Decision**: [What was decided?]
**Consequences**: Positive: [list] | Negative: [list]

## Security Design
**Authentication**: [approach] | **Authorization**: [approach] | **Data Protection**: [approach]

## Performance Design
**Scalability**: [approach] | **Caching**: [strategy]

| Metric | Target | Measurement |
|--------|--------|-------------|
| [metric] | [target] | [how measured] |

## Design Principles Applied
1. **[Principle 1]**: [how applied]
2. **[Principle 2]**: [how applied]

## Trade-offs Accepted
| Trade-off | Gained | Sacrificed |
|-----------|--------|------------|
| [trade-off] | [benefit] | [cost] |

## Open Issues / Next Steps / References
- [Issue 1]: [impact]
- [Step 1]: [action]
- [Reference 1]: [citation]
