---
description: Setup môi trường clone - browser tool + scaffold dirs
---

# Setup Clone Environment

Chạy 1 lần trước khi dùng `/clone` lần đầu.

## Checklist

### 1. Browser automation tool

User cần 1 trong:
- **Chrome MCP** (khuyến nghị) — Cursor built-in support
- **Playwright MCP** — cross-browser
- **Chrome DevTools MCP** — full DevTools access

Nếu chưa có → hướng dẫn user install tại cursor.com/mcp.

### 2. Base project

Đảm bảo Next.js + Tailwind + shadcn/ui ready:

```bash
pnpm install
pnpm --filter frontend dev  # phải chạy được
pnpm --filter frontend build  # phải pass
```

Nếu thiếu shadcn:
```bash
pnpm --filter frontend dlx shadcn@latest init
```

### 3. Clone dirs

```bash
mkdir -p clone
```

### 4. Python scripts (optional)

Một số recon tasks có thể cần Python:
- Image processing
- Asset download batch

```bash
pip install requests beautifulsoup4 Pillow
```

## Verify

```bash
# Test browser tool
# (manual) Mở Chrome MCP, navigate example.com thành công

# Test build
pnpm --filter frontend build

# Test empty clone dir
ls clone/
```

Sau khi pass → ready cho `/clone <url>`.
