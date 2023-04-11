import type { Link } from '@prisma/client';

export type ShortLinkRequestBodyType = Omit<
  Link,
  'id' | 'nanoId' | 'clicks' | 'createdAt' | 'updatedAt'
>;

export type ShortLinkInsertDataType = Omit<
  Link,
  'id' | 'clicks' | 'createdAt' | 'updatedAt'
>;
