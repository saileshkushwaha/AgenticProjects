# Workflow 10: Security Audit

**Duration**: 4-16h | **Outputs**: Security audit report, vulnerability assessment, remediation plan

## Trigger

- Security assessment needed, vulnerability scan, penetration test coordination
- Compliance requirement, security incident follow-up
- Pre-release security review

## Steps

### Step 1: Scope Definition
Define assets, systems, networks, data to assess. Identify compliance requirements (SOC2, HIPAA, PCI-DSS).
**Time**: 30-60 min.

### Step 2: Threat Modeling
Identify threats using STRIDE/DREAD. Map attack surfaces. Document trust boundaries.
**Time**: 2-4h.

### Step 3: Vulnerability Scanning
Run automated scans (SAST, DAST, SCA). Manual testing for business logic. Document findings.
**Time**: 2-4h.

### Step 4: Risk Assessment
Classify vulnerabilities (Critical/High/Medium/Low). Assess exploitability and impact. Prioritize remediation.
**Time**: 1-2h.

### Step 5: Remediation Planning
Create remediation roadmap. Assign priorities and owners. Define timelines.
**Time**: 1-2h.

### Step 6: Reporting
Document findings, risks, remediation plan. Executive summary for leadership.
**Time**: 1-2h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Scope defined and approved |
| QG2 | Threat model complete |
| QG3 | Vulnerabilities classified |
| QG4 | Risk assessment documented |
| QG5 | Remediation plan created |
| QG6 | Report follows template |

## Anti-Patterns

1. **Scope creep** — Unclear boundaries
2. **Tool reliance** — Only automated scanning
3. **No remediation** — Findings without plan
4. **Ignoring low severity** — Cumulative risk

## Output

Use: `templates/security-audit-report.md` | Capability: `capabilities/security.md`
