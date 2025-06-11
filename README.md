# xFlair V2 (new name tbt)

> **This repository contains my version of the original xFlair project, rebuilt as a personal project.**

## Project Overview
This project (originally called xflair), provides a user-friendly web interface built with Next.js to visualize the internal workings of an AI model as it processes images. It coordinates a Python backend service using TensorFlow to handle tasks like image preprocessing, making predictions, and generating step-by-step visualizations (like heatmaps and feature maps). These generated visuals and input images are managed using cloud storage before being displayed to the user in the frontend, with the entire system orchestrated by Docker Compose.

- **Original Project:** [oslabs-beta/xflair](https://github.com/oslabs-beta/xflair)
- **Tweaked by:** [Me](https://github.com/devincarrick)

## What's New / Improvements
- [x] Next.js Refactor: Migrated from next/head to the Metadata API in the app directory, following best practices for server/client component separation.
- [x]Client/Server Component Split: Refactored the root layout to use a server component for metadata and a new ClientLayout.tsx for all interactive logic (state, sidebar, etc.).
- [x] API Route Refactor: All backend API route files now use environment variables for host/port, eliminating hardcoded URLs.

## Getting Started

### Prerequisites
- [ ] Node.js (version >= v18.x)
- [ ] Docker (optional, for Docker Compose workflows)
- [ ] AWS Account (S3 Storage)
- [ ] Python 3.12

### Installation
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) to view the app.

### Docker Usage
#### Development
Start:
```bash
docker compose -f docker-compose-dev.yml up
```
Stop: 
```bash
docker compose -f docker-compose-dev.yml down
```
Rebuild:
```bash
docker compose -f docker-compose-dev.yml up --build
```
#### Production
```bash
docker compose -f docker-compose-prod.yml up --build
```
#### TensorBoard (ML Model Visualization)
```bash
docker compose -f docker-compose-tensorboard.yml up --build
```

## Environment Variables
This project uses environment variables for API keys and secrets. Copy `.env.example` to `.env.local` and fill in your values.

## Running End-to-End (E2E) Tests

This project uses [Cypress](https://www.cypress.io/) for E2E testing.

### Run all tests (headless)
```bash
npx cypress run
```

### Run a specific test file
```bash
npx cypress run --spec "cypress/e2e/image-upload.cy.ts"
```

### Open Cypress interactive UI
```bash
npx cypress open
```
Then select your desired test from the list.

### Notes
- Test files are located in `cypress/e2e/`.
- Fixtures (test files/data) are in `cypress/fixtures/`.

## Acknowledgments
- [Charlie Schubach](https://github.com/SchubyTuesday)
- [Ethan Skalski](https://github.com/ethan-skalski)
- [Jimmy Ho](https://github.com/jimmyho95)

## License
MIT

