# TP06 — Playwright E2E (Sauce Demo)

End-to-end tests for [https://www.saucedemo.com](https://www.saucedemo.com) per `TP06Infrastructure`.

## Setup

```bash
cd playwright-saucedemo
npm install
npx playwright install
```

## Run tests

```bash
npm test
npm run test:chromium          # chromium only
npm run test:multi             # chromium + firefox (Challenge 4)
npm run test:headed            # headed + trace on
npm run report                 # open HTML report after a run
```

Credentials: `standard_user` / `secret_sauce` (from the login page).
