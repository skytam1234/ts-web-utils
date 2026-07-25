---
description: Create new Next.js pages (App Router)
---

# Create New Page

Khi tạo page mới trong Next.js App Router:

## Step 1: Determine route group
- **Public auth** → `app/(auth)/<page>/page.tsx`
- **Protected** → `app/(dashboard)/<page>/page.tsx`
- **Public marketing** → `app/(marketing)/<page>/page.tsx`
- **API endpoint** → `app/api/<route>/route.ts`

## Step 2: File structure
```
app/(auth)/login/
├── page.tsx           # Main page component
├── layout.tsx         # Optional layout (if not using group layout)
└── loading.tsx        # Optional loading UI
```

## Step 3: Server Component Page
```tsx
// app/(auth)/login/page.tsx
import { LoginForm } from '@/components/forms/LoginForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </main>
  );
}
```

## Step 4: With data fetching (Server Component)
```tsx
// app/(dashboard)/posts/page.tsx
import { PostService } from '@/services/posts/post.service';
import { PostList } from '@/components/features/posts/PostList';

export default async function PostsPage() {
  const posts = await postService.list();
  return <PostList initialPosts={posts} />;
}
```

## Step 5: Protected page
```tsx
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect('/login');

  return <div>{children}</div>;
}
```

## Checklist
- [ ] Page is Server Component by default
- [ ] Add `metadata` for SEO
- [ ] Move heavy client logic to child components
- [ ] Add loading.tsx for slow pages
- [ ] Add error.tsx for error boundaries
