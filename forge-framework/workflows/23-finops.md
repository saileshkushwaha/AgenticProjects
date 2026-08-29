# Workflow 23: FinOps

**Duration**: 4-16h | **Outputs**: Cost analysis, optimization plan, savings report

## Trigger
- Cloud cost optimization, budget review, cost anomaly
- Reserved instance planning, resource right-sizing

## Steps

### Step 1: Cost Analysis
Analyze current spend (by service, team, environment). Identify trends.
**Time**: 2-4h.

### Step 2: Waste Identification
Identify idle resources, over-provisioning, unused reservations.
**Time**: 2-4h.

### Step 3: Optimization Strategy
Define RI/SP strategy. Plan right-sizing. Identify serverless opportunities.
**Time**: 2-4h.

### Step 4: Implementation
Apply optimizations. Purchase RIs/SPs. Right-size resources.
**Time**: 2-8h.

### Step 5: Monitoring Setup
Set up cost alerts. Create dashboards. Define budgets.
**Time**: 1-2h.

### Step 6: Reporting
Document savings, recommendations, ongoing optimization plan.
**Time**: 1-2h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Costs analyzed |
| QG2 | Waste identified |
| QG3 | Strategy defined |
| QG4 | Optimizations applied |
| QG5 | Monitoring configured |
| QG6 | Savings documented |

## Output
Use: `templates/finops-report.md` | Capability: `capabilities/finops.md`

## Anti-Patterns

1. **Big bang migration** — Migrating everything at once
2. **No rollback plan** — Migrating without recovery strategy
3. **Ignoring data quality** — Migrating without validation
4. **No testing** — Deploying without testing migration

## Edge Cases

- Large data volumes → Use incremental migration
- Schema mismatch → Create transformation layer
- Downtime constraints → Use blue-green deployment
