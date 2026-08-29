# Contributing to Forge Engineering Lifecycle Framework

Thank you for your interest in contributing to the Forge framework! This document provides guidelines for contributing.

## How to Contribute

### Reporting Issues

1. Check if the issue already exists in the issue tracker
2. Create a new issue with a clear title and description
3. Include the workflow or file where the issue occurs
4. Provide steps to reproduce (if applicable)
5. Specify the expected vs actual behavior

### Suggesting Enhancements

1. Open an issue with the "enhancement" label
2. Describe the proposed enhancement and its benefits
3. Provide examples of how it would be used
4. Consider backward compatibility

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Make your changes following the framework conventions
4. Test your changes with at least one AI model
5. Update documentation if needed
6. Submit a pull request with a clear description

## Development Setup

1. Clone the repository
2. No build tools required - the framework is markdown-based
3. Edit files in your preferred editor
4. Validate markdown syntax

## Contribution Standards

### Workflow Contributions

When contributing a new workflow:

1. Follow the existing workflow structure:
   - Phase overview with duration and outputs
   - Trigger conditions
   - Step-by-step instructions with time estimates
   - Quality gates table
   - Anti-patterns section
   - Output reference

2. Include:
   - Time estimates for each step
   - Tool recommendations
   - Edge case handling
   - Quality gates (objective, measurable criteria)

3. Create matching:
   - Capability definition in `capabilities/`
   - Template in `templates/`

### Template Contributions

When contributing a new template:

1. Follow the standard artifact structure:
   - Header with Created, Phase, Status, Author, Version
   - Executive Summary
   - Main content sections
   - Decisions & Rationale table
   - Risks & Mitigations table
   - Assumptions, Open Issues, Next Steps, References

2. Use Markdown formatting:
   - ATX-style headers (# not underlines)
   - Tables for structured data
   - Bullet lists for unordered items
   - Numbered lists for sequential items

### Documentation Contributions

1. Use clear, concise language
2. Include examples where helpful
3. Follow existing terminology (see GLOSSARY.md)
4. Update the CHANGELOG.md with your changes

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Respect different viewpoints and experiences
- Help maintain a positive community

## Review Process

1. All submissions require review
2. Maintainers will provide feedback within 48 hours
3. Address review comments promptly
4. Once approved, your contribution will be merged

## Recognition

Contributors will be recognized in the CHANGELOG.md and README.md.

## License

By contributing, you agree that your contributions will be licensed under the same license as the framework.
