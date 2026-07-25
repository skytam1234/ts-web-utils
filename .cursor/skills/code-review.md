---
description: Review code for quality, security, and best practices
---

# Code Review Guidelines

Khi review code (AI tự review hoặc user yêu cầu):

## Checklist

### Correctness
- [ ] Logic đúng
- [ ] Edge cases handled
- [ ] Error handling đầy đủ
- [ ] No race conditions

### Type Safety
- [ ] Không có `any`
- [ ] Return types defined
- [ ] Generics dùng đúng

### Security
- [ ] Input validated (Zod)
- [ ] Auth check đúng
- [ ] No SQL injection (Prisma đã handle)
- [ ] No XSS (sanitize HTML)
- [ ] Secrets không hardcoded

### Performance
- [ ] No N+1 queries
- [ ] Indexes trên columns hay query
- [ ] Pagination cho list APIs
- [ ] Memoization khi cần
- [ ] No unnecessary re-renders

### Maintainability
- [ ] Functions nhỏ, single responsibility
- [ ] DRY - no duplication
- [ ] Clear naming
- [ ] Comments chỉ khi cần

### Tests
- [ ] Unit tests for business logic
- [ ] Integration tests for APIs
- [ ] Edge cases covered

## Output format
Khi review, output theo format:
1. ✅ Good points
2. ⚠️ Suggestions (nice to have)
3. ❌ Critical issues (must fix)
