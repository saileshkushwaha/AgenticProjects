# Workflow 11: Performance Optimization

**Duration**: 4-16h | **Outputs**: Performance analysis report, optimization plan, benchmark results

## Trigger

- Performance degradation, bottleneck identification, capacity planning
- Pre-release performance validation, SLA/SLO compliance

## Steps

### Step 1: Baseline Establishment
Define metrics (latency, throughput, resource usage). Establish current performance baseline. Identify SLAs/SLOs.
**Time**: 1-2h.

### Step 2: Bottleneck Identification
Profile CPU, memory, I/O, network. Identify slow queries, hot paths, resource contention.
**Time**: 2-4h.

### Step 3: Root Cause Analysis
Analyze bottlenecks. Identify architectural issues, inefficient algorithms, resource limits.
**Time**: 2-4h.

### Step 4: Optimization Strategy
Define optimization approach (caching, indexing, async, scaling). Prioritize by impact/effort.
**Time**: 1-2h.

### Step 5: Implementation
Apply optimizations. Code changes, config tuning, infrastructure adjustments.
**Time**: 2-8h.

### Step 6: Validation and Reporting
Measure improvement. Compare against baseline. Document changes and results.
**Time**: 1-2h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Baseline established |
| QG2 | Bottlenecks identified |
| QG3 | Root cause analyzed |
| QG4 | Optimizations implemented |
| QG5 | Improvement measured |
| QG6 | Report follows template |

## Anti-Patterns

1. **Premature optimization** — Without baseline
2. **Micro-optimization** — Ignoring big picture
3. **No measurement** — Subjective improvement
4. **Over-optimization** — Diminishing returns

## Output

Use: `templates/performance-report.md` | Capability: `capabilities/performance.md`
