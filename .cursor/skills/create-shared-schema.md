---
description: Reusable Zod schemas for BE/FE validation
globs: ["packages/shared/schemas/**/*.ts"]
---

# Zod Schemas (Shared)

Khi tạo schema cho validation dùng chung giữa Backend và Frontend:

## Pattern
```typescript
import { z } from 'zod';

// Schema cho API request
export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(2).max(50),
});

// Export type tự động
export type CreateUserDTO = z.infer<typeof CreateUserSchema>;
```

## Conventions
- Schema names: `<Entity><Action>Schema` (e.g., `CreatePostSchema`, `UpdateProfileSchema`)
- Use `.strict()` để reject unknown keys
- Custom error messages bằng tiếng Anh
- Reuse schemas: `RegisterSchema = LoginSchema.extend({ name: z.string() })`
