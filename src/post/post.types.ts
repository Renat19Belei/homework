export interface Post {
  id: number;
  title: string;
  content: string;
}

export type CreatePostData = Omit<Post, "id">;
export type UpdatePostData = Partial<Omit<Post, "id">>;
