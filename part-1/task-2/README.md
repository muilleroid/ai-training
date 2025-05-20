# FakeStore API E2E Tests

End-to-end tests for the FakeStore API products endpoint.

## Prerequisites

- [Bun](https://bun.sh/) v1.2.9
- [mise](https://mise.jdx.dev/) or [asdf](https://asdf-vm.com/) for version management (optional)

## Setup

If you have mise or asdf installed, the correct Bun version will be automatically used based on the `.tool-versions` file.

Otherwise, make sure you have Bun v1.2.9 installed.

## Running the Tests

To run the tests:

```bash
cd task-2
bun test
```

## Test Details

The tests verify:
- Response code is 200
- Each product has:
  - Non-empty title
  - Positive price
  - Rating less than 5
- Any invalid products are displayed
- Test fails if any invalid products are found
