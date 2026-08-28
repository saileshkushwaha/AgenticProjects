# Research Mode Selection - Forge Engineering Lifecycle Framework

## Mode Comparison

| Factor | Quick Research | Deep Research |
|--------|---------------|---------------|
| **Duration** | 2-8 hours | 8-40 hours |
| **Sources** | 3-5 | 10+ |
| **Depth** | Surface | Comprehensive |
| **Iterations** | Single-pass | Multi-pass |
| **Confidence** | Medium | High |

## Selection Criteria

### Use Quick Research When:
- Decision is reversible or low-impact
- Time constraints are tight (< 1 week)
- Domain is well-understood
- Multiple acceptable solutions exist
- Stakeholder accepts medium confidence

### Use Deep Research When:
- Decision is irreversible or high-impact
- Significant investment is at stake
- Domain is novel or complex
- Only one solution will be chosen
- Stakeholder requires high confidence

## Decision Tree

```
Is the decision reversible?
├── YES → Is time constrained?
│   ├── YES → Quick Research
│   └── NO → Quick Research (with option to deepen)
└── NO → Is the impact significant?
    ├── YES → Deep Research
    └── NO → Is confidence requirement high?
        ├── YES → Deep Research
        └── NO → Quick Research
```

## Risk Assessment

| Risk Level | Recommended Mode |
|------------|------------------|
| Low | Quick |
| Medium | Quick (with deepening option) |
| High | Deep |
| Critical | Deep + PoC |

## Escalation Triggers (Quick → Deep)

1. Initial findings contradictory or inconclusive
2. Stakeholder confidence in results is low
3. New questions emerge requiring deeper investigation
4. Decision impact higher than initially assessed
5. Time becomes available for deeper investigation

## Output Validation

### Validation Checklist
- [ ] All research objectives addressed
- [ ] Minimum source count met (≥3 quick, ≥10 deep)
- [ ] Key claims verified (≥2 independent sources)
- [ ] Confidence levels justified by evidence
- [ ] Limitations and uncertainties documented
- [ ] Recommendations supported by evidence chain
- [ ] Accuracy metrics met
- [ ] (Deep) Iterative investigation completed
- [ ] Stakeholder review obtained

### Validation Failure Recovery
1. Identify gaps and unmet criteria
2. Assess severity (critical vs nice-to-have)
3. Plan targeted additional research
4. Execute additional investigation
5. Re-validate output

## Stakeholder Review

### Review Steps
1. Prepare summary with key findings and recommendations
2. Present evidence and verification status
3. Highlight uncertainties and limitations
4. Gather feedback
5. Iterate if needed
6. Obtain sign-off

### Review Template
```
Research Review
Topic: [topic] | Mode: [quick|deep] | Reviewer: [name]
Findings Acceptable? [YES/NO] | Evidence Sufficient? [YES/NO]
Confidence Adequate? [YES/NO] | Recommendations Actionable? [YES/NO]
Comments: [feedback] | Approved? [YES/NO]
```
