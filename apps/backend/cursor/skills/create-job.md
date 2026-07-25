---
description: Background jobs với BullMQ
globs: ["apps/backend/src/jobs/**/*.ts"]
---

# Background Jobs (BullMQ)

Khi tạo background job (email, image processing, scheduled tasks):

## Pattern
```typescript
// 1. Define queue
import { Queue } from 'bullmq';

export const emailQueue = new Queue('email', {
  connection: redisConnection,
});

// 2. Add jobs from services
await emailQueue.add('welcome', {
  userId: user.id,
  email: user.email,
});

// 3. Worker xử lý jobs
import { Worker } from 'bullmq';

const worker = new Worker('email', async (job) => {
  switch (job.name) {
    case 'welcome':
      await sendWelcomeEmail(job.data);
      break;
  }
}, { connection: redisConnection });
```

## When to use jobs
- ✅ Sending emails
- ✅ Image/video processing
- ✅ PDF generation
- ✅ Scheduled tasks (cron)
- ✅ Heavy computation
- ❌ Real-time operations (use Socket.io)
- ❌ Simple CRUD (do sync)
