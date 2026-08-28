# Troubleshooting Guide - Forge Engineering Lifecycle Framework

## General Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Output Too Long | Verbosity too high | Set verbosity: minimal/standard |
| Output Too Short | Verbosity too low | Set verbosity: detailed |
| Inconsistent Outputs | Model differences | strict_mode: true, provide template |
| Quality Gates Failed | Missing content | Re-run step, check each gate |
| Agent Skips Steps | Context lost | Provide workflow, number steps |

## Research Issues

| Issue | Solution |
|-------|----------|
| Can't Find Sources | Broaden search, use snowball sampling, try different source types |
| Conflicting Information | Document both, assess credibility, note context |
| Technology Too New | Acknowledge limitation, recommend PoC, suggest waiting |
| Paywalled Content | Use preprints, author websites, contact authors, find alternatives |
| Low Confidence | Deepen research, seek additional sources, consider PoC |

## Analysis Issues

| Issue | Solution |
|-------|----------|
| Requirements Unclear | Use ambiguity handling, propose assumptions, create prototypes |
| Too Many Requirements | MoSCoW prioritization, group related, identify MVP |
| Conflicting Requirements | Facilitate stakeholder resolution, document conflicts |

## Implementation Issues

| Issue | Solution |
|-------|----------|
| Code ≠ Design | Review specs, identify deviations, update or fix |
| Tests Failing | Check test/code correctness, verify environment, check isolation |

## Deployment Issues

| Issue | Solution |
|-------|----------|
| Deployment Fails | Check logs, verify config, execute rollback |
| Rollback Fails | Have backup plan, test rollback in staging, document manual steps |

## Configuration Issues

| Issue | Solution |
|-------|----------|
| Config Not Applied | Verify location, check syntax, reload agent |
| Context Too Large | Use smaller context mode, break into phases, use concise mode |

## Getting More Help

1. Check [QUICK-REFERENCE.md](QUICK-REFERENCE.md)
2. Review [ANTI-PATTERNS.md](ANTI-PATTERNS.md)
3. Consult [GLOSSARY.md](GLOSSARY.md)
4. Refer to specific workflow
5. Check [compatibility-guide.md](compatibility-guide.md)
