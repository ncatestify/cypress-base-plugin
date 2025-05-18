# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build, Lint & Test Commands
- Build: `npm run build`
- Lint: `npm run lint`
- Format: `npm run format`
- Type check: `npm run typecheck`
- Run tests: `npm test`
- Run single test: `npm test -- -t 'test name'`
- Cypress open: `npm run cy:open`
- Cypress run: `npm run cy:run`

## Code Style Guidelines
- Use TypeScript for all new code
- Follow Cypress best practices from official documentation
- Use ESLint with standard-with-typescript config
- Prettier for code formatting
- Use meaningful custom command names prefixed with 'tt'
- Write Jest tests for utility functions
- Follow TypeScript strict mode guidelines
- Avoid using @ts-ignore or @ts-nocheck