# 📊 ShZ Dashboard

A modern, responsive, and feature-based admin dashboard for managing users, orders, products, sales, notifications, and analytics.

Built with **Next.js, TypeScript, Tailwind CSS, Supabase, TanStack Query, shadcn/ui, Chart.js, Framer Motion, and GSAP**, with a focus on scalability, maintainability, accessibility, and clean feature boundaries.


## 📸 Demo


Live Demo: https://shz-fullstack-dashboard.vercel.app/

---

## ✨ Features

### 👥 User Management

* User statistics and overview
* User growth analytics
* Activity charts
* Country-based user demographics
* User management interface

### 🛍️ Orders & Products

* Recent orders overview
* Order management
* Top-performing products
* Product management
* Sales and product statistics

### 💰 Sales & Revenue Analytics

* Monthly sales targets
* Sales performance charts
* Revenue analytics
* Interactive data visualizations
* Business performance metrics

### 🔔 Notifications

* In-app notification management
* Notification status and interactions
* Centralized notification UI

### 🌍 Interactive Maps

* Customer demographics by country
* Interactive geographic visualization
* Country-level data representation

### 🌓 Dark Mode

* Full dark theme support
* Responsive theme-aware components
* Consistent styling across the application

### 🎞️ Rich Animations

* Smooth UI transitions
* Interactive motion effects
* Framer Motion animations
* GSAP-powered interactions

### 🧱 Feature-Based Architecture

* Domain-driven feature modules
* Clear separation of concerns
* Encapsulated components and logic
* Scalable project structure
* Testable feature boundaries

---

## 🧱 Tech Stack

| Layer                    | Technology                               |
| ------------------------ | ---------------------------------------- |
| Framework                | Next.js (App Router)                     |
| Language                 | TypeScript                               |
| Styling                  | Tailwind CSS                             |
| UI Primitives            | shadcn/ui, `@base-ui/react`              |
| State & Data             | TanStack Query                           |
| Backend & Authentication | Supabase                                 |
| Supabase Integration     | `@supabase/supabase-js`, `@supabase/ssr` |
| Charts                   | Chart.js, `react-chartjs-2`              |
| Maps                     | `@react-jvectormap`                      |
| Animations               | Framer Motion, GSAP                      |
| Forms                    | React Hook Form                          |
| Validation               | Zod                                      |
| Testing                  | Vitest, Testing Library                  |
| Package Manager          | npm                                      |

For the complete dependency list, see [`package.json`](./package.json).

---

## 📁 Project Structure

The project follows a **feature-based architecture**.

Each major application domain lives inside `src/features/` and contains its own components, hooks, API clients, types, utilities, and public exports.

```text
src/
├── app/                         # Application entry point and routes
│
├── components/                  # Reusable application-wide components
│
├── features/                    # Feature modules
│   ├── auth/                    # Authentication
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   ├── dashboard/               # Dashboard metrics, charts and maps
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   ├── orders/                  # Orders management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   ├── users/                   # Users management
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── api/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts
│   │
│   └── <feature>/               # Additional feature modules
│       ├── components/          # Feature-scoped React components
│       ├── hooks/               # Feature-specific custom hooks
│       ├── api/                 # Data fetching and API clients
│       ├── types/               # TypeScript types and DTOs
│       ├── utils/               # Feature-specific utilities
│       └── index.ts             # Public feature API
│
├── shared/                      # Cross-feature components, hooks and utilities
│
├── lib/                         # Project-wide helpers and libraries
│
├── database/
│   └── csv/                     # Sample CSV data
│
└── tests/                       # Test setup and feature tests
```

### Why Feature-Based Architecture?

The feature-based structure keeps related code together and makes the application easier to scale.

* 🧑‍💻 **Easier onboarding** — developers can focus on one domain at a time.
* 📦 **Better encapsulation** — feature internals remain isolated.
* 🧪 **Simpler testing** — features can be tested independently.
* 🔧 **Easier maintenance** — changes remain localized to the relevant domain.
* 📈 **Better scalability** — new features can be added without restructuring the entire application.

### Adding a New Feature

1. Create a new directory:

```text
src/features/<feature-name>/
```

2. Add only the folders required by the feature:

```text
components/
hooks/
api/
types/
utils/
index.ts
```

3. Export the feature's public API through:

```text
src/features/<feature-name>/index.ts
```

4. Add tests under:

```text
src/tests/features/<feature-name>/
```

### Feature Boundary Rules

> ⚠️ **Avoid direct imports between feature modules.**

If functionality is shared by multiple features, move it into an appropriate shared location such as:

```text
src/shared/
src/components/
src/lib/
```

This keeps feature modules loosely coupled and easier to maintain.

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed on your machine:

* **Node.js 18.18+**
* **Node.js 20 LTS** recommended
* npm, Yarn, or pnpm
* A Supabase project

You can verify your Node.js version with:

