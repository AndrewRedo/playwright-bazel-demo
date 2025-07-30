# Playwright Bazel Demo

This is a standalone demo showing how to set up Playwright tests with Bazel using `rules_javascript`. This demo is extracted from the internal redo/ workspace and modified to work as a standalone project.

## Key Features

- **Working Example**: Tested and functional Playwright + Bazel setup
- **External Sites Testing**: Tests run against google.com (no backend needed)
- **Public Dependencies**: Uses public `rules_javascript` repository
- **TypeScript Support**: Fully configured TypeScript compilation
- **Clean Structure**: Minimal setup to demonstrate core concepts

## Project Structure

```
playwright-bazel-demo/
├── WORKSPACE.bazel          # Bazel workspace configuration
├── MODULE.bazel             # Bazel module configuration (bzlmod)
├── BUILD.bazel              # Main build file with Playwright test targets
├── package.json             # Node.js dependencies
├── tsconfig.json            # TypeScript configuration
├── playwright.config.ts     # Playwright test configuration
├── tests/                   # Test files directory
│   ├── google.spec.ts       # Tests that interact with google.com
│   └── simple.spec.ts       # Basic assertion tests
└── README.md               # This file
```

## Quick Start

### Prerequisites

- [Bazel](https://bazel.build/install) or [Bazelisk](https://github.com/bazelbuild/bazelisk) installed
- Node.js (managed by Bazel)

### Running Tests

```bash
# Run all Playwright tests
bazel test //:e2e_test

# Run with verbose output
bazel test //:e2e_test --test_output=all

# Run in debug mode (shows browser)
bazel test //:e2e_test --test_output=all --test_env=CI=false
```

## Configuration Details

### WORKSPACE.bazel
- Uses public `rules_javascript` repository from GitHub
- Configured with Node.js version 20.15.1
- Includes minimal dependencies needed for Playwright

### BUILD.bazel
- Uses `playwright_test` rule from `@rules_javascript//playwright:rules.bzl`
- Compiles TypeScript tests using `ts_library`
- Properly configured dependencies for Playwright and Node.js types

### TypeScript Configuration
- Configured for CommonJS module system (required by current Bazel setup)
- Includes proper type definitions for Node.js and Playwright
- Source maps enabled for debugging

### Playwright Configuration
- Configured to run against external sites (no local server needed)
- Includes proper browser settings for both local and CI environments
- Screenshots and videos on failure for debugging

## Test Examples

### google.spec.ts
- Tests basic Google homepage functionality
- Performs search operations
- Demonstrates handling of dynamic content and cookies

### simple.spec.ts  
- Basic assertion tests to verify the testing framework works
- Async operation testing
- String manipulation tests

## Integration with Your Project

To integrate this setup into your existing Bazel workspace:

1. **Copy the configuration files**: Copy `BUILD.bazel`, `playwright.config.ts`, and `tsconfig.json`
2. **Update your WORKSPACE.bazel**: Add the `rules_javascript` dependency if not already present
3. **Add npm dependencies**: Add the Playwright dependencies to your root `package.json`
4. **Create test files**: Add your test files following the same structure

## Differences from Internal Setup

This demo differs from the internal redo/ setup in several ways:

1. **Public Repository**: Uses the public `rules_javascript` instead of `@better_rules_javascript`
2. **Simplified Dependencies**: No internal service dependencies
3. **External Test Targets**: Tests run against google.com instead of internal applications
4. **Minimal Configuration**: Stripped down to essential configuration only
5. **Standalone Structure**: Self-contained without complex internal dependency chains

## Troubleshooting

### Common Issues

1. **Import Errors**: Make sure all dependencies are properly declared in BUILD.bazel
2. **TypeScript Compilation**: Check that tsconfig.json module setting matches BUILD.bazel configuration
3. **Browser Issues**: Ensure headless mode is properly configured for your environment

### Debug Tips

- Use `--test_output=all` to see detailed test output
- Set `CI=false` environment variable to run tests in headed mode
- Check `bazel-testlogs` directory for detailed test results and artifacts

## Extension Ideas

This demo can be extended with:

- More complex page object patterns
- API testing alongside UI tests  
- Visual regression testing
- Performance testing
- Custom test utilities and helpers
- Integration with other external services

## Dependencies

- **@playwright/test**: Playwright testing framework
- **playwright**: Playwright browser automation library
- **@types/node**: Node.js type definitions
- **typescript**: TypeScript compiler

All dependencies are automatically managed by Bazel's npm integration.

## Repository Structure

This demo is part of a larger repository that includes:
- `redo/`: Internal workspace with comprehensive Bazel setup
- `rules_javascript/`: Custom JavaScript/TypeScript rules for Bazel
- `playwright-bazel-demo/`: This standalone demo (you are here)

The internal `redo/playwright-bazel-demo/` contains the source version of this demo integrated with the full workspace dependencies.