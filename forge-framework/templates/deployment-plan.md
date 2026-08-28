# Deployment Plan

**Created**: [ISO 8601] | **Phase**: Deployment | **Status**: [draft|review|approved]
**Author**: [Name] | **Version**: [SemVer]

## Executive Summary
[2-3 sentences: what will be deployed, strategy, status]

## Scope
**Components**: [Component 1]: [version] | [Component 2]: [version]
**Environments**: [Staging|Production]
**Window**: [Date] [Time] [Timezone] | **Duration**: [estimated]

## Strategy
**Strategy**: [Blue-Green|Canary|Rolling|Recreate]
**Rationale**: [Why this strategy]

## Pre-Deployment Checklist
- [ ] Quality gates passed | [ ] Code reviewed | [ ] Tests passing
- [ ] Documentation updated | [ ] Stakeholders notified | [ ] Backups completed
- [ ] Rollback plan tested | [ ] Monitoring verified

## Environment Configuration

| Resource | Configuration | Status |
|----------|---------------|--------|
| [Resource] | [config] | [ready/not-ready] |

## Deployment Steps

| Step | Description | Expected | Verification | Duration |
|------|-------------|----------|--------------|----------|
| 1 | [description] | [outcome] | [how to verify] | [time] |

## Rollback Plan

| Trigger | Action |
|---------|--------|
| Error rate > 5% | Switch to previous version |
| Performance degradation | Immediate rollback |

**Steps**: 1. [Step 1] 2. [Step 2]
**Time Limit**: [Maximum time before rollback]

## Post-Deployment Verification

| Test | Expected | Actual | Status |
|------|----------|--------|--------|
| [Test 1] | [expected] | [actual] | [pass/fail] |

## Monitoring Verification
- [ ] Metrics collecting | [ ] Logs aggregating | [ ] Alerts configured

## Communication Plan

| Stakeholder | When | How | Message |
|-------------|------|-----|---------|
| [Name] | [when] | [how] | [message] |

## Results
**Status**: [success|partial|failed] | **Duration**: [actual]

| Metric | Target | Actual |
|--------|--------|--------|
| [Metric] | [target] | [actual] |

## Issues Encountered / Lessons Learned / Next Steps / References
| Issue | Impact | Resolution |
|-------|--------|------------|
| [Issue 1] | [impact] | [resolution] |
