# Workflow 00: Greenfield Master

**Duration**: 20-80h | **Outputs**: Complete project from idea to deployment

## Trigger

- New project from scratch
- Startup MVP development
- Proof-of-concept implementation
- Full-stack application development
- Complete system modernization

## Overview

This master workflow orchestrates all phases of a greenfield project from initial research through deployment. It manages context window by loading only the current phase workflow, passes artifacts between phases, and handles iterative refinement.

## Phase Orchestration

```
Phase 1: Project Initiation
    ↓
Phase 2: Research
    ↓
Phase 3: Analysis
    ↓
Phase 4: Design
    ↓
Phase 5: Implementation
    ↓
Phase 6: Testing
    ↓
Phase 7: Deployment
    ↓
Phase 8: Post-Launch
```

## Context Window Management

### Loading Strategy

| Context Size | Strategy |
|--------------|----------|
| **Small (<8K)** | Load one phase at a time, summarize previous outputs |
| **Medium (8K-32K)** | Load current phase + summary of previous phases |
| **Large (32K-128K)** | Load current phase + full previous artifacts |
| **XLarge (128K+)** | Load multiple phases, full context |

### Artifact Caching

Each phase produces artifacts that are cached for subsequent phases:
- Research → Research report
- Analysis → Requirements document
- Design → Design document
- Implementation → Source code + tests
- Testing → Test report
- Deployment → Deployment configuration

## Steps

### Step 1: Project Initiation

**Actions**:
1. Define project vision and goals
2. Identify target users and stakeholders
3. Define success criteria and KPIs
4. Create project charter
5. Initialize project structure using scaffold template

**Output**: Project charter, initial project structure

**Time**: 1-2h

**Template**: `templates/project-scaffold.md`

### Step 2: Research Phase

**Actions**:
1. Load `workflows/01-research.md`
2. Execute research workflow
3. Document findings in research report
4. Identify technology candidates
5. Validate assumptions

**Output**: Research report, technology comparison matrix

**Time**: 2-8h (quick) / 8-40h (deep)

**Next Trigger**: Research complete → Analysis phase

### Step 3: Analysis Phase

**Actions**:
1. Load `workflows/02-analyze.md`
2. Execute analysis workflow
3. Document requirements
4. Assess feasibility
5. Identify risks

**Output**: Requirements document, feasibility assessment, risk register

**Time**: 4-16h

**Next Trigger**: Analysis complete → Design phase

### Step 4: Design Phase

**Actions**:
1. Load `workflows/03-design.md`
2. Execute design workflow
3. Create architecture document
4. Design components and interfaces
5. Document design decisions (ADRs)

**Output**: Architecture document, component designs, API specifications, ADRs

**Time**: 4-20h

**Next Trigger**: Design complete → Implementation phase

### Step 5: Implementation Phase

**Actions**:
1. Load `workflows/04-implement.md`
2. Execute implementation workflow
3. Set up development environment
4. Implement features incrementally
5. Write unit tests
6. Conduct code reviews

**Output**: Source code, unit tests, code review comments

**Time**: 4-40h

**Next Trigger**: Implementation complete → Testing phase

### Step 6: Testing Phase

**Actions**:
1. Load `workflows/05-test.md`
2. Execute testing workflow
3. Plan and execute tests
4. Track and resolve defects
5. Validate coverage

**Output**: Test plan, test results, coverage report, quality assessment

**Time**: 4-20h

**Next Trigger**: Testing complete → Deployment phase

### Step 7: Deployment Phase

**Actions**:
1. Load `workflows/07-deploy.md`
2. Execute deployment workflow
3. Set up environments
4. Deploy application
5. Verify deployment
6. Monitor health

**Output**: Deployment plan, verification report, monitoring configuration

**Time**: 1-4h

**Next Trigger**: Deployment complete → Post-launch

### Step 8: Post-Launch Phase

**Actions**:
1. Monitor application health
2. Gather user feedback
3. Plan improvements
4. Document lessons learned

**Output**: Monitoring dashboard, feedback report, improvement roadmap

**Time**: Ongoing

## Phase Dependency Management

### Input/Output Contracts

| Phase | Input Artifacts | Output Artifacts |
|-------|-----------------|------------------|
| Initiation | User vision | Project charter |
| Research | Project charter | Research report |
| Analysis | Research report | Requirements document |
| Design | Requirements document | Design document |
| Implementation | Design document | Source code + tests |
| Testing | Source code | Test report |
| Deployment | Test report | Deployed application |
| Post-Launch | Deployed application | Feedback + improvements |

### Iterative Refinement

If a phase discovers issues from previous phases:

1. **Research → Analysis**: New requirements discovered → Update research
2. **Analysis → Design**: Design constraints found → Update requirements
3. **Design → Implementation**: Implementation issues → Update design
4. **Implementation → Testing**: Test failures → Fix implementation
5. **Testing → Deployment**: Deployment blockers → Fix issues
6. **Deployment → Post-Launch**: Production issues → Hotfix

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Project charter approved |
| QG2 | Research complete with validated findings |
| QG3 | Requirements documented and feasible |
| QG4 | Design complete with ADRs |
| QG5 | Implementation complete with passing tests |
| QG6 | Testing complete with acceptable quality |
| QG7 | Deployment successful and verified |
| QG8 | Post-launch monitoring active |

## Anti-Patterns

1. **Skipping phases** — Each phase builds on previous
2. **Big bang implementation** — Iterate incrementally
3. **Ignoring feedback** — Incorporate findings from each phase
4. **No documentation** — Document decisions at each phase
5. **Context overflow** — Manage context window carefully

## Output

Use: `templates/project-scaffold.md` for initiation, then follow individual workflow templates for each phase.

## Context Preservation Between Sessions

### Session Handshake Protocol

When starting a new session for the next phase:

1. **Load previous artifacts**: Reference outputs from completed phases
2. **Summarize context**: Brief summary of project state
3. **Load current workflow**: Only the workflow for the current phase
4. **Execute**: Follow the workflow steps
5. **Update artifacts**: Produce outputs for next phase

### Example Session Handshake

```
Previous phases completed: Research, Analysis, Design
Current phase: Implementation
Key decisions: [summary of key decisions from previous phases]
Current task: [specific implementation task]
```

## Configuration

```markdown
# forge.config.md

## Greenfield Settings
- project_name: [name]
- project_type: [web/mobile/desktop/api]
- tech_stack: [preferred technologies]
- team_size: [number]
- timeline: [weeks/months]
- budget: [amount]
- compliance: [requirements]

## Phase Overrides
- 01-research:
  - mode: deep
- 04-implement:
  - verbosity: detailed
```

## Output

Use: `templates/project-scaffold.md` for initiation, then follow individual workflow templates for each phase.
## Edge Cases

- Very large projects → Break into sub-projects, each with own master workflow
- Very small projects → Combine phases (e.g., Research + Analysis)
- No clear vision → Start with Research phase to clarify
- Resource constraints → Prioritize MVP, defer nice-to-haves
- Changing requirements → Use iterative refinement, update artifacts
