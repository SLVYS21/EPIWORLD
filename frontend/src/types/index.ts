export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  bio?: string;
}

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
  _id: string; // MongoDB ID
  body: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];        // list of user IDs who liked
  dislikes: string[];     // list of user IDs who disliked
  count: {
    likes: number;
    dislikes: number;
    comments: number;
  };
  poster: {
    _id: string;
    name: string;
    email: string;
    profile: {
      updated_at: string;
    };
  };
  flags: string[];
  lost: string;
  updated: boolean;
  __v: number;

  replies?: Comment[];
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
  // category: string;
  image: string;
  isSpecial?: boolean;
}

export type Category = {
  id: string;
  name: string;
  type: string;
};

export type CantineCategory = {
  _id: string;
  name: string;
  description: string;
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

export interface CurrencyValue {
  value: number;
  currency: string;
}

export interface MenuImage {
  _id: string;
  name: string;
  url: string;
  updated_at: string;
}

export interface MenuAdminItem {
  _id: string;
  name: string;
  description: string;
  category: string; // or possibly a Category object if populated
  price: CurrencyValue;
  minPrice: CurrencyValue;
  maxPrice: CurrencyValue;
  images: MenuImage[];
  variants: any[]; // update this if you have a specific structure for variants
  mainpic: number;
  quant: boolean;
  active: boolean;
  stock: number;
  deleted: boolean;
  __v: number;
}

export interface TodaysMenu {
  _id: string;
  date: string;
  plates: Plate[];
  __v: number;
}

export interface Plate {
  _id: string;
  promotion: number;
  first: number;
  finished: boolean;
  menu: Menu;
}

export interface Menu {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: CurrencyValue;
  minPrice: CurrencyValue;
  maxPrice: CurrencyValue;
  variants: (string | null)[];
  images: string[];
  mainpic: number;
  quant: boolean;
  active: boolean;
  stock: number;
  deleted: boolean;
  __v: number;
}

export interface CurrencyValue {
  value: number;
  currency: string;
}

export interface MenuData {
  todaysMenu: TodaysMenu | null;
  menus: MenuAdminItem[];
}
