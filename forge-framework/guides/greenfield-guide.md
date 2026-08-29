# Greenfield Project Guide - Forge Engineering Lifecycle Framework

## Overview

This guide provides step-by-step instructions for executing a complete greenfield project from initial idea to production deployment using the Forge framework.

## When to Use

Use this guide when:
- Starting a new project from scratch
- Building an MVP or proof-of-concept
- Developing a full-stack application
- Creating a complete system from idea to deployment

## Prerequisites

- AI agent with instruction-following capability
- Context window: 8K+ tokens (32K+ recommended)
- Basic familiarity with software development
- Clear project vision or problem statement

## Quick Start

### Single-Session Approach (Small Projects)

For small projects that fit within a single session:

1. Load `core/system-prompt.md` as system prompt
2. Load `workflows/00-greenfield-master.md` as context
3. Provide your project vision
4. The agent will orchestrate all phases

### Multi-Session Approach (Large Projects)

For larger projects that span multiple sessions:

1. **Session 1**: Project Initiation + Research
2. **Session 2**: Analysis + Design
3. **Session 3**: Implementation
4. **Session 4**: Testing
5. **Session 5**: Deployment + Post-Launch

## Detailed Steps

### Step 1: Initiation

**Goal**: Define project vision, goals, and constraints

**Actions**:
1. Describe your project vision
2. Identify target users
3. Define success criteria
4. Identify constraints
5. Create project charter

**Output**: Project charter using `templates/project-scaffold.md`

**Example Prompt**:
```
I want to build a [type of application] that [solves what problem] for [target users].
Key constraints: [timeline], [budget], [team size].
Please create a project charter and initial project structure.
```

### Step 2: Research

**Goal**: Evaluate technologies and approaches

**Actions**:
1. Define research objectives
2. Gather information from multiple sources
3. Evaluate technology candidates
4. Identify best practices
5. Document findings

**Output**: Research report using `templates/research-report.md`

**Example Prompt**:
```
Based on the project charter, please research the best technology stack.
Compare at least 3 options for each layer (frontend, backend, database).
Include pros, cons, and recommendations.
```

### Step 3: Analysis

**Goal**: Define requirements and assess feasibility

**Actions**:
1. Elicit functional and non-functional requirements
2. Assess technical, economic, and operational feasibility
3. Identify risks
4. Document constraints

**Output**: Requirements document using `templates/analysis-report.md`

**Example Prompt**:
```
Based on the research report, please analyze the requirements.
What are the must-have vs nice-to-have features?
What are the key risks and how can we mitigate them?
```

### Step 4: Design

**Goal**: Create system architecture and component designs

**Actions**:
1. Design system architecture
2. Design components and interfaces
3. Design data models
4. Design APIs
5. Document design decisions (ADRs)

**Output**: Design document using `templates/design-document.md`

**Example Prompt**:
```
Based on the requirements, please design the system architecture.
Include component diagrams, data flow, and API specifications.
Document key design decisions with rationale.
```

### Step 5: Implementation

**Goal**: Build the application incrementally

**Actions**:
1. Set up development environment
2. Implement features incrementally
3. Write unit tests
4. Conduct code reviews
5. Integrate components

**Output**: Source code, unit tests, implementation plan

**Example Prompt**:
```
Based on the design document, please implement the core features.
Follow clean code practices and write unit tests for each function.
Use the implementation plan template to track progress.
```

### Step 6: Testing

**Goal**: Validate quality through systematic testing

**Actions**:
1. Plan testing strategy
2. Execute tests
3. Track and resolve defects
4. Validate coverage
5. Assess quality

**Output**: Test plan, test results, quality assessment

**Example Prompt**:
```
Based on the implementation, please create and execute a test plan.
Include unit, integration, and system tests.
Track defects and ensure coverage targets are met.
```

### Step 7: Deployment

**Goal**: Deploy to production and verify

**Actions**:
1. Set up production environment
2. Execute deployment strategy
3. Verify deployment
4. Set up monitoring
5. Monitor health

**Output**: Deployment plan, verification report, monitoring config

**Example Prompt**:
```
Based on the test results, please plan and execute deployment.
Set up monitoring and verify the deployment is healthy.
Document the deployment process for future releases.
```

### Step 8: Post-Launch

**Goal**: Monitor, gather feedback, and iterate

**Actions**:
1. Monitor application health
2. Gather user feedback
3. Plan improvements
4. Document lessons learned

**Output**: Monitoring dashboard, feedback report, improvement roadmap

## Context Window Management

### For Small Context (<8K)
- Execute one phase per session
- Summarize previous outputs before proceeding
- Use concise mode

### For Medium Context (8K-32K)
- Execute 2-3 phases per session
- Include summary of previous phases
- Use standard verbosity

### For Large Context (32K-128K)
- Execute multiple phases per session
- Include full previous artifacts
- Use detailed verbosity

### For XLarge Context (128K+)
- Execute all phases in one session
- Full context available
- Use detailed verbosity

## Iterative Refinement

Greenfield projects often require iteration. When you discover issues:

1. **Research findings affect analysis**: Update requirements based on research
2. **Analysis findings affect design**: Update design based on requirements
3. **Design findings affect implementation**: Update implementation based on design
4. **Implementation findings affect testing**: Update tests based on implementation
5. **Testing findings affect deployment**: Fix issues before deployment
6. **Deployment feedback affects all**: Iterate based on production learnings

## Common Pitfalls

1. **Skipping research** — Leads to poor technology choices
2. **Incomplete analysis** — Leads to missed requirements
3. **Big bang implementation** — Leads to quality issues
4. **Insufficient testing** — Leads to production failures
5. **Poor documentation** — Leads to maintenance issues
6. **Ignoring feedback** — Leads to missed improvements

## Best Practices

1. **Follow the phases** — Each phase builds on the previous
2. **Document decisions** — Use ADRs for important decisions
3. **Iterate incrementally** — Build in small increments
4. **Test continuously** — Don't wait until the end
5. **Manage context** — Be mindful of context window limits
6. **Review quality gates** — Ensure each phase meets standards

## FAQ

**Q: Can I skip phases?**
A: Not recommended. Each phase builds on the previous. Skipping leads to gaps.

**Q: What if I don't have time for deep research?**
A: Use quick research mode. You can always deepen later.

**Q: How do I handle scope creep?**
A: Document changes in the requirements and assess impact on timeline.

**Q: What if my context window is too small?**
A: Use multi-session approach. Each session handles 1-2 phases.

**Q: How do I handle changes mid-project?**
A: Use iterative refinement. Propagate changes across phases.
