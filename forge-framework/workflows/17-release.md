# Workflow 17: Release Management

**Duration**: 2-8h | **Outputs**: Release plan, release notes, deployment coordination

## Trigger

- Release planning, feature freeze, release candidate creation
- Release notes creation, deployment coordination

## Steps

### Step 1: Release Scope Definition
Define features, fixes, and changes. Prioritize and approve scope.
**Time**: 30-60 min.

### Step 2: Feature Feature
Announce feature freeze. Finalize code changes. Create release branch.
**Time**: 1-2h.

### Step 3: Release Candidate Creation
Build RC. Deploy to staging. Perform final testing.
**Time**: 1-2h.

### Step 4: Final Testing
Run regression, smoke, performance tests. Verify critical paths.
**Time**: 2-4h.

### Step 5: Release Notes Creation
Document changes, new features, bug fixes, breaking changes, known issues.
**Time**: 1-2h.

### Step 6: Deployment Coordinate
Coordinate deployment. Monitor rollout. Communicate status.
**Time**: 1-2h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Scope defined |
| QG2 | Feature freeze complete |
| QG3 | RC created |
| QG4 | Testing complete |
| QG5 | Release notes created |
| QG6 | Deployment coordinated |

## Output

Use: `templates/release-plan.md` | Capability: `capabilities/release-management.md`

## Anti-Patterns

1. **Writing for yourself** — Not considering audience needs
2. **No review** — Publishing without technical review
3. **Outdated docs** — Not maintaining documentation
4. **No examples** — Abstract explanations without examples

## Edge Cases

- Multiple audiences → Create separate documents per audience
- No existing template → Adapt from similar project
- Technical reviewer unavailable → Use peer review
