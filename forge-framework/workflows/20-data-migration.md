# Workflow 20: Data Migration

**Duration**: 4-20h | **Outputs**: Migration plan, validation report, rollback procedure

## Trigger
- Database migration, data warehouse migration, cloud data migration
- Schema migration, ETL pipeline creation

## Steps

### Step 1: Source Analysis
Analyze source data (volume, format, quality). Identify dependencies and constraints.
**Time**: 1-2h.

### Step 2: Target Design
Design target schema. Map source-to-target transformations. Define data types.
**Time**: 2-4h.

### Step 3: Migration Strategy
Define approach (big bang, incremental, parallel run). Plan extraction, transformation, loading.
**Time**: 1-2h.

### Step 4: Validation Planning
Define validation rules. Plan reconciliation. Create test cases.
**Time**: 1-2h.

### Step 5: Migration Execution
Execute migration. Monitor progress. Handle errors.
**Time**: 2-8h.

### Step 6: Validation and Reporting
Validate data integrity. Reconcile counts. Document results.
**Time**: 2-4h.

## Quality Gates

| Gate | Criteria |
|------|----------|
| QG1 | Source analyzed |
| QG2 | Target designed |
| QG3 | Strategy defined |
| QG4 | Validation planned |
| QG5 | Migration executed |
| QG6 | Validation passed |

## Output
Use: `templates/data-migration-report.md` | Capability: `capabilities/data-migration.md`

## Anti-Patterns

1. **Big bang migration** — Migrating everything at once
2. **No rollback plan** — Migrating without recovery strategy
3. **Ignoring data quality** — Migrating without validation
4. **No testing** — Deploying without testing migration

## Edge Cases

- Large data volumes → Use incremental migration
- Schema mismatch → Create transformation layer
- Downtime constraints → Use blue-green deployment
