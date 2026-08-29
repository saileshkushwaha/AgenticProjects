# Project Scaffold

**Created**: [ISO 8601] | **Phase**: Initiation | **Status**: [draft|review|approved]
**Author**: [Name] | **Version**: [SemVer]
**Project**: [Project Name]

## Executive Summary
[2-3 sentences: project purpose, target users, key features]

## Project Charter

### Vision
[What problem does this project solve?]

### Goals
1. [Goal 1]
2. [Goal 2]
3. [Goal 3]

### Success Criteria
- [Criterion 1]: [measurement]
- [Criterion 2]: [measurement]

### Target Users
- [User type 1]: [needs]
- [User type 2]: [needs]

### Constraints
- Timeline: [weeks/months]
- Budget: [amount]
- Team: [size and skills]
- Compliance: [requirements]

## Project Structure

### Directory Layout

```
[project-name]/
├── README.md
├── LICENSE
├── .gitignore
├── docs/
│   ├── requirements.md
│   ├── architecture.md
│   ├── api-reference.md
│   └── adr/
│       └── 001-[decision].md
├── src/
│   ├── main/
│   │   ├── [language]/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── utils/
│   │   │   └── [entry-point].[ext]
│   │   └── resources/
│   │       ├── config/
│   │       └── migrations/
│   └── test/
│       ├── unit/
│       ├── integration/
│       └── e2e/
├── infrastructure/
│   ├── docker/
│   │   ├── Dockerfile
│   │   └── docker-compose.yml
│   ├── k8s/
│   │   ├── deployment.yml
│   │   └── service.yml
│   └── terraform/
│       └── main.tf
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── cd.yml
├── scripts/
│   ├── setup.sh
│   ├── test.sh
│   └── deploy.sh
└── forge.config.md
```

### Configuration Files

#### .gitignore
```gitignore
# Dependencies
node_modules/
vendor/
.venv/
__pycache__/

# Build
build/
dist/
*.class
*.jar
*.war

# IDE
.idea/
.vscode/
*.swp

# Environment
.env
.env.local

# OS
.DS_Store
Thumbs.db

# Logs
*.log
logs/

# Testing
coverage/
.nyc_output/
```

#### forge.config.md
```markdown
# Forge Configuration

## Project Settings
- project_name: [name]
- project_type: [web/mobile/desktop/api]
- tech_stack: [languages, frameworks]
- team_size: [number]

## Global Settings
- output_format: markdown
- quality_gates: enabled
- verbosity: standard
- language: en
- strict_mode: true

## Phase Overrides
- 01-research:
  - mode: deep
- 04-implement:
  - verbosity: detailed
```

## Technology Stack

| Layer | Technology | Version | Justification |
|-------|------------|---------|---------------|
| Frontend | [tech] | [version] | [reason] |
| Backend | [tech] | [version] | [reason] |
| Database | [tech] | [version] | [reason] |
| Cache | [tech] | [version] | [reason] |
| Message Queue | [tech] | [version] | [reason] |
| Infrastructure | [tech] | [version] | [reason] |
| CI/CD | [tech] | [version] | [reason] |
| Monitoring | [tech] | [version] | [reason] |

## Initial Setup

### Prerequisites
- [tool 1]: [version]
- [tool 2]: [version]

### Setup Steps
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Verification
- [ ] Build passes
- [ ] Tests pass
- [ ] Linting passes
- [ ] Documentation complete

## Milestones

| Milestone | Deliverable | Target Date | Status |
|-----------|-------------|-------------|--------|
| M1 | Project scaffold | [date] | pending |
| M2 | Research complete | [date] | pending |
| M3 | Design complete | [date] | pending |
| M4 | MVP implementation | [date] | pending |
| M5 | Testing complete | [date] | pending |
| M6 | Production deployment | [date] | pending |

## Risk Register

| ID | Risk | Probability | Impact | Mitigation |
|----|------|-------------|--------|------------|
| R001 | [risk] | [H/M/L] | [H/M/L] | [strategy] |

## Next Steps

1. Execute research phase (workflow 01)
2. Execute analysis phase (workflow 02)
3. Execute design phase (workflow 03)
4. Execute implementation phase (workflow 04)
5. Execute testing phase (workflow 05)
6. Execute deployment phase (workflow 07)

## References
- [Reference 1]: [citation]
- [Reference 2]: [citation]
