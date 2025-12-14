# SonarCloud Setup

This project now contains a `sonar-project.properties` file with sensible defaults so you can run SonarCloud analysis locally or from CI. Follow the steps below to finish the integration.

## 1. Create the SonarCloud project

1. Sign in to [SonarCloud](https://sonarcloud.io) and create or select your organization.
2. Create a new project (or import the repository) and copy the generated **Project Key** and **Organization Key**.
3. Generate a *project analysis token* with at least *Execute Analysis* rights.

Replace the placeholder values in `sonar-project.properties` with the keys from step 2. Keep the token secret—store it as an environment variable rather than in the file.

## 2. Local analysis

Install the SonarScanner CLI once on your machine (see [the docs](https://docs.sonarcloud.io) for platform-specific installers) or use `npx sonar-scanner` if you prefer a local npm dependency.

```powershell
$Env:SONAR_TOKEN="<your-token>"
sonar-scanner `
  -Dsonar.login=$Env:SONAR_TOKEN
```

Run the command above from the repository root. The scanner reads `sonar-project.properties`, analyzes the `admin/src`, `client/src`, and `server` directories, and uploads the report to SonarCloud.

## 3. CI analysis (example: GitHub Actions)

```yaml
name: SonarCloud

on:
  push:
    branches: [main]
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  sonarcloud:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: |
          npm --prefix admin install
          npm --prefix client install
          npm --prefix server install
      - name: SonarCloud Scan
        uses: SonarSource/sonarcloud-github-action@master
        env:
          SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
```

Store the SonarCloud token in the repository secrets as `SONAR_TOKEN`. The GitHub Action reads the `sonar-project.properties` file and uploads analysis for every push and pull request. Adapt the installation phase to match your package managers or monorepo tooling if needed.

## 4. Coverage (optional)

The configuration file already contains commented `sonar.javascript.lcov.reportPaths` entries. If you add test coverage, update those paths to point to the generated `lcov.info` files and uncomment the line so coverage is pushed to SonarCloud.
