<![CDATA[<div align="center">

# 💰 FinTrack

### A Modern Personal Finance Dashboard

Built with React 18 · TypeScript · Recharts · Recoil · Tailwind CSS 4

[Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure)

</div>

---

## 📖 About

**FinTrack** is a feature-rich, single-page personal finance dashboard that helps users track income, expenses, and savings through interactive data visualizations and intelligent financial insights.

The project started with a clear product-thinking approach — I began by defining the **mock data model** and mapping out exactly what each page needed to communicate: total balance, monthly income/expense breakdowns, transaction history, and spending patterns. From there, I designed the full UI in **Figma**, drawing inspiration from modern finance dashboards on **Dribbble**, carefully choosing color palettes, typography, and component spacing before writing a single line of code.

A few highlights from the build process:

- **Recharts** was new to me — I had to learn how to work with custom tooltips, animated active dots, gradient fills with SVG `<defs>`, and responsive chart containers. Translating my Figma designs into working Recharts configurations was one of the more rewarding challenges.
- **LocalStorage as a persistence layer** — without a backend database, I engineered a service layer (`services/api.ts`) that wraps localStorage with async behavior, making the entire data layer **backend-swappable** — you could replace it with a real API (Supabase, REST, GraphQL) by only modifying one file.
- The **`useTransactionData` hook** was the trickiest piece of the application. It serves as the central data nerve — fetching, caching, and deriving all computed statistics (monthly aggregations, category breakdowns, month-over-month change indicators) in a single hook with memoized computations. Getting the derived state right while keeping re-renders minimal required careful dependency management with `useMemo` and `useCallback`.

---

## ✨ Features

### Dashboard Overview
- Four health cards displaying total balance, monthly income, monthly expenses, and net savings
- Month-over-month percentage change indicators with directional trend arrows
- Time-of-day greeting banner with role-based user avatar

### Interactive Data Visualizations
- **Area charts** for earning vs. spending trends with gradient fills, animated active dots, and custom tooltips
- **Bar charts** for category-level expense breakdown and income vs. expenses comparison
- **Savings trend charts** showing monthly savings trajectory over time
- Responsive chart containers that reflow gracefully on all screen sizes

### Transactions Management
- Paginated, sortable transaction table with desktop and mobile layouts
- Mobile card view that replaces the table on small screens for optimal UX
- Full CRUD — edit transactions via modal dialog, delete with confirmation prompt
- Role-based access control: Admin users see edit/delete actions; standard users get a read-only view

### Smart Insights Engine
- **Financial Health Score** (0–100) computed from savings rate, spending stability, and income diversification
- **Spending Velocity Detection** — projects end-of-month expenses from daily burn rate and compares against previous months
- **Savings Rate Analysis** — flags critical, low, and excellent savings rates with actionable recommendations
- Insights are priority-sorted so the most urgent items surface first

### Data Persistence & Portability
- LocalStorage-backed persistence with seed data on first visit
- JSON export/import for full data backup and portability
- One-click data reset to restore initial state

### UX Polish
- Fully responsive layout with collapsible sidebar and mobile hamburger menu
- Dark mode toggle with localStorage persistence and system preference detection
- Hash-based client-side routing with browser back/forward support
- Loading skeletons, empty states, and error boundaries throughout

---

## 🛠 Tech Stack

| Technology | Version | Role |
|---|---|---|
| [React](https://react.dev) | 18.3 | Component architecture & UI rendering |
| [TypeScript](https://typescriptlang.org) | 5.9 | Static type safety across the entire codebase |
| [Tailwind CSS](https://tailwindcss.com) | 4.2 | Utility-first styling with the new CSS-first configuration |
| [Recoil](https://recoiljs.org) | 0.7 | Fine-grained atomic state management |
| [Recharts](https://recharts.org) | 3.8 | Composable, React-native charting library |
| [Lucide React](https://lucide.dev) | 1.7 | Consistent, tree-shakable icon system |
| [Vite](https://vite.dev) | 8.0 | Sub-second HMR and optimized production builds |
| [ESLint](https://eslint.org) | 9.x | Code quality with `react-hooks` and `react-refresh` plugins |

---

## 🏗 Architecture

### Component Hierarchy

```
App
└── RecoilRoot
    └── Layout
        ├── Sidebar (collapsible, hash-based navigation)
        └── Main Content Area
            ├── DashboardPage
            │   ├── Header (greeting + role switcher)
            │   ├── OverviewStats → HealthCard ×4
            │   └── TransactionsChart (AreaChart + toggle)
            ├── TransactionsPage
            │   ├── Header
            │   └── TransactionsSummary
            │       ├── StatCard ×3
            │       └── TransactionsTable
            │           ├── Desktop table view
            │           ├── Mobile card view
            │           ├── Pagination
            │           ├── Edit modal
            │           └── Delete confirmation dialog
            └── InsightsPage
                ├── Header
                ├── MonthlySavingsChart (AreaChart)
                ├── CategoryExpensesChart (BarChart)
                ├── IncomeExpensesChart (BarChart)
                └── InsightCard ×N (priority-sorted)
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  data/initialData.ts  →  services/storage.ts (localStorage)    │
│                                    ↓                            │
│                          services/api.ts (async CRUD layer)     │
│                                    ↓                            │
│                    hooks/useTransactionData (central data hook)  │
│                          ┌─────────┼──────────┐                 │
│                          ↓         ↓          ↓                 │
│                    monthlyChart  summary  categoryData           │
│                    overviewStats  overviewChanges                │
│                          ↓         ↓          ↓                 │
│                        Page components consume derived data     │
└─────────────────────────────────────────────────────────────────┘
```

### State Management (Recoil Atoms)

| Atom | Type | Purpose |
|---|---|---|
| `activePageAtom` | `string` | Hash-based routing — tracks current page |
| `mobileMenuOpenStateAtom` | `boolean` | Controls sidebar open/closed state |
| `darkModeAtom` | `boolean` | Dark mode with localStorage + system preference |
| `userAtom` | `UserRole` | Admin / User role toggle for RBAC |

### Key Design Decisions

| Decision | Rationale |
|---|---|
| **Hash-based routing over React Router** | Keeps the app as a single HTML file, deployable to GitHub Pages or any static host with zero server-side routing configuration |
| **localStorage with async wrappers** | The API layer simulates async delays so the codebase can be swapped to a real backend (REST, Supabase, Firebase) by only modifying `services/api.ts` |
| **Centralized `useTransactionData` hook** | Single source of truth for all derived financial statistics — prevents redundant computation and ensures data consistency across pages |
| **Domain-based component organization** | Components grouped by feature (`dashboard/`, `transactions/`, `insights/`) rather than by type (`buttons/`, `cards/`) for better colocation and independent feature development |
| **Centralized type definitions** | All TypeScript interfaces in `types/index.ts` — single source of truth for the data contract, making refactoring safe and IDE navigation fast |
| **Constants extraction** | Month labels, storage keys, nav items, chart colors, pagination limits — all centralized in `constants/index.ts` to eliminate scattered magic values |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+
- **npm** 9+

### Installation

```bash
git clone https://github.com/your-username/fintrack.git
cd fintrack
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
fintrack/
├── public/                      # Static assets
├── src/
│   ├── components/
│   │   ├── common/              # Shared UI (Pagination)
│   │   ├── dashboard/           # HealthCard, OverviewStats, TransactionsChart
│   │   ├── transactions/        # StatCard, TransactionsSummary, TransactionsTable
│   │   ├── insights/            # InsightCard, ChartTooltip, category/savings/income charts
│   │   ├── layout/              # Layout shell, Sidebar, Header
│   │   └── index.ts             # Barrel exports for clean imports
│   ├── pages/                   # Page-level route components
│   │   ├── DashboardPage.tsx
│   │   ├── TransactionsPage.tsx
│   │   └── InsightsPage.tsx
│   ├── hooks/                   # Custom React hooks
│   │   ├── useTransactionData   # Central data fetching + derived state computation
│   │   ├── useInsights          # Financial insight generation engine
│   │   ├── useDarkMode          # Dark mode toggle with persistence
│   │   └── usePageNavigation    # Hash-based routing with popstate support
│   ├── services/                # Data access layer
│   │   ├── api.ts               # Async CRUD operations (backend-swappable)
│   │   └── storage.ts           # Generic localStorage read/write helpers
│   ├── store/                   # Recoil atom definitions
│   ├── types/                   # Centralized TypeScript interfaces
│   ├── constants/               # App-wide constants and configuration
│   ├── data/                    # Seed data (initial transactions + categories)
│   └── utils/                   # Formatters, helpers, theme utilities
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
└── package.json
```

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check with `tsc` + production build |
| `npm run preview` | Serve and preview the production build |
| `npm run lint` | Run ESLint with React hooks and refresh plugins |

---

## 🧠 Learnings & Challenges

| Area | What I Learned |
|---|---|
| **Recharts** | SVG gradient fills via `<defs>` + `<linearGradient>`, custom tooltip components, animated active dots, and responsive container patterns |
| **LocalStorage persistence** | Designing a generic storage abstraction that initializes with seed data on first visit, supports JSON serialization, and handles storage quota errors gracefully |
| **Custom hooks** | Building `useTransactionData` — a single hook that orchestrates async fetching, exposes CRUD mutations, and computes ~6 derived datasets with memoized performance |
| **Derived state design** | Structuring `useMemo` dependencies so that monthly aggregations, category breakdowns, and MoM change indicators recompute only when their source data changes |
| **Product thinking** | Starting from data model → user stories → Figma mockups → code, rather than jumping straight to implementation |

---

## 📄 License

MIT

]]>
