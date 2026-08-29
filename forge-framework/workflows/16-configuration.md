# Workflow 16: Configuration Management

**Duration**: 2-8h | **Outputs**: Configuration inventory, environment comparison, change log

## Trigger

- Environment setup, configuration audit, secrets management
- Feature flag management, configuration drift detection

## Steps

### Step 1: Configuration Inventory
Catalog all configuration items (env vars, files, secrets, feature flags). Document sources.
**Time**: 1-2h.

### Step 2: Environment Comparison
Compare configs across environments (dev, staging, prod). Identify drift.
**Time**: 1-2h.

### Step 3: Secrets Management
Audit secrets storage and rotation. Verify access controls. Identify hardcoded secrets.
**Time**: 1-2h.

### Step 4: Feature Flag Management
Catalog feature flags. Document ownership and lifecycle. Identify stale flags.
**Time**: 30-60 min.

### Step 5: Change Tracking
Document configuration changes. Implement change approval process.
**Time**: 30-60 min.

### Step 6: Audit and Compliance
Verify compliance with standards. Document audit trail.
**Time**: 30-60 min.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Inventory complete |
| QG2 | Environments compared |
| QG3 | Secrets managed |
| QG4 | Feature flags documented |
| QG5 | Changes tracked |
| QG6 | Compliance verified |

## Output

Use: `templates/configuration-report.md` | Capability: `capabilities/configuration-management.md`

## Anti-Patterns

1. **Writing for yourself** — Not considering audience needs
2. **No review** — Publishing without technical review
3. **Outdated docs** — Not maintaining documentation
4. **No examples** — Abstract explanations without examples

## Edge Cases

- Multiple audiences → Create separate documents per audience
- No existing template → Adapt from similar project
- Technical reviewer unavailable → Use peer review
