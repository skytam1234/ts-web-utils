# ts-web-utils

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)

A lightweight, zero-dependency TypeScript utility toolkit designed for modern web applications. It provides type-safe helpers for asynchronous queue management, deterministic data serialization, DOM state synchronization, and resilient network retries.

## Features

- **Zero Dependencies:** Minimal bundle footprint suitable for both browser and edge runtimes.
- **Strict Type Safety:** Built from the ground up with TypeScript generics for predictable type inference.
- **Async Concurrency Control:** Built-in debounce, throttle, and exponential backoff retry wrappers.
- **Safe Data Parsing:** Schema-free defensive JSON and query-string normalizers.

## Installation

```bash
npm install ts-web-utils
# or
pnpm add ts-web-utils
```

## Quick Usage

```typescript
import { withRetry, createAsyncQueue } from './src';

const queue = createAsyncQueue({ concurrency: 3 });

await queue.add(() =>
  withRetry(() => fetch('[https://api.example.com/v1/status](https://api.example.com/v1/status)'), {
    retries: 3,
    backoffMs: 500,
  })
);
```

## Roadmap (2026–2027)

- [ ] Expand unit test coverage across edge-case async race conditions.
- [ ] Migrate legacy helper modules to strict ESM/CJS dual-package builds.
- [ ] Add automated benchmark suite and API documentation generation.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

## License

Distributed under the **MIT License**. See `LICENSE` for more information.
