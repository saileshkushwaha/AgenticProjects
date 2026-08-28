# Workflow 02: Analysis

**Duration**: 4-16 hours | **Outputs**: Requirements doc, feasibility assessment, risk register, trade-off analysis

## Trigger

- Requirements need analysis/refinement
- Feasibility assessment needed
- Risk identification required
- Constraint documentation
- Business case evaluation
- Trade-off analysis needed

## Steps

### Step 1: Requirements Elicitation
**Actions**: Gather functional/non-functional requirements, identify stakeholders, document user stories, prioritize (MoSCoW), validate.
**Types**: Functional, Performance, Security, Reliability, Usability, Compliance
**Output**: Requirements doc | **Time**: 2-4 hours | **Tools**: Interviews, surveys, Jira
**Edge Cases**: Unavailable stakeholders → async methods; conflicts → facilitate; vague → prototypes; too many → MoSCoW

### Step 2: Requirements Analysis
**Actions**: Check completeness, consistency, testability, feasibility. Identify ambiguity, refine, create acceptance criteria.
**Techniques**: Traceability matrix, dependency analysis, conflict resolution
**Output**: Refined requirements | **Time**: 1-2 hours | **Tools**: Traceability matrix
**Edge Cases**: Circular deps → break cycle; untestable → rewrite measurable; conflicts → facilitate

### Step 3: Feasibility Study
**Actions**: Assess technical (readiness, integration, constraints, team, infrastructure), economic (costs, ROI, TCO, payback), operational (readiness, process changes, training, impact, timeline).
**Output**: Feasibility assessment | **Time**: 2-4 hours | **Tools**: Spreadsheet
**Edge Cases**: Technical infeasible → alternatives; negative ROI → recommend against; unready → phased approach

### Step 4: Risk Assessment
**Actions**: Identify risks, categorize, assess probability/impact, calculate score, prioritize, develop mitigations, identify contingencies.
**Categories**: Technical, Schedule, Cost, Operational, External
**Output**: Risk register | **Time**: 1-2 hours | **Tools**: Risk register template
**Edge Cases**: Too many → top 10; low-prob high-impact → contingency; interdependent → combined impact

### Step 5: Constraint Identification
**Actions**: Document technical, business, regulatory, organizational, environmental constraints. Assess impact.
**Output**: Constraint document | **Time**: 30-60 min | **Tools**: Constraint matrix
**Edge Cases**: Over-constrained → identify flexible; conflicting → prioritize; hidden → probe

### Step 6: Trade-off Analysis
**Actions**: Identify decisions, define/weight criteria, score options, calculate weighted scores, identify trade-offs, recommend.
**Frameworks**: SWOT, cost-benefit, decision matrix, Pareto
**Output**: Trade-off analysis | **Time**: 1-2 hours | **Tools**: Decision matrix
**Edge Cases**: Equal scores → add criteria/PoC; disagreement → document dissent; new options → re-run

### Step 7: Analysis Synthesis
**Actions**: Consolidate findings, create summary, document findings/recommendations, note assumptions, define entry criteria, prepare handoff.
**Output**: Analysis report | **Time**: 1-2 hours | **Tools**: Report template
**Edge Cases**: Inconclusive → recommend further; disagreement → document; scope changed → update

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | All requirement types addressed |
| QG2 | Requirements testable and unambiguous |
| QG3 | Feasibility assessed across all dimensions |
| QG4 | Risks identified with mitigations |
| QG5 | Constraints documented and assessed |
| QG6 | Trade-offs analyzed with clear rationale |
| QG7 | Stakeholder validation obtained |
| QG8 | Report follows template format |

## Decision Points

| Point | Options | Criteria |
|-------|---------|----------|
| DP1: Requirements complete? | Proceed / Refine | Coverage, clarity, agreement |
| DP2: Feasible? | Proceed / Recommend changes / Stop | Technical, economic, operational |
| DP3: Risks acceptable? | Proceed / Re-evaluate scope | Risk scores, mitigations |
| DP4: Constraints too tight? | Proceed / Negotiate | Impact, flexibility |

## Anti-Patterns

1. **Vague requirements** — Ambiguous without clarification
2. **Ignoring non-functional** — Features only
3. **Optimistic risk assessment** — Underestimating
4. **Analysis paralysis** — Too long without deciding
5. **No stakeholder validation** — Not confirming

## Output

Use: `templates/analysis-report.md` | Prev: `01-research.md` | Next: `03-design.md` | Capability: `capabilities/analysis.md`
