# Versioning Policy - Forge Engineering Lifecycle Framework

## Semantic Versioning

Forge follows [Semantic Versioning 2.0.0](https://semver.org/) (MAJOR.MINOR.PATCH).

### Version Format

```
MAJOR.MINOR.PATCH
```

- **MAJOR**: Breaking changes to workflows, templates, or core structure
- **MINOR**: New workflows, capabilities, or features (backward compatible)
- **PATCH**: Corrections, clarifications, improvements (backward compatible)

### Version Increment Rules

#### MAJOR Version Increment

Increment MAJOR when:
- Removing or renaming workflows
- Changing the structure of existing workflows in a breaking way
- Removing templates or changing their structure
- Changing the artifact output format specification
- Any change that would break existing automation or tooling

Examples:
- Removing a workflow
- Changing quality gate criteria significantly
- Renaming or removing template sections

#### MINOR Version Increment

Increment MINOR when:
- Adding new workflows
- Adding new capabilities
- Adding new templates
- Adding new guides
- Enhancing existing workflows with additional steps or criteria
- Adding new configuration options

Examples:
- Adding a new workflow (e.g., 35-new-workflow.md)
- Adding new quality gates to existing workflows
- Adding new edge cases

#### PATCH Version Increment

Increment PATCH when:
- Fixing typos or grammatical errors
- Clarifying existing documentation
- Improving formatting
- Adding examples to existing workflows
- Fixing broken links
- Updating tool recommendations

Examples:
- Correcting a typo in a workflow
- Adding a code example to an existing workflow
- Clarifying a quality gate criterion

### Pre-Release Versions

Pre-release versions use the format: `MAJOR.MINOR.PATCH-prerelease`

Examples:
- `3.1.0-alpha.1` - Alpha release of upcoming minor version
- `3.0.0-beta.2` - Beta release before stable
- `3.0.0-rc.1` - Release candidate

### Deprecation Policy

When a feature is deprecated:
1. Mark as deprecated in current MINOR version
2. Include migration guidance
3. Remove in next MAJOR version
4. Document in CHANGELOG.md

### Version Support

| Version | Status | Support Level |
|---------|--------|---------------|
| Current | Active | Full support |
| Previous MINOR | Maintenance | Bug fixes only |
| Previous MAJOR | End of life | No support |

### Changelog Requirements

Each version release must include CHANGELOG.md entries:

```markdown
## [vX.Y.Z] - YYYY-MM-DD

### Added
- New features

### Changed
- Changes to existing functionality

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Fixed
- Bug fixes

### Security
- Security improvements
```

### Branching Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Stable releases |
| `develop` | Integration branch |
| `feature/*` | Feature development |
| `hotfix/*` | Emergency fixes |
| `release/*` | Release preparation |

### Release Process

1. Create release branch from `develop`
2. Update CHANGELOG.md
3. Bump version number
4. Run validation checks
5. Merge to `main`
6. Tag with version number
7. Create GitHub release

### Compatibility Matrix

| Framework Version | Min Context Window | Recommended Context |
|-------------------|-------------------|---------------------|
| v3.x.x | 8K tokens | 32K+ tokens |
| v2.x.x | 8K tokens | 32K+ tokens |
| v1.x.x | 4K tokens | 16K+ tokens |
