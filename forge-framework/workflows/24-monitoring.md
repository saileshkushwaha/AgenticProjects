# Workflow 24: Monitoring and Observability

**Duration**: 4-16h | **Outputs**: Monitoring strategy, alerting config, dashboard design

## Trigger
- Monitoring setup, observability improvement, SLO definition
- Alerting review, incident response improvement

## Steps

### Step 1: Requirements Definition
Define what to monitor (infra, app, business). Identify SLIs, SLOs, SLAs.
**Time**: 1-2h.

### Step 2: Tool Selection
Evaluate monitoring tools (Datadog, Grafana, Prometheus, New Relic). Select stack.
**Time**: 1-2h.

### Step 3: Instrumentation Planning
Plan metrics, logs, traces. Define tagging strategy. Plan dashboards.
**Time**: 2-4h.

### Step 4: Alert Design
Define alert thresholds. Plan notification channels. Document runbooks.
**Time**: 2-4h.

### Step 5: Implementation
Deploy agents. Configure dashboards. Set up alerts.
**Time**: 2-8h.

### Step 6: Validation and Reporting
Verify monitoring works. Document setup. Train team.
**Time**: 1-2h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Requirements defined |
| QG2 | Tools selected |
| QG3 | Instrumentation planned |
| QG4 | Alerts designed |
| QG5 | Implementation complete |
| QG6 | Validation passed |

## Output
Use: `templates/monitoring-report.md` | Capability: `capabilities/monitoring.md`
