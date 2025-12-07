# demo-k6

Lightweight demo repository showing k6 performance test scripts bundled with Webpack and helper utilities.

## Purpose
This repo demonstrates how to:
- Bundle k6 ES modules and helper utilities with Webpack.
- Run simple local test server for end-to-end testing.
- Execute k6 smoke and stress tests against the demo server.
- Package test assets (CSV, helper JS) for use in k6 scripts.

## Repository layout
- src/
  - index.js — Express test server exposing /demo (server used for local testing).
  - smoke_test.js — k6 smoke test script.
  - stress_test.js — k6 stress test script.
  - makefile, makefile.json — local orchestration targets (optional).
- assets/
  - js/helper.js — shared helper functions used by k6 scripts.
  - accounts.csv — example test data.
- webpack.config.js — Webpack build config. Entry automates picking up *_test.js under src for bundling.
- package.json — scripts and dependencies.

## Prerequisites
- Node.js (>= 18 recommended)
- npm
- k6 (for running k6 scripts; optional if only building bundles)

## Quick start (local)
1. Install dependencies
   ```sh
   npm install
   ```
2. Start demo server (in one terminal)
   ```sh
   node src/index.js
   ```
   Server runs at http://localhost:3000 (adjust port in src/index.js if needed).

3. Prepare k6
   ```sh
   make prerequisite
   ```

4. Start smoke test
   ```sh
   cd src &&
   make smoke_test
   ```

5. Start stress test
   ```sh
   cd src &&
   make stress_test
   ```

## Common npm scripts
- npm run build — bundle k6 test scripts with Webpack
- npm run start — start the demo express server (if defined in package.json)
- npm run lint/test — project-specific checks (if configured)

Check package.json for exact scripts used in this repository.

## Webpack notes
- Webpack entry is configured to pick up *_test.js files under src so k6 test scripts can be bundled with shared helpers.
- If Webpack fails with "Module not found: Can't resolve './src'", ensure `src/` exists and contains the expected entry files (e.g., index.js and *_test.js). Either create src/index.js or update webpack.config.js entry to point to the correct entry file.

## Troubleshooting
- "Module not found: Can't resolve './src'": confirm src/ path exists or update webpack entry to a specific file:
  - Create minimal entry:
    ```sh
    mkdir -p src
    printf "console.log('bundle entry');" > src/index.js
    ```
  - Or edit webpack.config.js to point to the actual entry file (e.g., `entry: './assets/js/helper.js'` or `entry: './src/index.js'`).

- k6 runtime errors: ensure bundled output is compatible with k6 (ES modules, no DOM APIs). Use the helper bundle rather than browser-specific code.

## Notes
- Designed as a demo; adapt scripts and server behavior for real tests.
- Keep helper utilities compatible with k6 runtime (no browser globals).

## License
MIT