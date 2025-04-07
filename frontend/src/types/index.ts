export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
}

// export interface Post {
//   _id: string;
//   // userId: string;
//   loser: { _id: string | null; name: string | null; avatar: string | null; email: string | null };
//   type: 'lost' | 'found';
//   title: string;
//   description: string;
//   images: string[];
//   location: string;
//   category: string;
//   tags: string[];
//   createdAt: string;
//   likes: number;
//   comments: Comment[];
// }

export interface Post {
  _id: string;
  images: { url: string }[];
  category: string;
  description: string;
  name: string;
  position: string;
  status: string;
  loser: { _id: string; name: string; email: string };
  finder: null | any;
  type: 'lost' | 'found';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  likes: number;
  comments: Comment[];
}




export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
  replies: Reply[];
}

export interface Reply {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'reply' | 'message';
  userId: string;
  postId?: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isSpecial?: boolean;
}

export type Category = {
  id: string;
  name: string;
  type: string;
};

export type CartItem = MenuItem & {
  quantity: number;
};


export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  points: number;
  badges: Badge[];
  joinedAt: string;
  questionsCount: number;
  answersCount: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: User;
  votes: number;
  answersCount: number;
  viewsCount: number;
  imageUrl?: string;
}

export interface Answer {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: User;
  questionId: string;
  votes: number;
  isAccepted: boolean;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  author: User;
  parentId: string;  // Can be question ID or answer ID
  parentType: 'question' | 'answer';
}

export type SortOption = 'newest' | 'votes' | 'unanswered';

export interface SearchFilters {
  query: string;
  tags: string[];
  sort: SortOption;
}
