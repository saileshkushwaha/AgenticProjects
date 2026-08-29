# Framework Validation Guide - Forge Engineering Lifecycle Framework

## Overview

This guide provides procedures to validate the framework's correctness, consistency, and completeness.

## Validation Checks

### 1. Structural Validation

#### File Naming
```bash
# Check workflow naming pattern
for f in workflows/[0-9][0-9]-*.md; do
  if [[ ! "$f" =~ ^workflows/[0-9]{2}-[a-z0-9-]+\.md$ ]]; then
    echo "Invalid naming: $f"
  fi
done
```

#### Required Sections
Each workflow must contain:
- [ ] Phase overview (duration, outputs)
- [ ] Trigger conditions
- [ ] Steps with time estimates
- [ ] Quality gates table
- [ ] Anti-patterns section
- [ ] Edge cases section
- [ ] Output reference

#### Template Consistency
Each template must contain:
- [ ] Header with Created, Phase, Status, Author, Version
- [ ] Executive Summary
- [ ] Main content sections
- [ ] Decisions & Rationale table
- [ ] Risks & Mitigations table
- [ ] Assumptions, Open Issues, Next Steps, References

### 2. Content Validation

#### Cross-Reference Check
```bash
# Verify all workflow references exist
grep -oP 'workflows/\K[0-9]{2}-[a-z0-9-]+' workflows/*.md | sort -u | while read ref; do
  if [ ! -f "workflows/${ref}.md" ]; then
    echo "Missing workflow: $ref"
  fi
done
```

#### Template Reference Check
```bash
# Verify all template references exist
grep -oP 'templates/\K[a-z0-9-]+' workflows/*.md | sort -u | while read ref; do
  if [ ! -f "templates/${ref}.md" ]; then
    echo "Missing template: $ref"
  fi
done
```

#### Capability Reference Check
```bash
# Verify all capability references exist
grep -oP 'capabilities/\K[a-z0-9-]+' workflows/*.md | sort -u | while read ref; do
  if [ ! -f "capabilities/${ref}.md" ]; then
    echo "Missing capability: $ref"
  fi
done
```

### 3. Consistency Validation

#### Quality Gate Format
All quality gates must follow the format:
```
| QG[0-9]+ | [criteria] |
```

#### Anti-Patterns Format
All anti-patterns must follow the format:
```
1. **[Name]**: [description]
```

#### Time Estimates
All time estimates must use consistent format:
- Minutes: `[X]-[Y] min`
- Hours: `[X]-[Y] h`
- Days: `[X]-[Y] days`

### 4. Completeness Validation

#### Workflow Coverage
- [ ] All 36 workflows present (00-35)
- [ ] All capabilities present (34 + retrospective + technical-debt)
- [ ] All templates present (34 + retrospective + technical-debt)

#### Guide Coverage
- [ ] Integration guide
- [ ] Configuration guide
- [ ] Troubleshooting guide
- [ ] Web search guide
- [ ] Research mode selection guide
- [ ] Onboarding guide
- [ ] Migration guide
- [ ] Compatibility guide
- [ ] Greenfield guide

#### Supporting Documentation
- [ ] README.md
- [ ] QUICK-REFERENCE.md
- [ ] GLOSSARY.md
- [ ] ANTI-PATTERNS.md
- [ ] METRICS.md
- [ ] CHANGELOG.md
- [ ] DIAGRAMS.md
- [ ] VERSIONING.md
- [ ] CONTRIBUTING.md
- [ ] EXTENSION-POINTS.md
- [ ] API-REFERENCE.md
- [ ] CASE-STUDIES.md

### 5. Token Efficiency Validation

#### File Size Targets
| File Type | Target Lines | Max Lines |
|-----------|--------------|-----------|
| System prompt | <80 | 100 |
| Workflow | <100 | 150 |
| Template | <80 | 120 |
| Capability | <150 | 200 |
| Guide | <200 | 300 |

#### Redundancy Check
- [ ] No duplicate content across workflows
- [ ] No duplicate content across templates
- [ ] Shared content referenced, not duplicated

## Validation Scripts

### Full Validation
```bash
#!/bin/bash
echo "=== Framework Validation ==="

# Check file counts
echo "Workflows: $(ls workflows/[0-9][0-9]-*.md 2>/dev/null | wc -l)"
echo "Capabilities: $(ls capabilities/*.md 2>/dev/null | wc -l)"
echo "Templates: $(ls templates/*.md 2>/dev/null | wc -l)"
echo "Guides: $(ls guides/*.md 2>/dev/null | wc -l)"

# Check required sections
for f in workflows/[0-9][0-9]-*.md; do
  echo "Checking: $f"
  grep -q "Quality Gates" "$f" || echo "  Missing: Quality Gates"
  grep -q "Anti-Patterns" "$f" || echo "  Missing: Anti-Patterns"
  grep -q "Edge Cases" "$f" || echo "  Missing: Edge Cases"
done

echo "=== Validation Complete ==="
```

## Reporting Issues

If validation fails:
1. Document the issue
2. Identify the root cause
3. Create a fix
4. Re-validate

## Continuous Improvement

Run validation:
- Before each release
- After adding new content
- When modifying existing content
- Quarterly for maintenance
