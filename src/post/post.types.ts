import type { Prisma } from "@prisma/client";

export type PostWithTags = Prisma.PostGetPayload<{
  include: {
    tags: {
      include: {
        tag: true
      }
    }
  }
}>;

export interface CreatePostChecked {
  title: string;
  content: string;
  image?: string | null;
  authorId: number;
  categoryId?: number | null;
}

export interface UpdatePostChecked {
  title?: string;
  content?: string;
  image?: string | null;
  authorId?: number;
  categoryId?: number | null;
}
