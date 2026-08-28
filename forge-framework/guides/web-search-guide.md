# Web Search Integration Guide - Forge Engineering Lifecycle Framework

## Search Query Templates

### Technology Evaluation
```
"{tech A} vs {tech B} {year}" site:news.ycombinator.com
"{tech A} vs {tech B} comparison" site:medium.com OR site:dev.to
"{tech} benchmarks {year}" site:github.com
"{tech} limitations" site:news.ycombinator.com
```

### Best Practices
```
"{domain} best practices {year}" site:docs.{vendor}.com
"{domain} anti-patterns" site:refactoring.guru
"{domain} design patterns" site:oreilly.com
```

### Competitive Analysis
```
"{product} vs {competitor} {year}" site:g2.com OR site:capterra.com
"{product} reviews" site:trustradius.com
"{industry} trends {year}" site:gartner.com
```

### Academic Research
```
"{topic} research paper" site:scholar.google.com
"{topic} survey" site:arxiv.org
"{topic} conference paper" site:dl.acm.org
```

## Search Strategies

| Strategy | Description |
|----------|-------------|
| **Snowball Sampling** | Start with one source, extract references, follow up, repeat until saturation |
| **Multi-Angle Search** | Search from technology, problem, domain, and experience perspectives |
| **Source Triangulation** | Find claim, search confirming sources, search contradicting sources, assess consensus |
| **Temporal Analysis** | Search latest, historical, and future direction to identify trends |
| **Expert Identification** | Search for experts, identify most cited, check their other works |

## Source Quality Hierarchy

1. **Peer-reviewed papers, official documentation** — Highest credibility
2. **Reputable industry publications, established blogs** — High credibility
3. **Expert opinions, conference talks** — Credible with context
4. **Community forums, social media** — Variable, needs verification
5. **Vendor materials** — Useful but bias-aware

## Citation Format (IEEE)

```
[#] Author, "Title," Publication, vol. X, no. Y, pp. Z, Month Year.
```

### Examples
```
[1] J. Kreps et al., "Kafka: A Distributed Messaging System," in Proc. NetDB, 2011.
[2] "Amazon SQS Documentation," AWS, 2024. [Online]. Available: https://docs.aws.amazon.com/sqs/
```

## Paywalled Content Handling

| Alternative | How |
|-------------|-----|
| Preprint versions | Search arXiv, SSRN, author websites |
| Author copies | Check personal/institutional websites |
| Open access mirrors | Google Scholar "All versions" |
| Library access | Institutional/public library subscriptions |
| Contact authors | Email directly (often willing to share) |

## Research Time Tracking

| Phase | Estimated | Actual | Variance |
|-------|-----------|--------|----------|
| Objectives | [min] | [min] | [min] |
| Gathering | [hrs] | [hrs] | [hrs] |
| Verification | [hrs] | [hrs] | [hrs] |
| Evaluation | [hrs] | [hrs] | [hrs] |
| Synthesis | [hrs] | [hrs] | [hrs] |

**Rule**: If gathering exceeds 150% of estimate, reassess scope.
