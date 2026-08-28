# Design Capability

## Definition

The ability to create system architectures, component designs, data models, and API specifications that satisfy requirements and constraints.

## Proficiency Levels

| Level | Title | Description |
|-------|-------|-------------|
| 1 | Novice | Can create basic component designs but struggles with architecture |
| 2 | Competent | Can design components and simple data models, follow patterns |
| 3 | Proficient | Can create architectures, design components, create ADRs |
| 4 | Expert | Can handle complex architectures, evaluate trade-offs, mentor others |
| 5 | Master | Can establish design practices, create frameworks, handle novel domains |

## Scope

### In Scope
- System architecture design
- Component and module design
- Data model design (conceptual, logical, physical)
- API design (REST, GraphQL, gRPC)
- Design pattern application
- Architecture Decision Records (ADR)
- Interface specification
- Design validation
- Security and performance design

### Out of Scope
- Implementation of designs (see Implementation capability)
- Infrastructure design (see Deployment capability)
- UI/UX design (consult design experts)

## Skills

### Architecture Design
- Architectural style selection (microservices, monolith, serverless)
- Component decomposition
- Interface definition
- Communication pattern design
- Scalability and reliability design
- Security architecture
- Performance architecture

### Component Design
- Single responsibility application
- Design pattern selection and application
- Interface segregation
- Dependency management
- Error handling design
- State management design

### Data Modeling
- Entity-relationship modeling
- Normalization and denormalization
- Index strategy design
- Data migration planning
- Data constraint definition
- Temporal data design

### API Design
- Resource identification
- Endpoint design
- Request/response specification
- Authentication and authorization design
- Versioning strategy
- Error response standardization
- Rate limiting design

### Documentation
- Architecture diagram creation
- ADR writing
- Design rationale documentation
- Trade-off documentation
- Design review facilitation

## Assessment Criteria

### Level 1 (Novice)
- [ ] Can create basic class diagrams
- [ ] Can follow existing design patterns
- [ ] Can create simple data models

### Level 2 (Competent)
- [ ] Can design components with clear interfaces
- [ ] Can create normalized data models
- [ ] Can design basic REST APIs
- [ ] Can apply common design patterns

### Level 3 (Proficient)
- [ ] Can create system architectures
- [ ] Can write ADRs for significant decisions
- [ ] Can design for scalability and reliability
- [ ] Can validate designs against requirements

### Level 4 (Expert)
- [ ] Can handle complex distributed systems
- [ ] Can evaluate architectural trade-offs
- [ ] Can mentor others in design techniques
- [ ] Can facilitate design reviews

### Level 5 (Master)
- [ ] Can establish organizational design practices
- [ ] Can create design frameworks for new domains
- [ ] Can evaluate and improve design methodologies
- [ ] Can synthesize design across projects

## Inputs
- Requirements document
- Analysis report
- Constraints and assumptions
- Technology decisions
- Non-functional requirements

## Outputs
- Architecture document
- Component design document
- Data model with ER diagrams
- API specification (OpenAPI/Swagger)
- Architecture Decision Records
- Design validation report

## Quality Criteria
- Architecture addresses all requirements
- Components follow SOLID principles
- Data model normalized and indexed
- APIs follow best practices
- Security integrated into design
- Performance considerations documented
- ADRs created for significant decisions

## Related Workflows
- `workflows/03-design.md` - Primary workflow
- `workflows/02-analyze.md` - Provides input
- `workflows/04-implement.md` - Uses design outputs

## Metrics
- Design coverage (% of requirements addressed)
- Component cohesion and coupling scores
- API consistency score
- Design review pass rate
- ADR coverage (% of significant decisions documented)

## Development Path

To improve design capability:
1. Study software architecture patterns
2. Practice component design with real scenarios
3. Learn data modeling techniques
4. Study API design best practices
5. Practice writing ADRs
6. Seek design feedback from experienced architects
