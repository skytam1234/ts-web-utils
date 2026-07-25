---
description: Debug common errors in full-stack Node.js/React apps
---

# Debugging Workflow

Khi gặp lỗi, follow workflow này:

## Step 1: Read the error
- Copy error message chính xác
- Identify: TypeError, ValidationError, NetworkError, DBError, etc.

## Step 2: Locate
- Stack trace → file:line
- Check git blame để hiểu context
- Check recent changes

## Step 3: Reproduce
- Minimal reproduction
- Identify exact input → output

## Step 4: Common fixes

### "Cannot find module"
- Check `pnpm install`
- Check tsconfig paths
- Check workspace package name

### Prisma errors
- `prisma generate` chưa chạy
- Schema không sync với DB
- Migration chưa apply

### Type errors
- Dùng `unknown` thay `any`
- Check generic constraints
- Update shared types nếu cần

### React hydration mismatch
- Dùng `'use client'` đúng chỗ
- Tránh Date.now()/Math.random() trong render
- Check conditional rendering

## Step 5: Verify
- Run tests
- Run type-check: `pnpm type-check`
- Manual test flow
