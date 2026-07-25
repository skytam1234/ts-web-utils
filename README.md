# e-CLONE Full-stack Application

## 📁 Cấu trúc Dự án (Monorepo)

```
e-CLONE/
├── .cursor/                          # Global Cursor configs (shareable)
│   ├── rules/                        # Global coding rules
│   ├── skills/                       # Global skills
│   └── agents/                       # Global agent configs
│
├── .github/                          # GitHub configuration
│   └── workflows/                    # CI/CD pipelines
│
├── docker/                           # Docker files
│
├── scripts/                          # Utility scripts (db seed, reset, etc)
│
├── docs/                             # Documentation
│
├── apps/
│   ├── backend/                     # Node.js + Express Backend
│   │   ├── cursor/                  # Project-specific Cursor configs
│   │   │   ├── rules/
│   │   │   ├── skills/
│   │   │   └── agents/
│   │   ├── src/
│   │   │   ├── config/              # Environment & app config
│   │   │   ├── constants/           # Backend constants
│   │   │   ├── controllers/         # Route controllers
│   │   │   ├── errors/              # Custom error classes
│   │   │   ├── events/              # Event handlers (EventEmitter)
│   │   │   ├── jobs/                # Background jobs (BullMQ)
│   │   │   ├── logs/                # Logger (Winston/Pino)
│   │   │   ├── middlewares/         # Express middlewares
│   │   │   ├── repositories/        # Data access layer
│   │   │   ├── routes/              # API routes
│   │   │   ├── services/            # Business logic
│   │   │   ├── sockets/             # Socket.io handlers
│   │   │   ├── types/               # TypeScript types
│   │   │   ├── utils/               # Backend utilities
│   │   │   ├── validators/          # Request validation (Zod)
│   │   │   ├── database/            # Custom DB scripts
│   │   │   ├── app.ts               # Express app setup
│   │   │   └── server.ts            # HTTP server entry
│   │   ├── prisma/
│   │   │   ├── migrations/          # Database migrations
│   │   │   └── schema.prisma        # Database schema
│   │   ├── uploads/                 # File uploads
│   │   └── tests/
│   │       ├── unit/                # Unit tests
│   │       ├── integration/         # Integration tests
│   │       ├── e2e/                 # End-to-end tests
│   │       ├── fixtures/            # Test data
│   │       └── mocks/               # Mock objects
│   │
│   └── frontend/                    # Next.js + React Frontend
│       ├── cursor/                  # Project-specific Cursor configs
│       │   ├── rules/
│       │   ├── skills/
│       │   └── agents/
│       ├── src/
│       │   ├── app/                 # Next.js App Router
│       │   │   ├── (auth)/          # Auth pages group
│       │   │   │   ├── login/
│       │   │   │   └── register/
│       │   │   ├── (dashboard)/     # Protected pages group
│       │   │   ├── api/             # API routes
│       │   │   ├── layout.tsx       # Root layout
│       │   │   └── page.tsx         # Home page
│       │   ├── assets/              # Static assets (SVGs, fonts)
│       │   │   ├── images/
│       │   │   ├── icons/
│       │   │   └── fonts/
│       │   ├── components/
│       │   │   ├── ui/              # Base UI components (Button, Input)
│       │   │   ├── common/          # Shared compound components
│       │   │   ├── forms/           # Form components
│       │   │   ├── layouts/         # Layout components
│       │   │   └── features/        # Feature-specific components
│       │   │       ├── auth/
│       │   │       ├── posts/
│       │   │       └── messages/
│       │   ├── config/              # Runtime config
│       │   ├── constants/           # Constants
│       │   ├── hooks/               # Custom React hooks
│       │   ├── lib/                 # Third-party configs
│       │   ├── providers/           # React Context providers
│       │   ├── services/            # API services
│       │   │   ├── api/             # Axios client + interceptors
│       │   │   ├── auth/
│       │   │   ├── posts/
│       │   │   └── messages/
│       │   ├── stores/              # Zustand stores
│       │   ├── styles/              # Global styles
│       │   ├── types/               # TypeScript types
│       │   └── utils/               # Utilities
│       ├── public/                  # Static public assets
│       └── tests/
│           ├── unit/
│           ├── integration/
│           ├── e2e/
│           └── mocks/
│
├── packages/                         # Shared packages
│   └── shared/                      # Shared code between apps
│       ├── types/                   # TypeScript interfaces
│       ├── constants/               # Shared constants
│       ├── utils/                   # Shared utilities
│       └── schemas/                 # Zod schemas (validation)
│
├── package.json                     # Root workspace
├── pnpm-workspace.yaml              # pnpm workspaces
└── tsconfig.base.json              # Base TypeScript config
```

## 📦 Stack công nghệ

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **ORM**: Prisma 6
- **Real-time**: Socket.io
- **Background Jobs**: BullMQ
- **Logging**: Winston/Pino
- **File Upload**: Multer
- **Validation**: Zod

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
