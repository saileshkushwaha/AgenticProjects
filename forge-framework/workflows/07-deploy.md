# Workflow 07: Deployment

**Duration**: 1-4 hours | **Outputs**: Deployment plan, verification report, deployment report

## Trigger

- New release ready
- Hotfix needed
- Infrastructure changes
- Configuration rollout
- Rollback needed
- Environment provisioning

## Steps

### Step 1: Pre-Deployment Planning
**Actions**: Define scope, identify environments, define strategy, create rollback plan, schedule window, identify stakeholders, obtain approvals, verify quality gates.
**Strategies**: Blue-Green, Canary, Rolling, Recreate, Shadow
**Output**: Deployment plan | **Time**: 30-60 min | **Tools**: Plan template, calendar
**Edge Cases**: Window conflicts → coordinate; no approval → delay/escalate; gates not passed → fix

### Step 2: Environment Setup
**Actions**: Provision infrastructure, configure network/security, set up databases, configure monitoring, set up load balancers/DNS, verify health, document config.
**IaC**: Terraform, CloudFormation, Pulumi — version control, automate, reproduce
**Output**: Configured environment | **Time**: 30-120 min | **Tools**: Terraform, Ansible
**Edge Cases**: Provisioning fails → fix templates; drift → reconcile; limits → quota increase

### Step 3: Deployment Execution
**Actions**: Execute per strategy, monitor progress, verify steps, watch errors, monitor health, inform stakeholders, document steps.
**Output**: Deployed app | **Time**: 15-60 min | **Tools**: GitHub Actions, Jenkins, Kubernetes
**Edge Cases**: Health check fails → pause/rollback; migration fails → rollback/retry; partial → complete/rollback

### Step 4: Post-Deployment Verification
**Actions**: Smoke tests, verify user journeys, check health, verify integrations, confirm data integrity, check error rates, validate performance, verify monitoring.
**Output**: Verification report | **Time**: 15-30 min | **Tools**: Smoke tests, monitoring
**Edge Cases**: Smoke fails → rollback; performance → investigate/rollback; integration → fallback

### Step 5: Rollback Planning
**Actions**: Define triggers, document steps, test procedure, ensure artifacts available, define authority, set time limits, communicate.
**Triggers**: Critical broken, performance threshold, error rate threshold, data corruption, security
**Output**: Rollback plan | **Time**: 15-30 min | **Tools**: Runbooks
**Edge Cases**: Rollback fails → backup plan; data migration → reversal plan; schema → backward compat

### Step 6: Monitoring and Alerting
**Actions**: Set up monitoring, configure logs, define thresholds, set up dashboards, configure on-call, define escalation, verify.
**Dimensions**: Availability, Performance, Business, Infrastructure, Security
**Output**: Monitoring configured | **Time**: 15-30 min | **Tools**: Datadog, Grafana, PagerDuty
**Edge Cases**: Alert fatigue → tune; missing metrics → add; false positives → adjust

### Step 7: Deployment Reporting
**Actions**: Document details, record timeline, note issues, document lessons, update runbooks, communicate, archive.
**Output**: Deployment report | **Time**: 15-30 min | **Tools**: Report template
**Edge Cases**: Issues → document; rollback → reason/lessons

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | All pre-deployment quality gates passed |
| QG2 | Deployment plan reviewed and approved |
| QG3 | Rollback plan documented and tested |
| QG4 | Deployment executed successfully |
| QG5 | Post-deployment verification passed |
| QG6 | Monitoring and alerting active |
| QG7 | Stakeholders notified |

## Decision Points

| Point | Options | Criteria |
|-------|---------|----------|
| DP1: Strategy? | Blue-Green / Canary / Rolling / Recreate | Risk, downtime, complexity |
| DP2: Proceed or rollback? | Continue / Rollback | Verification, errors, impact |
| DP3: More monitoring? | Sufficient / Add | Gaps, risk |
| DP4: To production? | Proceed / Stay in staging | Staging results, readiness |

## Anti-Patterns

1. **No rollback plan** — No failure plan
2. **End of day deploy** — No support available
3. **No verification** — Assuming success
4. **Skipping staging** — Direct to prod
5. **Big bang** — Everything at once

## Output

Use: `templates/deployment-plan.md` | Prev: `05-test.md` | Next: `08-modernize.md` | Capability: `capabilities/deployment.md`
