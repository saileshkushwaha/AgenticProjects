# Workflow 19: API Management

**Duration**: 2-8h | **Outputs**: API inventory, versioning strategy, deprecation plan

## Trigger

- API inventory, versioning strategy, deprecation planning
- Developer experience assessment, API analytics

## Steps

### Step 1: API Inventory
Catalog all APIs (internal, external, partner). Document endpoints, versions, owners.
**Time**: 1-2h.

### Step 2: Versioning Strategy
Define versioning approach (URL, header, semantic). Document policy.
**Time**: 1-2h.

### Step 3: Deprecation Planning
Identify deprecated APIs. Plan migration path. Communicate timeline.
**Time**: 1-2h.

### Step 4: Developer Experience
Assess API documentation, SDKs, sandbox. Identify improvements.
**Time**: 1-2h.

### Step 5: Analytics and Monitoring
Review API usage, performance, errors. Identify trends.
**Time**: 30-60 min.

### Step 6: Documentation
Document inventory, versioning, deprecation, DX improvements.
**Time**: 30-60 min.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Inventory complete |
| QG2 | Versioning strategy defined |
| QG3 | Deprecation plan created |
| QG4 | DX assessed |
| QG5 | Analytics configured |
| QG6 | Report follows template |

## Output

Use: `templates/api-management-report.md` | Capability: `capabilities/api-management.md`

## Anti-Patterns

1. **Writing for yourself** — Not considering audience needs
2. **No review** — Publishing without technical review
3. **Outdated docs** — Not maintaining documentation
4. **No examples** — Abstract explanations without examples

## Edge Cases

- Multiple audiences → Create separate documents per audience
- No existing template → Adapt from similar project
- Technical reviewer unavailable → Use peer review
