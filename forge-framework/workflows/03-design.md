# Workflow 03: Design

**Duration**: 4-20 hours | **Outputs**: Architecture doc, component designs, data model, API spec, ADRs

## Trigger

- System architecture creation/modification
- Component designs needed
- Data model definition
- API design
- Design decision documentation
- ADRs needed

## Steps

### Step 1: Architecture Design
**Actions**: Define boundaries, identify components, define interactions, select style, define deployment, document decisions, create diagrams.
**Styles**: Microservices, Monolith, Serverless, Event-Driven, Layered, Hexagonal
**Views**: Logical, Process, Development, Physical, Scenarios
**Output**: Architecture doc | **Time**: 2-4 hours | **Tools**: draw.io, Lucidchart, PlantUML
**Edge Cases**: Small team → modular monolith; high consistency → evaluate eventual; limited ops → fewer services

### Step 2: Component Design
**Actions**: Decompose architecture, define interfaces, specify responsibilities, define dependencies, select patterns, document internals, define error handling.
**Principles**: SOLID, DRY, KISS, YAGNI, Separation of Concerns, Law of Demeter
**Output**: Component design doc | **Time**: 2-4 hours | **Tools**: UML tools
**Edge Cases**: Too large → split; circular deps → interface/event; shared logic → extract

### Step 3: Data Model Design
**Actions**: Identify entities/attributes, define relationships, normalize, define keys, define indexes, plan migration, document constraints, define retention.
**Types**: Conceptual, Logical, Physical
**Output**: Data model with ERD | **Time**: 2-4 hours | **Tools**: dbdiagram.io, ERDPlus
**Edge Cases**: Many-to-many → junction table; hierarchical → adjacency/nested set; large text → separate table; temporal → SCD/event sourcing

### Step 4: API Design
**Actions**: Define endpoints, specify request/response, define auth, document errors, define rate limiting, plan versioning, create spec, define pagination/filtering.
**Styles**: REST, GraphQL, gRPC, WebSocket
**Output**: API spec | **Time**: 2-4 hours | **Tools**: Swagger, Stoplight, Postman
**Edge Cases**: Large results → cursor pagination; complex queries → GraphQL; file uploads → multipart/S3; real-time → WebSocket/SSE

### Step 5: Design Validation
**Actions**: Review against requirements, validate constraints, assess quality attributes, conduct review, address gaps, validate scalability/security/performance.
**Output**: Validation report | **Time**: 1-2 hours | **Tools**: Review checklist
**Edge Cases**: Doesn't meet reqs → iterate; disagreement → facilitate; new constraints → update

### Step 6: Architecture Decision Records
**Actions**: Identify decisions, document context, list options, document choice with rationale, document trade-offs, get sign-off.
**Format**: Title, Status, Context, Decision, Consequences
**Output**: ADRs | **Time**: 1-2 hours | **Tools**: adr-tools, Markdown
**Edge Cases**: Reversible → lower ceremony; irreversible → more scrutiny; contested → document dissent

### Step 7: Design Synthesis
**Actions**: Consolidate artifacts, create overview, document principles, note open issues, define entry criteria, prepare handoff.
**Output**: Design doc | **Time**: 1-2 hours | **Tools**: Doc template
**Edge Cases**: Incomplete → document gaps; pending choices → set deadline; capacity concerns → phased

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Architecture addresses all requirements |
| QG2 | Components follow SOLID principles |
| QG3 | Data model normalized and indexed |
| QG4 | APIs follow best practices |
| QG5 | Security integrated into design |
| QG6 | Performance considerations documented |
| QG7 | ADRs created for significant decisions |
| QG8 | Design reviewed and validated |
| QG9 | Report follows template format |

## Decision Points

| Point | Options | Criteria |
|-------|---------|----------|
| DP1: Architectural style? | Microservices / Monolith / Serverless / Event-Driven | Scale, team, complexity |
| DP2: API style? | REST / GraphQL / gRPC | Use case, client needs |
| DP3: Database type? | SQL / NoSQL / Graph / Time-series | Data structure, queries |
| DP4: Design complexity? | Simplify / Add / Maintain | Requirements, YAGNI |

## Anti-Patterns

1. **Big design up front** — Every detail before implementation
2. **Designing in a vacuum** — No input from implementers
3. **Pattern over-application** — Unnecessary complexity
4. **Ignoring non-functional** — Works but doesn't scale
5. **No ADRs** — Decisions undocumented

## Output

Use: `templates/design-document.md` | Prev: `02-analyze.md` | Next: `04-implement.md` | Capability: `capabilities/design.md`
