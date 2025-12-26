
export const USER_ROLES = {
  ADMIN: 'admin',
  AUTHOR: 'author',
  CUSTOMER: 'customer'
}as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export interface User {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
  token?: string;
}

export interface Category {
  id: number;
  name: string;
  books_count?: number; 
}

export interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  category?: Category;
  author_id: number;
  author?: User;
}

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled'
}as const;
export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

export interface Order {
  id: number;
  user_id: number;
  payment_method_id: number;
  total: number;
  status: OrderStatus;
  created_at: string;
  user?: User;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  book_id: number;
  quantity: number;
  price: number;
  book?: Book;
}

export interface PaymentMethod {
  id: number;
  name: string;
  code: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number;
  };
}
