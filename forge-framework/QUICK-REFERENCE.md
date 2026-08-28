# Forge Quick Reference Card

## Workflow Selection

```
Need to gather info?        → 01-research
Need to understand reqs?    → 02-analyze
Need to design something?   → 03-design
Need to write code?         → 04-implement
Need to test?               → 05-test
Need to fix a bug?          → 06-debug
Need to deploy?             → 07-deploy
Need to upgrade/migrate?    → 08-modernize
Need to report/document?    → 09-communication
```

## Artifact Output Format

```markdown
# [Title]
**Created**: [ISO 8601] | **Phase**: [phase] | **Status**: [draft/review/approved]

## Executive Summary
[2-3 sentences]

## [Content]

## Decisions & Rationale
| Decision | Options | Rationale |

## Risks & Mitigations
| Risk | Probability | Impact | Mitigation |

## Next Steps
1. [Step 1]
2. [Step 2]

## References
- [Ref 1]
```

## Quality Gate Checklist

Every phase output must pass:
- [ ] Objectives clear and scoped
- [ ] Evidence supports claims
- [ ] Decisions documented with rationale
- [ ] Risks identified with mitigations
- [ ] Assumptions documented
- [ ] Next steps defined
- [ ] Format follows template

## Decision Framework

1. **Understand** → Clarify problem, constraints, success criteria
2. **Explore** → Identify multiple approaches
3. **Evaluate** → Compare against criteria
4. **Decide** → Select best option with rationale
5. **Document** → Record decision and trade-offs

## Self-Verification

Before delivering any output:
- [ ] Addresses original request?
- [ ] All required sections present?
- [ ] Claims supported by evidence?
- [ ] Trade-offs documented?
- [ ] Format correct?
- [ ] Quality gates satisfied?

## Emergency Procedures

### Bug in Production
1. Reproduce → 2. Isolate → 3. Root cause → 4. Fix → 5. Test → 6. Deploy hotfix

### Deployment Failure
1. Trigger rollback → 2. Verify rollback → 3. Investigate → 4. Fix → 5. Re-deploy

### Requirements Change
1. Analyze impact → 2. Update design → 3. Re-implement → 4. Re-test → 5. Re-deploy

## Key Principles (Abbreviated)

| # | Principle | In One Sentence |
|---|-----------|-----------------|
| 1 | Evidence | Back claims with evidence |
| 2 | Verify | Check before proceeding |
| 3 | Structure | Use frameworks consistently |
| 4 | Consistency | Follow templates |
| 5 | Context | Preserve across phases |
| 6 | Risk | Identify early, mitigate |
| 7 | Document | Document as you go |
| 8 | Security | Integrate at every phase |
| 9 | Performance | Consider at every phase |
| 10 | Learn | Incorporate lessons |

## Workflow Phase Connections

```
Research ──→ Analysis ──→ Design ──→ Implement ──→ Test ──→ Deploy
   ↑            │           │           │          │         │
   │            │           │           │          │         │
   └────────────┴───────────┴───────────┴──────────┴─────────┘
                         ↑
                   Modernization
                         ↑
                   Communication (supports all)
```

## File Locations

| Need | File |
|------|------|
| System prompt | `core/system-prompt.md` |
| Agent persona | `core/persona.md` |
| Principles | `core/principles.md` |
| Workflows | `workflows/0[1-9]-*.md` |
| Capabilities | `capabilities/*.md` |
| Templates | `templates/*.md` |
| Output format | `artifacts/output-format.md` |
