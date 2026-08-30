# BankingApp

A full-featured digital banking platform built with React 18, TypeScript, Vite, and Node.js.

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Frontend Framework | React | 18.3.x |
| Language | TypeScript | 5.6.x |
| Build Tool | Vite | 5.4.x |
| Styling | Tailwind CSS | 3.4.x |
| UI Components | shadcn/ui pattern | latest |
| Icons | Lucide React | latest |
| Data Fetching | TanStack Query | 5.x |
| State Management | Zustand | 4.5.x |
| Forms | React Hook Form + Zod | 7.x + 3.x |
| Charts | Recharts | 2.x |
| Backend Runtime | Node.js | **22.x (LTS)** |
| Backend Framework | Express | 4.x |
| Database | SQLite (dev) / PostgreSQL (prod) | 16.x |
| ORM | Drizzle | latest |
| Testing (FE) | Vitest + Testing Library | 4.x + 16.x |
| Testing (BE) | node:test | native |

## Requirements

- **Node.js**: >= 22.0.0 (LTS)
- **npm**: >= 10.0.0

## Setup

```bash
# Install dependencies
npm install

# Start development (frontend + backend)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test
npm run test:frontend
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8787` | Backend server port |
| `JWT_SECRET` | `banking-app-secret-key-change-in-production` | JWT signing secret |
| `KYC_VENDOR` | `persona` | Default KYC vendor (onfido, persona, jumio) |
| `DB_PATH` | `./banking.db` | SQLite database path |
| `VITE_API_URL` | `/api` | Frontend API base URL |

## Project Structure

```
BankingApp/
├── src/                    # Frontend source
│   ├── components/         # UI components
│   │   ├── ui/             # shadcn-style primitives
│   │   └── layout/         # Layout components
│   ├── screens/            # Page components
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API client
│   ├── stores/             # Zustand state
│   ├── lib/                # Utilities
│   ├── App.tsx
│   └── main.tsx
├── server/                 # Backend source
│   ├── index.mjs           # Express server
│   ├── kyc.mjs             # KYC vendor adapters
│   └── db/                 # Database schema
├── docs/                   # Framework artifacts
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Accounts
- `GET /api/accounts` - List accounts
- `POST /api/accounts` - Create account
- `GET /api/accounts/:id` - Get account detail
- `POST /api/accounts/:id/deposit` - Deposit funds

### Transactions
- `GET /api/transactions` - List transactions

### Transfers
- `GET /api/transfers` - List transfers
- `POST /api/transfers` - Create transfer

### KYC
- `POST /api/kyc/document` - Verify document
- `POST /api/kyc/liveness` - Liveness check
- `POST /api/kyc/watchlist` - Watchlist screening

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - List applications (officer/admin)
- `POST /api/applications/:id/decision` - Approve/reject

## Deployment

- **Frontend**: GitHub Pages
- **Backend**: Render
- **CI/CD**: GitHub Actions (Node.js 22)

## License

MIT
