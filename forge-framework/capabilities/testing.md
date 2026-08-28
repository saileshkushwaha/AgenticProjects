# Testing Capability

## Definition

The ability to verify that implementation meets requirements through systematic test planning, execution, and analysis.

## Proficiency Levels

| Level | Title | Description |
|-------|-------|-------------|
| 1 | Novice | Can write basic tests but struggles with strategy and analysis |
| 2 | Competent | Can design test cases, execute tests, log defects |
| 3 | Proficient | Can create test plans, analyze coverage, assess quality |
| 4 | Expert | Can design test strategies, handle complex testing, mentor others |
| 5 | Master | Can establish testing practices, create frameworks, handle novel domains |

## Scope

### In Scope
- Test planning and strategy
- Test case design
- Test execution (unit, integration, e2e, performance, security)
- Defect management
- Coverage analysis
- Test reporting
- Quality assessment
- Test automation

### Out of Scope
- Code fixes (see Debugging capability)
- Test environment infrastructure (see Deployment capability)
- Production monitoring (see Deployment capability)

## Skills

### Test Planning
- Test strategy development
- Test scope definition
- Test type selection
- Resource planning
- Schedule creation
- Risk-based test prioritization
- Entry and exit criteria definition

### Test Case Design
- Equivalence partitioning
- Boundary value analysis
- Decision table testing
- State transition testing
- Exploratory testing
- Test data design
- Test case prioritization

### Test Execution
- Manual test execution
- Automated test execution
- Performance testing
- Security testing
- Regression testing
- Acceptance testing
- Exploratory testing

### Defect Management
- Defect identification and logging
- Severity and priority assignment
- Defect tracking
- Root cause analysis (basic)
- Verification of fixes
- Defect trend analysis

### Analysis
- Coverage analysis (code, requirement, risk)
- Quality metrics calculation
- Trend analysis
- Risk assessment
- Go/no-go recommendation

## Assessment Criteria

### Level 1 (Novice)
- [ ] Can write basic unit tests
- [ ] Can execute test cases
- [ ] Can log defects

### Level 2 (Competent)
- [ ] Can design test cases using basic techniques
- [ ] Can execute different test types
- [ ] Can track defect resolution
- [ ] Can measure code coverage

### Level 3 (Proficient)
- [ ] Can create comprehensive test plans
- [ ] Can apply advanced test design techniques
- [ ] Can analyze coverage and identify gaps
- [ ] Can provide quality assessment

### Level 4 (Expert)
- [ ] Can design test strategies for complex systems
- [ ] Can set up test automation frameworks
- [ ] Can mentor others in testing techniques
- [ ] Can facilitate quality decisions

### Level 5 (Master)
- [ ] Can establish organizational testing practices
- [ ] Can create testing frameworks for new domains
- [ ] Can evaluate and improve testing methodologies
- [ ] Can synthesize testing across projects

## Inputs
- Requirements document
- Design documents
- Implementation (code)
- Test environment
- Test data

## Outputs
- Test plan
- Test case suite
- Test execution results
- Defect reports
- Coverage report
- Test summary report
- Quality assessment

## Quality Criteria
- Test plan approved
- Test cases reviewed and approved
- All planned tests executed
- Critical and high defects resolved
- Coverage targets met
- Exit criteria satisfied

## Related Workflows
- `workflows/05-test.md` - Primary workflow
- `workflows/04-implement.md` - Provides input
- `workflows/06-debug.md` - For defect resolution

## Metrics
- Test coverage (%)
- Defect detection rate
- Defect escape rate
- Test execution rate
- Test pass rate
- Defect density

## Development Path

To improve testing capability:
1. Study test design techniques
2. Practice writing different types of tests
3. Learn test automation frameworks
4. Study performance and security testing
5. Practice coverage analysis
6. Seek feedback on test quality
