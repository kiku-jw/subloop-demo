# SubLoop Demo

**SubLoop** — demo version of a subscription tracker for companies. Analyzes subscriptions, classifies them by activity, and provides recommendations for cost optimization.

🌐 **Live Demo:** [https://kiku-jw.github.io/subloop-demo/](https://kiku-jw.github.io/subloop-demo/)

## What is it?

SubLoop helps companies:
- 📊 Track all subscriptions in one place
- 🔍 Classify subscriptions by activity (ACTIVE / SEMI_DEAD / DEAD)
- 💡 Get optimization recommendations (KEEP / DOWNGRADE / CANCEL)
- 💰 Calculate potential savings

## Features

### Subscription Classification

- **ACTIVE** — high usage, subscription is actively used
- **SEMI_DEAD** — low usage, consider downgrading plan/number of seats
- **DEAD** — no activity for extended period, recommended to cancel

### Recommendations

- **KEEP** — leave as is
- **DOWNGRADE** — reduce number of seats or switch to cheaper plan
- **CANCEL** — cancel subscription

### Savings Calculation

Automatic calculation of potential savings:
- Monthly savings
- Yearly savings
- Number of recommendations

## Technologies

- **Vue 3** (Composition API)
- **Vite** — project build tool
- **CSS Variables** — dark theme in shadcn style
- **GitHub Pages** — hosting

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/        # Vue components
│   ├── SummaryCard.vue
│   ├── StatusBadge.vue
│   ├── RecommendationBadge.vue
│   └── SubscriptionTable.vue
├── views/            # Pages
│   └── Dashboard.vue
├── data/             # Mock data
│   └── subscriptions.json
├── utils/            # Business logic
│   ├── classifier.js
│   └── i18n.js
└── styles/           # Styles
    ├── theme.css
    └── components.css
```

## Classification Algorithm

Classification is based on activity thresholds:

- **ACTIVE**: activity ≥ 100 events per period
- **SEMI_DEAD**: activity 1-50 events per period
- **DEAD**: no activity ≥ 3 months

Recommendations are generated based on status and user activity.

## Internationalization

The demo supports two languages:
- **Russian** (default)
- **English**

Language can be switched using the RU/EN buttons in the header. Selection is saved in localStorage.

## GitHub Pages

Project is configured for deployment on GitHub Pages:
- Build output to `/docs` folder
- Base path: `/subloop-demo/`
- Automatic deployment via GitHub Actions on push to `main`

### Setting up GitHub Pages (one-time)

1. Go to **Settings** → **Pages** in the repository
2. In the **Source** section, select:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` → `/docs`
3. Save settings

After setup, the site will be available at: `https://kiku-jw.github.io/subloop-demo/`

**Note:** GitHub Actions workflow will automatically deploy changes on each push to `main`.

## License

MIT

## Status

This is a demo version to test market demand. Full version with backend will be developed if there's interest.

---

**Note:** All data in the demo is mock data and is used only for demonstration purposes.
