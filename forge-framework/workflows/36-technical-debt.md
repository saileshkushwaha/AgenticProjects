# Workflow 36: Technical Debt Management

**Duration**: 2-8h | **Outputs**: Debt register, remediation plan, prevention strategy

## Trigger
- Code quality review, architecture assessment, maintenance planning
- Performance issues, security vulnerabilities, refactoring initiative

## Steps

### Step 1: Debt Identification
Identify and catalog technical debt items.
**Time**: 1-2h.

### Step 2: Debt Assessment
Assess severity, impact, and effort for each item.
**Time**: 1-2h.

### Step 3: Prioritization
Rank debt items by impact/effort ratio.
**Time**: 30-60 min.

### Step 4: Remediation Planning
Create roadmap for addressing debt.
**Time**: 1-2h.

### Step 5: Prevention Strategy
Define practices to prevent future debt.
**Time**: 30-60 min.

### Step 6: Reporting
Document debt register and remediation plan.
**Time**: 30-60 min.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Debt items identified and cataloged |
| QG2 | Severity and effort assessed |
| QG3 | Prioritization complete |
| QG4 | Remediation roadmap created |
| QG5 | Prevention strategy defined |

## Anti-Patterns

1. **Ignoring debt** — Not tracking or addressing debt
2. **Big bang refactoring** — Trying to fix everything at once
3. **No prevention** — Not addressing root causes
4. **No tracking** — Not monitoring debt over time

## Edge Cases

- Legacy systems → Prioritize critical debt only
- Resource constraints → Focus on high-impact, low-effort items
- No documentation → Start with code analysis

## Output

Use: `templates/technical-debt-register.md` | Capability: `capabilities/technical-debt.md`
