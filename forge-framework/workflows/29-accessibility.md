# Workflow 29: Accessibility Audit

**Duration**: 4-16h | **Outputs**: Accessibility report, remediation plan, compliance status

## Trigger
- Accessibility audit (WCAG 2.1/2.2), compliance review
- Inclusive design review, VPAT creation

## Steps

### Step 1: Scope Definition
Define pages/features to audit. Identify target level (A, AA, AAA).
**Time**: 1-2h.

### Step 2: Automated Testing
Run automated tools (axe, WAVE, Lighthouse). Document issues.
**Time**: 2-4h.

### Step 3: Manual Testing
Keyboard navigation. Screen reader testing. Color contrast. Focus management.
**Time**: 2-6h.

### Step 4: User Testing
Test with users with disabilities. Gather feedback. Document findings.
**Time**: 2-4h.

### Step 5: Remediation Planning
Prioritize issues. Create remediation roadmap. Assign owners.
**Time**: 1-2h.

### Step 6: Reporting
Document findings, compliance status, remediation plan. Create VPAT if needed.
**Time**: 1-2h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Scope defined |
| QG2 | Automated testing complete |
| QG3 | Manual testing complete |
| QG4 | User testing complete |
| QG5 | Remediation planned |
| QG6 | Report complete |

## Output
Use: `templates/accessibility-report.md` | Capability: `capabilities/accessibility.md`

## Anti-Patterns

1. **Ignoring stakeholders** — Not engaging key stakeholders
2. **One-way communication** — Not gathering feedback
3. **Scope creep** — Uncontrolled expansion
4. **No documentation** — Not documenting decisions

## Edge Cases

- Conflicting stakeholder needs → Facilitate prioritization
- No stakeholder availability → Use async communication
- Resistance to change → Provide training and support
