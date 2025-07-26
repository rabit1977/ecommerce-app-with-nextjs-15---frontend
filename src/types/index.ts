export interface Comment {
  author: string;
  text: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  comments: Comment[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
    email: string;
    name: string;
}