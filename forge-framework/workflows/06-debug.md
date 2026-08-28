# Workflow 06: Debugging

**Duration**: 30 min - 8 hours | **Outputs**: Debug report, root cause analysis, fix, prevention measures

## Trigger

- Bug/defect reported
- Unexpected behavior
- Test failures
- Production issues
- Performance degradation
- Intermittent failures

## Steps

### Step 1: Issue Reproduction
**Actions**: Understand issue, gather steps, identify environment, reproduce, document steps, determine reproducibility, capture evidence.
**Output**: Reproduction docs | **Time**: 15-60 min | **Tools**: Screen recording, log aggregators, error trackers
**Edge Cases**: Cannot reproduce → more details; intermittent → logging; env-specific → compare configs; data-specific → patterns

### Step 2: Isolation
**Actions**: Narrow scope, identify component, determine code/config/data, use binary search, git bisect, isolate variables, create minimal repro.
**Techniques**: Binary search, git bisect, logging, debugger, config isolation, data isolation
**Output**: Isolated scope | **Time**: 30-120 min | **Tools**: Git bisect, debuggers, log analysis
**Edge Cases**: Multiple factors → isolate each; Heisenbug → non-intrusive logging; race → thread analysis; memory → Valgrind

### Step 3: Root Cause Analysis
**Actions**: Analyze isolated code, identify root cause, use structured techniques, document, assess why not caught, check for similar bugs.
**Techniques**: 5 Whys, Fishbone (Ishikawa), fault tree, Pareto, change analysis
**Categories**: Logic, off-by-one, null/undefined, race conditions, resource leaks, config, data, integration
**Output**: Root cause analysis | **Time**: 30-60 min | **Tools**: Analysis templates
**Edge Cases**: Multiple causes → document all; systemic → patterns; third-party → workaround + report

### Step 4: Fix Implementation
**Actions**: Design fix, evaluate options, implement, write tests, ensure no regressions, document.
**Principles**: Fix root cause, minimal/targeted, consider side effects, defensive, add tests, document
**Output**: Fix with tests | **Time**: 30-120 min | **Tools**: IDE, version control, test frameworks
**Edge Cases**: Affects other → expand regression; temporary → document debt; data migration → plan carefully

### Step 5: Regression Testing
**Actions**: Run component tests, integration tests, related cases, verify no new issues, test edge cases, verify in target env, confirm resolution.
**Output**: Regression results | **Time**: 30-60 min | **Tools**: Test frameworks, CI/CD
**Edge Cases**: No tests → write first (TDD); behavior changes → update tests; performance → benchmarks

### Step 6: Prevention Strategy
**Actions**: Identify prevention, add tests, improve review checklist, update guidelines, add static analysis, improve monitoring, share learnings.
**Output**: Prevention strategy | **Time**: 15-30 min | **Tools**: CI/CD, static analysis, monitoring
**Edge Cases**: Similar bugs → search codebase; systemic → process improvement; third-party → defensive checks

### Step 7: Debug Report
**Actions**: Document issue/resolution, summarize root cause/fix, document lessons, update knowledge base, share, close defect, archive.
**Output**: Debug report | **Time**: 15-30 min | **Tools**: Report template, knowledge base
**Edge Cases**: Duplicate → link; feature request → convert

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Issue reproduced successfully |
| QG2 | Root cause identified and documented |
| QG3 | Fix addresses root cause |
| QG4 | Fix verified with tests |
| QG5 | No regressions introduced |
| QG6 | Prevention measures implemented |
| QG7 | Report follows template format |

## Decision Points

| Point | Options | Criteria |
|-------|---------|----------|
| DP1: Can reproduce? | Proceed / Need info / Cannot | Success, info quality |
| DP2: Fix or workaround? | Fix / Workaround / Defer | Risk, timeline, impact |
| DP3: Similar bugs? | Search / Proceed | Category, patterns |
| DP4: Escalation? | Handle / Escalate | Complexity, impact |

## Anti-Patterns

1. **Fixing symptoms** — Not root cause
2. **Debugging without reproduction** — No repro
3. **No prevention** — No recurrence prevention
4. **Blaming the user** — No investigation
5. **Ignoring intermittent** — Dismissing

## Output

Use: `templates/debug-report.md` | Prev: `05-test.md` | Next: `04-implement.md` | Capability: `capabilities/debugging.md`
