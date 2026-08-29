# Workflow 22: Compliance Audit

**Duration**: 4-20h | **Outputs**: Compliance report, gap analysis, remediation plan

## Trigger
- Regulatory audit (GDPR, HIPAA, SOC2, PCI-DSS), compliance review
- Pre-certification assessment, policy update

## Steps

### Step 1: Scope Definition
Define applicable regulations. Identify systems and data in scope.
**Time**: 1-2h.

### Step 2: Control Assessment
Map controls to requirements. Assess current implementation. Identify gaps.
**Time**: 2-6h.

### Step 3: Evidence Collection
Gather documentation. Interview stakeholders. Review configurations.
**Time**: 2-4h.

### Step 4: Gap Analysis
Identify non-compliant areas. Assess risk of gaps. Prioritize remediation.
**Time**: 2-4h.

### Step 5: Remediation Planning
Create remediation roadmap. Assign owners. Define timelines.
**Time**: 1-2h.

### Step 6: Reporting
Document findings, gaps, remediation plan. Executive summary.
**Time**: 1-2h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Scope defined |
| QG2 | Controls assessed |
| QG3 | Evidence collected |
| QG4 | Gaps identified |
| QG5 | Remediation planned |
| QG6 | Report complete |

## Output
Use: `templates/compliance-report.md` | Capability: `capabilities/compliance.md`

## Anti-Patterns

1. **Big bang migration** — Migrating everything at once
2. **No rollback plan** — Migrating without recovery strategy
3. **Ignoring data quality** — Migrating without validation
4. **No testing** — Deploying without testing migration

## Edge Cases

- Large data volumes → Use incremental migration
- Schema mismatch → Create transformation layer
- Downtime constraints → Use blue-green deployment
