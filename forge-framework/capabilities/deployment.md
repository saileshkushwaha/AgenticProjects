# Deployment Capability

## Definition

The ability to release software to target environments through planning, execution, and post-deployment verification.

## Proficiency Levels

| Level | Title | Description |
|-------|-------|-------------|
| 1 | Novice | Can deploy using existing scripts but struggles with planning |
| 2 | Competent | Can plan and execute basic deployments, set up monitoring |
| 3 | Proficient | Can design deployment strategies, handle rollbacks, set up alerting |
| 4 | Expert | Can handle complex deployments, mentor others, improve processes |
| 5 | Master | Can establish deployment practices, create frameworks, handle novel domains |

## Scope

### In Scope
- Deployment planning
- Environment setup and configuration
- Deployment execution
- Post-deployment verification
- Rollback execution
- Monitoring and alerting setup
- Infrastructure as Code (IaC)
- Database migration during deployment

### Out of Scope
- Code implementation (see Implementation capability)
- Test execution (see Testing capability)
- Architecture design (see Design capability)

## Skills

### Planning
- Deployment strategy selection
- Rollback planning
- Communication planning
- Risk assessment
- Timeline creation
- Approval coordination
- Pre-deployment checklist creation

### Environment Management
- Infrastructure provisioning
- Configuration management
- Network and security setup
- Database setup
- Service configuration
- Environment verification
- Infrastructure as Code (IaC)

### Execution
- Deployment automation
- Blue-green deployment
- Canary deployment
- Rolling deployment
- Database migration
- Configuration deployment
- Feature flag management

### Verification
- Smoke testing
- Health check validation
- Performance verification
- Integration verification
- Monitoring verification
- Data integrity checks

### Monitoring
- Metric collection setup
- Log aggregation configuration
- Alert configuration
- Dashboard creation
- On-call setup
- Escalation procedures

## Assessment Criteria

### Level 1 (Novice)
- [ ] Can execute existing deployment scripts
- [ ] Can verify basic health checks
- [ ] Can follow deployment runbooks

### Level 2 (Competent)
- [ ] Can plan a basic deployment
- [ ] Can set up a test environment
- [ ] Can configure basic monitoring
- [ ] Can execute a deployment with supervision

### Level 3 (Proficient)
- [ ] Can design deployment strategies for different scenarios
- [ ] Can create and test rollback plans
- [ ] Can set up comprehensive monitoring and alerting
- [ ] Can handle database migrations during deployment

### Level 4 (Expert)
- [ ] Can handle complex multi-service deployments
- [ ] Can implement deployment automation
- [ ] Can mentor others in deployment practices
- [ ] Can improve team deployment processes

### Level 5 (Master)
- [ ] Can establish organizational deployment practices
- [ ] Can create deployment frameworks for new domains
- [ ] Can evaluate and improve deployment methodologies
- [ ] Can synthesize deployment across projects

## Inputs
- Deployment artifacts (code, configs)
- Deployment plan
- Environment specifications
- Rollback plan
- Monitoring requirements

## Outputs
- Deployment plan
- Configured environment
- Deployed application
- Verification report
- Monitoring dashboard
- Deployment report

## Quality Criteria
- All pre-deployment quality gates passed
- Deployment plan reviewed and approved
- Rollback plan documented and tested
- Deployment executed successfully
- Post-deployment verification passed
- Monitoring and alerting active

## Related Workflows
- `workflows/07-deploy.md` - Primary workflow
- `workflows/05-test.md` - Pre-deployment verification
- `workflows/08-modernize.md` - Infrastructure modernization

## Metrics
- Deployment frequency
- Deployment success rate
- Mean time to deploy (MTTD)
- Rollback rate
- Deployment-related incidents
- Time to recovery (TTR)

## Development Path

To improve deployment capability:
1. Study deployment strategies and patterns
2. Practice with different deployment tools
3. Learn Infrastructure as Code (Terraform, CloudFormation)
4. Study monitoring and observability practices
5. Practice rollback procedures
6. Seek feedback on deployment quality
