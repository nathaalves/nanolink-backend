import type { Link } from '@prisma/client';

export type NanoLinkRequestBodyType = Omit<
  Link,
  'id' | 'clicks' | 'createdAt' | 'updatedAt'
>;
