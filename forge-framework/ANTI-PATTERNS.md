# Anti-Patterns - Forge Engineering Lifecycle Framework

## General Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-01 | Skipping Phases | Jumping from requirements to implementation | Require quality gate completion |
| AP-02 | Analysis Paralysis | Excessive analysis without decisions | Set timeboxes, use decision criteria |
| AP-03 | Documentation After the Fact | Writing docs after implementation | Require docs as part of each step |
| AP-04 | Ignoring Edge Cases | Focusing only on happy path | Include edge case analysis in every workflow |
| AP-05 | Not Preserving Context | Losing track of decisions across phases | Use decision logs, reference previous artifacts |

## Research Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-R01 | Confirmation Bias | Only seeking confirming information | Require multiple alternatives |
| AP-R02 | Single Source Reliance | Recommendations from one source | Require ≥3 sources |
| AP-R03 | Shallow Research | Surface-level without depth | Define research depth in objectives |
| AP-R04 | No Confidence Levels | All findings with equal certainty | Require confidence levels |

## Analysis Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-A01 | Vague Requirements | Ambiguous, untestable requirements | Require testable acceptance criteria |
| AP-A02 | Ignoring Non-Functional | Focusing only on features | Include NFRs in analysis template |
| AP-A03 | Optimistic Risk Assessment | Underestimating probability/impact | Use structured risk assessment |

## Design Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-D01 | Big Design Up Front | Designing every detail before implementation | Design incrementally with feedback |
| AP-D02 | Designing in a Vacuum | No input from implementers/operators | Include implementation team in reviews |
| AP-D03 | Pattern Over-Aplication | Unnecessary complexity from patterns | Apply patterns only with clear benefit |

## Implementation Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-I01 | Copy-Paste Programming | Copying code without understanding | Require code understanding before reuse |
| AP-I02 | Premature Optimization | Optimizing before identifying bottlenecks | Measure before optimizing |
| AP-I03 | Ignoring Error Handling | Only handling happy path | Require error handling in review |
| AP-I04 | No Tests | Writing code without tests | Make tests part of definition of done |

## Testing Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-T01 | Testing Only Happy Path | Ignoring error and edge cases | Require negative test cases |
| AP-T02 | Testing in Production | Using production for testing | Maintain separate test environments |
| AP-T03 | Flaky Tests Ignored | Allowing intermittent failures | Treat flaky tests as bugs |

## Debugging Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-X01 | Fixing Symptoms | Addressing visible symptoms not root cause | Require root cause analysis |
| AP-X02 | Debugging Without Reproduction | Fixing without reproducing | Require reproduction steps |
| AP-X03 | No Prevention Measures | Fixing without preventing recurrence | Require prevention section in report |

## Deployment Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-P01 | No Rollback Plan | Deploying without rollback plan | Require rollback plan in deployment plan |
| AP-P02 | End of Day Deploy | Deploying when support unavailable | Establish deployment windows |
| AP-P03 | No Post-Deployment Verification | Assuming success without checking | Require verification in deployment plan |

## Modernization Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-M01 | Big Bang Rewrite | Rewriting entire system at once | Prefer incremental migration |
| AP-M02 | Lift and Shift Without Improvement | Moving without optimizing | Define improvement goals upfront |
| AP-M03 | No Coexistence Plan | Not planning for parallel operation | Plan for coexistence |

## Communication Anti-Patterns

| ID | Anti-Pattern | Description | How to Avoid |
|----|--------------|-------------|--------------|
| AP-C01 | No Stakeholder Updates | Not communicating progress | Include communication plan in each phase |
| AP-C02 | Technical Jargon | Confusing non-technical audience | Adapt language to audience |
| AP-C03 | Hiding Bad News | Delaying communication of problems | Create culture of transparency |
