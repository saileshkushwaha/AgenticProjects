# Debugging Capability

## Definition

The ability to identify, isolate, and resolve defects through systematic investigation and root cause analysis.

## Proficiency Levels

| Level | Title | Description |
|-------|-------|-------------|
| 1 | Novice | Can fix obvious bugs but struggles with isolation and root cause |
| 2 | Competent | Can reproduce bugs, isolate components, fix common issues |
| 3 | Proficient | Can perform root cause analysis, implement targeted fixes |
| 4 | Expert | Can handle complex bugs, mentor others, improve processes |
| 5 | Master | Can establish debugging practices, create frameworks, handle novel domains |

## Scope

### In Scope
- Issue reproduction
- Defect isolation
- Root cause analysis
- Fix implementation
- Regression testing
- Prevention strategy
- Debug documentation
- Knowledge sharing

### Out of Scope
- Test case design (see Testing capability)
- Architecture changes (see Design capability)
- Infrastructure issues (see Deployment capability)

## Skills

### Reproduction
- Understanding reported issues
- Creating minimal reproduction cases
- Identifying reproduction conditions
- Documenting reproduction steps
- Determining reproducibility
- Capturing evidence (logs, screenshots)

### Isolation
- Binary search debugging
- Git bisect usage
- Strategic logging
- Debugger usage
- Variable isolation
- Configuration isolation
- Memory analysis

### Root Cause Analysis
- 5 Whys technique
- Fishbone (Ishikawa) analysis
- Fault tree analysis
- Change analysis
- Pattern recognition
- Hypothesis testing

### Fix Implementation
- Fix design and evaluation
- Minimal, targeted fixes
- Defensive coding
- Test creation for fixes
- Regression prevention

### Prevention
- Automated test addition
- Static analysis rule creation
- Code review checklist updates
- Monitoring improvements
- Knowledge sharing

## Assessment Criteria

### Level 1 (Novice)
- [ ] Can fix obvious syntax errors
- [ ] Can reproduce reported bugs
- [ ] Can use basic debugging tools

### Level 2 (Competent)
- [ ] Can isolate bugs to specific components
- [ ] Can use git bisect to find regressions
- [ ] Can implement fixes with tests
- [ ] Can document the fix

### Level 3 (Proficient)
- [ ] Can perform root cause analysis using structured techniques
- [ ] Can create minimal reproduction cases
- [ ] Can implement targeted fixes that address root cause
- [ ] Can develop prevention strategies

### Level 4 (Expert)
- [ ] Can handle complex, intermittent bugs
- [ ] Can debug distributed systems issues
- [ ] Can mentor others in debugging techniques
- [ ] Can improve team debugging processes

### Level 5 (Master)
- [ ] Can establish organizational debugging practices
- [ ] Can create debugging frameworks for new domains
- [ ] Can evaluate and improve debugging methodologies
- [ ] Can synthesize debugging across projects

## Inputs
- Defect reports
- Test failure logs
- Application logs
- System metrics
- User reports

## Outputs
- Reproduction documentation
- Root cause analysis document
- Implemented fix
- Regression test results
- Prevention strategy
- Debug report

## Quality Criteria
- Issue reproduced successfully
- Root cause identified and documented
- Fix addresses root cause
- Fix verified with tests
- No regressions introduced
- Prevention measures implemented

## Related Workflows
- `workflows/06-debug.md` - Primary workflow
- `workflows/05-test.md` - Source of defect reports
- `workflows/04-implement.md` - Where fixes are applied

## Metrics
- Mean time to detect (MTTD)
- Mean time to resolve (MTTR)
- Reproduction success rate
- Fix effectiveness (% of fixes that stick)
- Recurrence rate

## Development Path

To improve debugging capability:
1. Study systematic debugging techniques
2. Practice with real bugs
3. Learn root cause analysis methods
4. Study common bug patterns
5. Practice creating minimal reproduction cases
6. Seek feedback on debugging approach
