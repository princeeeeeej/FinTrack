# Architecture

## Component Hierarchy

```
App
└── Layout
    ├── Sidebar (nav items from constants)
    └── Main Area (hash-based routing)
        ├── DashboardPage
        │   ├── Header
        │   ├── OverviewStats → HealthCard ×4
        │   └── TransactionsChart (AreaChart)
        ├── TransactionsPage
        │   ├── Header
        │   └── TransactionsSummary
        │       ├── StatCard ×3
        │       └── TransactionsTable → Pagination
        └── InsightsPage
            ├── Header
            ├── MonthlySavingsChart (AreaChart)
            ├── CategoryExpensesChart (BarChart)
            ├── IncomeExpensesChart (BarChart)
            └── InsightCard ×N
```

## State Management — Recoil

Four atoms manage global state:

| Atom | Type | Purpose |
|---|---|---|
| `activePageAtom` | `string` | Current page (hash-based routing) |
| `mobileMenuOpenStateAtom` | `boolean` | Sidebar open/closed state |
| `darkModeAtom` | `boolean` | Dark mode toggle |
| `userAtom` | `UserRole` | Admin/user role |

## Data Flow

```
initialData.ts → localStorage (on first load)
                      ↓
              services/api.ts (async CRUD)
                      ↓
            hooks/useTransactionData (fetch + compute)
                      ↓
        Derived data: monthlyChartData, summary,
        overviewStats, overviewChanges, categoryData
                      ↓
              Components consume via hook
```

### Storage Layer

- `services/storage.ts` — Generic localStorage read/write helpers
- `services/api.ts` — Domain-specific CRUD operations with simulated async delay
- Data is initialized from `data/initialData.ts` on first visit
- Export/import via JSON for data backup

### Custom Hooks

| Hook | Responsibility |
|---|---|
| `useTransactionData` | Central data hook — fetches, computes all derived statistics |
| `useInsights` | Generates prioritized financial insights from transaction data |
| `useDarkMode` | Dark mode toggle with localStorage persistence |
| `usePageNavigation` | Hash-based routing with browser back/forward support |

## Key Design Decisions

### Hash-Based Routing
Instead of React Router, navigation uses `window.location.hash`. This keeps the app as a single HTML file, ideal for static hosting (GitHub Pages) with no server-side routing required.

### LocalStorage as Backend
The API service simulates async behavior (`delay()`) so the codebase can be swapped to a real backend (fetch/Supabase) by only modifying `services/api.ts`.

### Domain-Based Component Organization
Components are grouped by feature domain (`dashboard/`, `transactions/`, `insights/`) rather than by type (`buttons/`, `cards/`). This makes it easy to find related files and supports independent development of features.

### Centralized Types
All TypeScript interfaces live in `types/index.ts`. Component prop types are defined alongside domain types, ensuring a single source of truth.

### Constants Extraction
Magic values (month names, storage keys, nav items, pagination limits, chart colors) are centralized in `constants/index.ts` to prevent scattered hardcoded values.
