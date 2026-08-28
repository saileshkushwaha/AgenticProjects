# Workflow 05: Testing

**Duration**: 4-20 hours | **Outputs**: Test plan, test cases, defect reports, coverage report, test summary

## Trigger

- Implementation complete and ready for testing
- New features need verification
- Bug fixes need regression testing
- Performance validation needed
- Security testing required
- Release readiness assessment

## Steps

### Step 1: Test Planning
**Actions**: Define scope, identify test types, define environment needs, identify test data, define entry/exit criteria, estimate effort, assign responsibilities, create schedule.
**Output**: Test plan | **Time**: 1-2 hours | **Tools**: Test plan template, Jira, TestRail
**Edge Cases**: No environment → containerized/mocks; limited data → synthetic/anonymized; tight timeline → critical path first

### Step 2: Test Case Design
**Actions**: Write test cases per requirement, design positive/negative/edge/boundary cases, create test data, define expected results, prioritize.
**Techniques**: Equivalence partitioning, boundary value analysis, decision table, state transition, error guessing, exploratory
**Output**: Test case suite | **Time**: 2-4 hours | **Tools**: Test case management, BDD tools
**Edge Cases**: Unicode, long strings, special chars (XSS/SQL), null/empty, concurrent requests

### Step 3: Test Environment Setup
**Actions**: Provision environment, configure databases, set up test data, deploy app, configure tools, verify readiness, document config.
**Output**: Ready test environment | **Time**: 1-3 hours | **Tools**: Docker, Kubernetes, Terraform
**Edge Cases**: Differs from prod → document; shared → coordinate; limited resources → mocks

### Step 4: Test Execution
**Actions**: Execute by priority, record results, log defects, retest fixes, track progress, report status.
**Types**: Unit, Integration, System, Regression, Performance, Security, Usability, Acceptance
**Output**: Execution results | **Time**: 2-8 hours | **Tools**: Jest, pytest, Selenium, Cypress, k6, OWASP ZAP
**Edge Cases**: External service → mocks; time/date → mocking; large data → generation; flaky → quarantine

### Step 5: Defect Management
**Actions**: Log defects, assign severity/priority, assign to developers, track resolution, verify fixes, analyze trends, identify clusters.
**Output**: Defect reports | **Time**: Ongoing | **Tools**: Jira, GitHub Issues, Bugzilla
**Edge Cases**: Cannot reproduce → more info; intermittent → logging; duplicate → link

### Step 6: Coverage Analysis
**Actions**: Measure code/requirement/risk coverage, identify untested areas, assess effectiveness, identify gaps, plan additional tests.
**Targets**: Code >80% line, >70% branch; Requirement 100% critical; Risk all high-risk
**Output**: Coverage report | **Time**: 30-60 min | **Tools**: Istanbul, JaCoCo, Coverage.py, SonarQube
**Edge Cases**: Incompatible tool → alternative; untestable → document/refactor; low critical → prioritize

### Step 7: Test Reporting
**Actions**: Summarize results, report defect stats, assess quality, identify risks, provide go/no-go, document lessons, archive artifacts.
**Output**: Test report | **Time**: 1-2 hours | **Tools**: Report template, dashboards
**Edge Cases**: Exit criteria not met → state gaps; disagreement → provide data

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Test plan approved |
| QG2 | Test cases reviewed and approved |
| QG3 | Test environment ready and verified |
| QG4 | All planned tests executed |
| QG5 | Critical and high defects resolved |
| QG6 | Coverage targets met |
| QG7 | Exit criteria satisfied |
| QG8 | Report follows template format |

## Decision Points

| Point | Options | Criteria |
|-------|---------|----------|
| DP1: Ready for testing? | Begin / Fix blockers | Environment, stability |
| DP2: Ship or fix? | Ship / Fix and retest | Severity, impact |
| DP3: Additional testing? | Proceed / Add tests | Gaps, risk |
| DP4: Flaky tests? | Quarantine / Fix | Impact, complexity |

## Anti-Patterns

1. **Testing only happy path** — Ignoring errors
2. **Testing in production** — Using prod environment
3. **Flaky tests ignored** — Allowing intermittent failures
4. **No regression testing** — Only new features
5. **Coverage obsession** — Numbers over meaning

## Output

Use: `templates/test-plan.md` | Prev: `04-implement.md` | Next: `07-deploy.md` | Capability: `capabilities/testing.md`
