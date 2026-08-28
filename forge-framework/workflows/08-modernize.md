# Workflow 08: Modernization

**Duration**: Days to months | **Outputs**: Assessment report, migration strategy, migration plan, validation report

## Trigger

- Legacy system migration
- Tech stack upgrade
- Technical debt reduction
- Performance improvement
- Security remediation
- Architecture evolution
- Platform migration

## Steps

### Step 1: Current State Assessment
**Actions**: Inventory systems, document architecture, identify pain points, assess debt, evaluate security, measure performance, document dependencies, assess team.
**Areas**: Code quality, Architecture, Infrastructure, Security, Performance, Maintainability
**Output**: Assessment report | **Time**: 2-8 hours | **Tools**: SonarQube, Structurizr, APM tools
**Edge Cases**: No docs → reverse-engineer; unavailable devs → code analysis; partial → critical paths first

### Step 2: Modernization Goals
**Actions**: Define objectives, identify success criteria, prioritize areas, define scope, set timeline, estimate resources, identify risks, get alignment.
**Categories**: Performance, Scalability, Security, Maintainability, Cost, Capabilities
**Output**: Goals document | **Time**: 1-2 hours | **Tools**: Workshops, prioritization matrices
**Edge Cases**: Conflicts → facilitate; unrealistic → phased; budget → highest-ROI

### Step 3: Migration Strategy
**Actions**: Define approach, identify phases, plan data/integration migration, define testing, create rollback, plan coexistence, define cutover.
**Approaches**: Big Bang, Incremental, Strangler Fig, Parallel Run, Lift and Shift, Replatform, Refactor
**Output**: Migration strategy | **Time**: 2-4 hours | **Tools**: Planning templates
**Edge Cases**: Data consistency → dual-write/CDC; integration deps → map/test; rollback → per-phase

### Step 4: Implementation Planning
**Actions**: Break into phases, define dependencies, create tasks, estimate effort, assign, define milestones, plan testing/rollback per phase.
**Output**: Implementation plan | **Time**: 2-4 hours | **Tools**: Jira, Gantt charts
**Edge Cases**: Capacity → extend; external deps → coordinate; scope creep → change control

### Step 5: Modernization Execution
**Actions**: Execute in phases, migrate data, refactor code, update infrastructure, implement components, integrate, test at boundaries, document.
**Principles**: Small increments, verify after each, maintain working system, keep rollback, communicate, update docs
**Output**: Modernized components | **Time**: Weeks-months | **Tools**: CI/CD, feature flags
**Edge Cases**: Complexity → reassess; performance → profile/rollback; data failure → backup/retry

### Step 6: Validation and Testing
**Actions**: Verify functional equivalence, validate performance, test integrations, test data, test rollback, UAT, verify security, validate criteria.
**Output**: Validation report | **Time**: 2-8 hours/phase | **Tools**: k6, OWASP ZAP, data validation
**Edge Cases**: Differences → document/sign-off; performance → profile/adjust; discrepancies → fix/re-migrate

### Step 7: Modernization Reporting
**Actions**: Document outcomes, compare metrics, document lessons, update architecture docs, update runbooks, share, plan improvement.
**Output**: Modernization report | **Time**: 1-2 hours | **Tools**: Report template
**Edge Cases**: Goals not met → document gaps; benefits → share; new issues → backlog

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Current state fully assessed |
| QG2 | Goals defined and approved |
| QG3 | Migration strategy documented |
| QG4 | Implementation plan created |
| QG5 | Each phase validated |
| QG6 | Success criteria met |
| QG7 | Documentation updated |

## Decision Points

| Point | Options | Criteria |
|-------|---------|----------|
| DP1: Migration approach? | Big Bang / Incremental / Strangler Fig | Risk, complexity, downtime |
| DP2: Modernize or replace? | Modernize / Replace | Cost, time, risk |
| DP3: Next phase? | Proceed / Fix / Rollback | Validation, risk |
| DP4: Scope adjustment? | Expand / Reduce / Maintain | New info, feedback |

## Anti-Patterns

1. **Big bang rewrite** — Everything at once
2. **Lift and shift** — No improvement
3. **No rollback** — No revert plan
4. **Ignoring data** — Code only
5. **No coexistence** — No parallel plan

## Output

Use: `templates/modernization-plan.md` | Prev: `07-deploy.md` | Next: `03-design.md` | Capability: `capabilities/modernization.md`
