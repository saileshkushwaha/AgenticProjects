# Workflow 21: Disaster Recovery

**Duration**: 4-16h | **Outputs**: DR plan, backup strategy, recovery procedures

## Trigger
- DR planning, business continuity, compliance requirement
- Post-incident DR review, infrastructure change

## Steps

### Step 1: Business Impact Analysis
Identify critical systems. Define RTO/RPO. Assess impact of downtime.
**Time**: 2-4h.

### Step 2: Risk Assessment
Identify threats (natural, technical, human). Assess probability and impact.
**Time**: 1-2h.

### Step 3: Strategy Definition
Define backup strategy (full, incremental, differential). Plan replication and failover.
**Time**: 2-4h.

### Step 4: Procedure Documentation
Document recovery steps. Define roles and responsibilities. Create runbooks.
**Time**: 2-4h.

### Step 5: Testing Plan
Define testing schedule. Plan tabletop exercises and full DR tests.
**Time**: 1-2h.

### Step 6: Reporting
Document DR plan, RTO/RPO, testing schedule. Get approval.
**Time**: 1-2h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | BIA complete |
| QG2 | Risks assessed |
| QG3 | Strategy defined |
| QG4 | Procedures documented |
| QG5 | Testing planned |
| QG6 | Plan approved |

## Output
Use: `templates/dr-plan.md` | Capability: `capabilities/disaster-recovery.md`
