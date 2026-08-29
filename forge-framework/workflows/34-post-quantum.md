# Workflow 34: Post-Quantum Security

**Duration**: 4-20h | **Outputs**: Crypto inventory, migration plan, quantum-resistant architecture

## Trigger
- Post-quantum cryptography migration, quantum readiness assessment
- NIST PQC standard adoption, crypto-agility implementation

## Steps

### Step 1: Cryptographic Inventory
Catalog all cryptographic assets. Identify algorithms and key lengths. Document dependencies.
**Time**: 2-4h.

### Step 2: Quantum Risk Assessment
Assess vulnerability to quantum attacks. Identify "harvest now, decrypt later" risks.
**Time**: 1-2h.

### Step 3: PQC Strategy
Select NIST-standardized algorithms (ML-KEM, ML-DSA, SLH-DSA). Define migration approach.
**Time**: 2-4h.

### Step 4: Migration Planning
Create migration roadmap. Plan hybrid cryptographic approach. Define testing.
**Time**: 2-4h.

### Step 5: Implementation
Implement PQC algorithms. Configure hybrid mode. Update certificates.
**Time**: 4-8h.

### Step 6: Validation and Reporting
Test quantum-resistant implementation. Document migration. Plan ongoing crypto-agility.
**Time**: 2-4h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Crypto inventory complete |
| QG2 | Quantum risks assessed |
| QG3 | PQC strategy defined |
| QG4 | Migration planned |
| QG5 | Implementation complete |
| QG6 | Validation passed |

## Output
Use: `templates/post-quantum-report.md` | Capability: `capabilities/post-quantum.md`

## Anti-Patterns

1. **Security as afterthought** — Adding security late
2. **Tool overload** — Too many tools without integration
3. **No automation** — Manual processes in CI/CD
4. **Ignoring compliance** — Not meeting regulatory requirements

## Edge Cases

- Legacy systems → Use incremental security improvements
- No security team → Use automated tools
- Compliance conflicts → Consult legal team
