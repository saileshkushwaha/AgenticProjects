# Integration Guide - Forge Engineering Lifecycle Framework

## Overview

This document explains how the Forge workflows connect and integrate with each other to form a complete SDLC process.

## Workflow Dependencies

### Linear Flow (Most Common)
```
Research → Analysis → Design → Implementation → Testing → Deployment
```

### Iterative Flow
```
Research ↔ Analysis ↔ Design ↔ Implementation ↔ Testing
    ↑_________________________________________________↓
```

### Parallel Flow
```
                    → Implementation → Testing →
Research → Analysis → Design →                     → Deployment
                    → Implementation → Testing →
```

## Phase Handoff Points

| From | To | Transfers |
|------|-----|-----------|
| Research | Analysis | Tech evaluations, best practices, confidence levels |
| Analysis | Design | Requirements, feasibility constraints, risks |
| Design | Implementation | Component specs, interfaces, data models, ADRs |
| Implementation | Testing | Source code, unit tests, integration points |
| Testing | Deployment | Test results, quality assessment, known issues |
| Deployment | Modernization | Operational data, user feedback, improvement opportunities |

## Cross-Cutting Workflows

### Communication (Supports All Phases)
| Phase | Communication Output |
|-------|---------------------|
| Research | Research presentation, technology brief |
| Analysis | Requirements presentation, risk report |
| Design | Architecture review, ADR presentation |
| Implementation | Code review, sprint demo |
| Testing | Test results report, quality assessment |
| Debugging | Incident report, root cause summary |
| Deployment | Release notes, deployment status |
| Modernization | Migration progress, lessons learned |

### Modernization (Can Start at Any Phase)
Modernization can be initiated from any phase based on findings or issues.

## Context Preservation

### Decision Log
| ID | Phase | Decision | Rationale | Date |
|----|-------|----------|-----------|------|
| D001 | Research | Selected PostgreSQL | Best fit for requirements | 2026-08-28 |
| D002 | Analysis | Must support 10K users | Business requirement | 2026-08-28 |

### Assumption Log
| ID | Phase | Assumption | Basis | Status |
|----|-------|------------|-------|--------|
| A001 | Research | Technology X is mature | Community evidence | Validated |
| A002 | Analysis | Budget is sufficient | Stakeholder statement | At risk |

## Integration Patterns

| Pattern | Flow | Use When |
|---------|------|----------|
| Full Lifecycle | Research → Analysis → Design → Implementation → Testing → Deployment | New projects |
| Feature Addition | Analysis → Design → Implementation → Testing → Deployment | Existing system |
| Bug Fix | Debugging → Implementation → Testing → Deployment | Specific issue |
| Hotfix | Debugging → Implementation → Testing (minimal) → Deployment (expedited) | Urgent production |
| Modernization | Research → Analysis → Design → Modernization → Testing → Deployment | Legacy upgrade |
| Research Only | Research → Communication | Knowledge gathering |
| Design Review | Research → Analysis → Design (review) → Communication | Evaluation |

## Multi-Team Integration

### Shared Artifacts
- Research reports (common knowledge base)
- Architecture Decision Records (consistent decisions)
- API specifications (integration contracts)
- Test results (quality visibility)

### Coordination Points
| Point | Participants | Purpose |
|-------|-------------|---------|
| Research review | All teams | Share findings, avoid duplication |
| Design review | Architecture team | Ensure consistency |
| Code review | Development team | Maintain quality |
| Test review | QA and dev | Align on quality |
| Release planning | All teams | Coordinate deployments |

### Dependency Management
| Team A | Depends On | Team B | Artifact | Due Date |
|--------|-----------|--------|----------|----------|
| Backend | API Design | API Team | OpenAPI spec | 2026-09-01 |
| Frontend | API Implementation | Backend | API endpoints | 2026-09-15 |
| QA | Test Environment | DevOps | Environment | 2026-09-10 |
