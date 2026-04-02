export interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  comments?: Comment[];
}

// export type Post = {}
