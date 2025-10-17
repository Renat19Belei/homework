import { IPostService, CreatePostData, UpdatePostData, Post } from "./post.types";
export class PostService implements IPostService {
  private posts: Post[] = [];
  
// let posts = []
  getAllPosts() {
    console.log("Отримємо всі пости");
    return this.posts;
  }

  getPostById(id: number) {
    return this.posts.find((p) => p.id === id);
  }

  createPost(data: CreatePostData) {
    const id = this.posts.length ? this.posts[this.posts.length - 1].id + 1 : 1;
    const newPost: Post = { id, ...data };
    this.posts.push(newPost);
    console.log("Новий пост створено", newPost);
    return newPost;
  }

  updatePost(id: number, data: UpdatePostData) {
    const index = this.posts.findIndex((p) => p.id === id);
    if (index === -1) return undefined;
    this.posts[index] = { ...this.posts[index], ...data };
    console.log("Пост оновлено", this.posts[index]);
    return this.posts[index];
  }

  deletePost(id: number) {
    const before = this.posts.length;
    this.posts = this.posts.filter((p) => p.id !== id);
    const deleted = this.posts.length < before;
    console.log(deleted ? "пост видалено" : "Пост не знайдено");
    return deleted;
  }
}

export const postService = new PostService();
