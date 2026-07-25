---
description: Create new React components theo project conventions
---

# Create New Component

Khi tạo component mới, follow flow này:

## Step 1: Determine location
- **Base UI** (Button, Input, Card) → `components/ui/<name>.tsx`
- **Shared compound** (Modal, Dropdown) → `components/common/<name>.tsx`
- **Form** (LoginForm) → `components/forms/<name>.tsx`
- **Layout** (Header, Sidebar) → `components/layouts/<name>.tsx`
- **Feature-specific** (PostCard trong posts feature) → `components/features/<feature>/<name>.tsx`

## Step 2: Determine Server vs Client
- Default Server Component
- Add `'use client'` nếu cần:
  - useState, useEffect, useRef
  - Event handlers (onClick, onChange)
  - Browser APIs
  - Zustand stores, Context
  - Custom hooks sử dụng client features

## Step 3: Component Template
```tsx
'use client'; // Nếu cần

import { type FC } from 'react';
import { cn } from '@/lib/cn';

interface ComponentNameProps {
  // props với JSDoc
  className?: string;
}

export const ComponentName: FC<ComponentNameProps> = ({ className }) => {
  return (
    <div className={cn('base-classes', className)}>
      {/* content */}
    </div>
  );
};
```

## Step 4: Checklist
- [ ] Props have TypeScript interface
- [ ] Default values cho optional props
- [ ] `cn()` cho className merging
- [ ] Accessibility (aria-*, semantic HTML)
- [ ] Responsive (mobile-first)
- [ ] Export named (không default) trừ page/layout
