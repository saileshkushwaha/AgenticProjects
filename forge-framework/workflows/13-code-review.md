# Workflow 13: Code Review

**Duration**: 1-4h | **Outputs**: Code review report, feedback, approval/rejection

## Trigger

- Pull request review, pre-merge review, security review
- Standards compliance check, mentoring opportunity

## Steps

### Step 1: Scope Definition
Define review scope (files, lines, features). Identify review type (functional, security, performance).
**Time**: 5-15 min.

### Step 2: Static Analysis
Run linters, formatters, security scanners. Check code coverage. Identify automated issues.
**Time**: 15-30 min.

### Step 3: Manual Review
Review logic, architecture, patterns. Check error handling, edge cases, security. Verify tests.
**Time**: 30-120 min.

### Step 4: Standards Compliance
Verify coding standards, naming conventions, documentation. Check style guide adherence.
**Time**: 15-30 min.

### Step 5: Feedback Documentation
Document findings (Critical/Major/Minor/Suggestion). Provide specific, actionable feedback.
**Time**: 15-30 min.

### Step 6: Re-Review
Review fixes. Verify issues resolved. Approve or request changes.
**Time**: 15-30 min.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Scope defined |
| QG2 | Static analysis complete |
| QG3 | Manual review complete |
| QG4 | Standards compliance verified |
| QG5 | Feedback documented |
| QG6 | Re-review completed |

## Anti-Patterns

1. **Nitpicking** — Focusing on style over substance
2. **Scope creep** — Reviewing unrelated code
3. **Vague feedback** — Non-actionable comments
4. **No re-review** — Approving without verifying fixes

## Output

Use: `templates/code-review-report.md` | Capability: `capabilities/code-review.md`