```bash
node -v
```

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/amirshekarrizdev99-dev/ShZ-Fullstack-Dashboard.git
```

#### 2. Navigate to the project

```bash
cd ShZ-Fullstack-Dashboard
```

#### 3. Install dependencies

Using npm:

```bash
npm install
```

Or using Yarn:

```bash
yarn install
```

Or using pnpm:

```bash
pnpm install
```

#### 4. Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then update `.env.local` with your Supabase credentials.

See [Environment Variables](#-environment-variables) for more information.

#### 5. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

🎉 You can now open the dashboard in your browser.

---

## 📜 Available Scripts

| Command            | Description                                  |
| ------------------ | -------------------------------------------- |
| `npm run dev`      | Start the development server with hot reload |
| `npm run build`    | Create an optimized production build         |
| `npm start`        | Start the production server                  |
| `npm run lint`     | Run ESLint                                   |
| `npm run test`     | Run tests in watch mode                      |
| `npm run test:run` | Run the complete test suite once             |
| `npm run test:ui`  | Open the Vitest UI                           |

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

### Testing

```bash
npm run test
```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

```env
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
```

### Variables

| Variable            | Description                       |
| ------------------- | --------------------------------- |
| `SUPABASE_URL`      | URL of your Supabase project      |
| `SUPABASE_ANON_KEY` | Supabase anonymous/public API key |

> ⚠️ **Security:** Never commit `.env.local` or expose private credentials in the repository.

The `.env.local` file should already be excluded through `.gitignore`.

---

## 🧪 Testing

The project uses **Vitest** and **Testing Library** for automated testing.

### Run Tests in Watch Mode

```bash
npm run test
```

Useful during development because tests automatically re-run when related files change.

### Run Tests Once

```bash
npm run test:run
```

Recommended for CI environments and pre-commit checks.

### Open Vitest UI

```bash
npm run test:ui
```

### Testing Guidelines

* Place feature-specific tests under:

```text
src/tests/features/<feature>/
```

* Test hooks and utilities independently.
* Use Testing Library for component tests.
* Assert real user-facing DOM behavior instead of implementation details.
* Mock external network requests and Supabase interactions when appropriate.
* Keep tests deterministic and fast.
* Add or update tests when introducing new behavior.

---

## 📥 Sample Data

Sample CSV files are available in:

```text
src/database/csv/
```

These files can be used during development for local data seeding, testing, and prototyping.

---

## ✅ Code Quality

The project uses **ESLint** to maintain consistent code quality.

Run linting with:

```bash
npm run lint
```

### Recommended Development Practices

* Keep feature boundaries clean.
* Prefer TypeScript types over untyped JavaScript.
* Keep components small and focused.
* Avoid unnecessary global state.
* Reuse shared UI and utilities when appropriate.
* Keep feature-specific logic inside its feature module.
* Add tests for new functionality.
* Avoid unnecessary dependencies.
* Run linting and tests before opening a pull request.

### Before Committing

Run:

```bash
npm run lint
npm run test:run
npm run build
```

All commands should complete successfully before submitting significant changes.

---

## 🚢 Deployment

### Recommended Platform

**Vercel** is the recommended deployment platform because the project is built with Next.js and can be deployed with minimal configuration.

### Deployment Checklist

Before deploying:

* [ ] Configure all required environment variables.
* [ ] Verify Supabase credentials.
* [ ] Run `npm run lint`.
* [ ] Run `npm run test:run`.
* [ ] Run `npm run build`.
* [ ] Confirm production authentication works.
* [ ] Confirm Supabase connectivity.
* [ ] Make sure no secrets are committed to the repository.

### Production Build

To verify the production build locally:

```bash
npm run build
npm start
```

The application should then be available at:

```text
http://localhost:3000
```

### Alternative Deployment Platforms

The application can also be deployed to other platforms that support Next.js, such as:

* Netlify
* Custom Node.js hosting
* Other platforms supporting Next.js applications

---

## 🔍 Troubleshooting

### Node.js Version Mismatch

If you encounter dependency or build errors, first verify your Node.js version:

```bash
node -v
```

Use **Node.js 18.18+**, with **Node.js 20 LTS** recommended.

If dependencies appear corrupted, reinstall them:

```bash
rm -rf node_modules
rm package-lock.json
npm install
```

> On Windows, use the equivalent command for your shell or delete `node_modules` and `package-lock.json` manually.

---

### Supabase Authentication or Connection Errors

Check that your `.env.local` contains the correct values:

```env
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<your-anon-key>
```

Then restart the development server:

```bash
npm run dev
```

Environment variable changes generally require restarting the development server.

---

### Tailwind Styles Are Not Applying

If styles are missing:

1. Stop the development server.
2. Verify your Tailwind configuration.
3. Confirm the relevant source files are included in the Tailwind content configuration.
4. Restart the development server.

```bash
npm run dev
```

---

### Build Errors

Run the production build locally to reproduce the issue:

```bash
npm run build
```

Then check:

* TypeScript errors
* ESLint errors
* Missing environment variables
* Invalid imports
* Server/client component boundaries
* Supabase configuration

---

## 🤝 Contributing

Contributions are welcome.

### 1. Fork the Repository

Create your own fork of the project.

### 2. Create a Feature Branch

```bash
git checkout -b feat/amazing-feature
```

Use a descriptive branch name, for example:

```text
feat/user-filters
fix/order-table
refactor/dashboard-charts
test/auth-hooks
```

### 3. Make Your Changes

Keep changes focused and respect the existing feature-based architecture.

### 4. Run Quality Checks

Before submitting your changes:

```bash
npm run lint
npm run test:run
npm run build
```

### 5. Commit Your Changes

Use a clear and descriptive commit message:

```bash
git commit -m "feat: add user filtering"
```

### 6. Push Your Branch

```bash
git push origin feat/amazing-feature
```

### 7. Open a Pull Request

Create a pull request describing:

* What changed
* Why the change was needed
* How it was tested
* Any potential breaking changes

### Contribution Guidelines

* Keep changes focused on a single feature or concern.
* Follow the existing project architecture.
* Avoid unnecessary dependencies.
* Add or update tests for new behavior.
* Keep feature boundaries clean.
* Do not commit secrets or environment files.
* Ensure linting, tests, and production builds pass.

For larger architectural changes, open an issue first and describe the proposed approach before implementation.


---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

Thank you for checking out **ShZ Dashboard**! 🚀
