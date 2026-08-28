# Diagrams & Visual Reference - Forge Engineering Lifecycle Framework

## SDLC Workflow Overview

```mermaid
graph LR
    R[Research] --> A[Analysis]
    A --> D[Design]
    D --> I[Implementation]
    I --> T[Testing]
    T --> DP[Deployment]
    R -.-> M[Modernization]
    A -.-> M
    D -.-> M
    I -.-> M
    T -.-> M
    DP -.-> M
    C[Communication] -.-> R
    C -.-> A
    C -.-> D
    C -.-> I
    C -.-> T
    C -.-> DP
    C -.-> M
```

## Phase Flow Patterns

### Linear Flow
```mermaid
flowchart LR
    R([Research]) --> A([Analysis])
    A --> D([Design])
    D --> I([Implementation])
    I --> T([Testing])
    T --> DP([Deployment])
```

### Iterative Flow
```mermaid
flowchart LR
    R([Research]) <--> A([Analysis])
    A <--> D([Design])
    D <--> I([Implementation])
    I <--> T([Testing])
```

## Quality Gate Flow

```mermaid
flowchart LR
    Start([Start]) --> Execute[Execute Steps]
    Execute --> QG{Quality Gates}
    QG -->|Pass| Next[Next Phase]
    QG -->|Fail| Fix[Fix Issues]
    Fix --> Execute
```

## Decision-Making Framework

```mermaid
flowchart TB
    D1[1. Understand] --> D2[2. Explore]
    D2 --> D3[3. Evaluate]
    D3 --> D4[4. Decide]
    D4 --> D5[5. Document]
```

## Deployment Strategies

### Blue-Green Deployment
```mermaid
sequenceDiagram
    participant User
    participant LB as Load Balancer
    participant Blue as Blue (v1)
    participant Green as Green (v2)
    User->>LB: Request
    LB->>Blue: Route
    Note over Green: Deploy v2, verify
    LB->>Green: Switch
    User->>LB: Request
    LB->>Green: Route
```

### Canary Deployment
```mermaid
sequenceDiagram
    participant User
    participant LB as Load Balancer
    participant Stable as Stable (v1)
    participant Canary as Canary (v2)
    User->>LB: Request
    LB->>Stable: 95%
    LB->>Canary: 5%
    Note over Canary: Monitor
    LB->>Canary: 100%
```

## Artifact Relationship Map

```mermaid
flowchart LR
    RR[Research Report] --> AR[Analysis Report]
    AR --> DD[Design Document]
    DD --> IP[Implementation Plan]
    IP --> TP[Test Plan]
    TP --> DP[Deployment Plan]
    DP -.-> MP[Modernization Plan]
    RR -.-> MP
    RR -.->|Informs| C[Communication]
    AR -.->|Informs| C
    DD -.->|Informs| C
    IP -.->|Informs| C
    TP -.->|Informs| C
    DP -.->|Informs| C
    MP -.->|Informs| C
```

## Framework File Structure

```mermaid
graph TD
    ROOT[forge-framework/]
    ROOT --> README[README.md]
    ROOT --> QR[QUICK-REFERENCE.md]
    ROOT --> GLOSSARY[GLOSSARY.md]
    ROOT --> ANTI[ANTI-PATTERNS.md]
    ROOT --> METRICS[METRICS.md]
    ROOT --> CHANGELOG[CHANGELOG.md]
    ROOT --> DIAGRAMS[DIAGRAMS.md]
    ROOT --> CORE[core/]
    ROOT --> WORKFLOWS[workflows/]
    ROOT --> CAPABILITIES[capabilities/]
    ROOT --> TEMPLATES[templates/]
    ROOT --> ARTIFACTS[artifacts/]
    ROOT --> GUIDES[guides/]
    ROOT --> EXAMPLES[examples/]
```
