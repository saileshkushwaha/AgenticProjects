# Workflow 01: Research

**Duration**: 2-8 hours | **Outputs**: Research report, comparison matrix, best practices

## Trigger

- New technology evaluation needed
- Best practices identification
- Competitive analysis required
- Industry trend understanding
- Technical feasibility investigation
- Knowledge gap blocking progress

## Steps

### Step 1: Define Research Objectives
**Actions**: Clarify question, define scope, identify success criteria, determine depth, set constraints.
**Output**: Research objectives | **Time**: 15-30 min | **Tools**: Note-taking, mind mapping
**Edge Cases**: Too broad → narrow; too narrow → expand; no criteria → define with stakeholder

### Step 2: Information Gathering
**Actions**: Search academic, industry, community sources. Collect quantitative and qualitative data. Cross-reference findings.
**Output**: Raw research data | **Time**: 1-3 hours | **Tools**: Google Scholar, GitHub, Stack Overflow, tech blogs
**Edge Cases**: Too few sources → broaden search; conflicting → document both; outdated → prioritize recent; paywalled → use abstracts

### Step 3: Technology Evaluation
**Actions**: Identify candidates, define criteria, score options, document strengths/weaknesses, identify integration needs.
**Criteria**: Technical (performance, scalability), Ecosystem (community, docs), Operational (complexity, monitoring), Business (cost, licensing), Organizational (skills, learning curve)
**Output**: Comparison matrix | **Time**: 1-2 hours | **Tools**: Spreadsheet
**Edge Cases**: Equal scores → add criteria or PoC; no fit → document trade-offs; new tech → note risk, suggest PoC; vendor lock-in → evaluate exit cost

### Step 4: Best Practices Identification
**Actions**: Identify patterns, document approaches, note pitfalls, identify standards, document tuning recommendations.
**Output**: Best practices document | **Time**: 30-60 min | **Tools**: Documentation, case studies, talks
**Edge Cases**: Conflicts → document context; no practices → note as emerging; outdated → verify

### Step 5: Competitive Analysis (if applicable)
**Actions**: Identify competitors, compare features, analyze strengths/weaknesses, identify differentiation.
**Output**: Competitive analysis matrix | **Time**: 30-60 min | **Tools**: Product sites, review sites
**Edge Cases**: No direct competitors → analyze adjacent; proprietary → use docs; rapid change → note date

### Step 6: Synthesis and Reporting
**Actions**: Synthesize findings, identify insights, document confidence levels, note uncertainties, create summary, prepare report.
**Output**: Research report | **Time**: 30-60 min | **Tools**: Report template, diagram tools
**Edge Cases**: Inconclusive → recommend further research; disagreement → document dissent; scope changed → update objectives

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Research objectives clear and scoped |
| QG2 | Multiple credible sources (≥3) |
| QG3 | Source credibility assessed |
| QG4 | Evaluation criteria defined and applied |
| QG5 | Findings supported by evidence |
| QG6 | Uncertainties documented |
| QG7 | Recommendations actionable |
| QG8 | Best practices identified |
| QG9 | Report follows template |

## Decision Points

| Point | Options | Criteria |
|-------|---------|----------|
| DP1: Sufficient info? | Continue / Extend research | Coverage, confidence |
| DP2: Multiple options? | Recommend top / Present all | Stakeholder preference |
| DP3: Need PoC? | Create PoC / Proceed | Risk, uncertainty, cost |
| DP4: Scope adjustment? | Expand / Reduce / Maintain | New information |

## Anti-Patterns

1. **Confirmation bias** — Only seeking confirming information
2. **Single source reliance** — One source for recommendations
3. **Shallow research** — Surface-level without depth
4. **Ignoring recency** — Outdated sources
5. **No confidence levels** — Equal certainty for all findings

## Output

Use: `templates/research-report.md` | Next: `02-analyze.md` | Capability: `capabilities/research.md`
