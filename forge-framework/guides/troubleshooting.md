# Troubleshooting Guide - Forge Engineering Lifecycle Framework

## General Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Output Too Long | Verbosity too high | Set verbosity: minimal/standard |
| Output Too Short | Verbosity too low | Set verbosity: detailed |
| Inconsistent Outputs | Model differences | strict_mode: true, provide template |
| Quality Gates Failed | Missing content | Re-run step, check each gate |
| Agent Skips Steps | Context lost | Provide workflow, number steps |
| Format Doesn't Match | Model interpretation | Provide explicit template in prompt |

## Research Issues

| Issue | Solution |
|-------|----------|
| Can't Find Sources | Broaden search, use snowball sampling, try different source types |
| Conflicting Information | Document both, assess credibility, note context |
| Technology Too New | Acknowledge limitation, recommend PoC, suggest waiting |
| Paywalled Content | Use preprints, author websites, contact authors, find alternatives |
| Low Confidence | Deepen research, seek additional sources, consider PoC |
| No Clear Recommendation | Present options with trade-offs, let stakeholder decide |

## Analysis Issues

| Issue | Solution |
|-------|----------|
| Requirements Unclear | Use ambiguity handling, propose assumptions, create prototypes |
| Too Many Requirements | MoSCoW prioritization, group related, identify MVP |
| Conflicting Requirements | Facilitate stakeholder resolution, document conflicts |
| Infeasible Project | Document constraints, propose alternatives, escalate |

## Implementation Issues

| Issue | Solution |
|-------|----------|
| Code ≠ Design | Review specs, identify deviations, update or fix |
| Tests Failing | Check test/code correctness, verify environment, check isolation |
| Coverage Too Low | Add tests for critical paths, use coverage tools |
| Integration Fails | Check interfaces, verify data formats, review logs |
| Performance Issues | Profile code, identify bottlenecks, optimize |

## Testing Issues

| Issue | Solution |
|-------|----------|
| Can't Achieve Coverage | Identify uncovered paths, prioritize critical, refactor if needed |
| Tests Too Slow | Mock dependencies, parallelize, separate unit/integration |
| Flaky Tests | Investigate timing/state, isolate test state, quarantine |
| Environment Diffs | Document differences, use containers, standardize configs |

## Deployment Issues

| Issue | Solution |
|-------|----------|
| Deployment Fails | Check logs, verify config, execute rollback |
| Rollback Fails | Have backup plan, test rollback in staging, document manual steps |
| Post-Deploy Issues | Monitor metrics, check error rates, verify integrations |
| Config Drift | Use IaC, version control configs, audit regularly |

## Configuration Issues

| Issue | Solution |
|-------|----------|
| Config Not Applied | Verify location, check syntax, reload agent |
| Context Too Large | Use smaller context mode, break into phases, use concise mode |
| Wrong Verbosity | Adjust verbosity level per workflow |
| Language Issues | Set language option, verify model supports language |

## Model-Specific Issues

### Claude
| Issue | Solution |
|-------|----------|
| Too verbose | Use verbosity: minimal, request concise output |
| Refusals | Adjust prompt framing, avoid restricted content |

### GPT
| Issue | Solution |
|-------|----------|
| Too brief | Use verbosity: detailed, request comprehensive output |
| Hallucinations | Enable strict_mode, require citations |

### Gemini
| Issue | Solution |
|-------|----------|
| Format inconsistencies | Provide explicit template, use strict_mode |

### Smaller Models
| Issue | Solution |
|-------|----------|
| Complex workflows | Break into smaller steps, use minimal verbosity |
| Missing sections | Provide template, request each section explicitly |

## Getting More Help

1. Check [QUICK-REFERENCE.md](QUICK-REFERENCE.md) for workflow selection
2. Review [ANTI-PATTERNS.md](ANTI-PATTERNS.md) for common mistakes
3. Consult [GLOSSARY.md](GLOSSARY.md) for terminology
4. Refer to specific workflow for detailed guidance
5. Check [compatibility-guide.md](compatibility-guide.md) for model-specific issues
6. See [EXTENSION-POINTS.md](EXTENSION-POINTS.md) for customization
