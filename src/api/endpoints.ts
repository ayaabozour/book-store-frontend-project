
export const API_ENDPOINTS = {
  auth: {
    login: 'login',
    logout: 'logout',
  },
  categories: {
    list: 'categories',
    store: 'categories',
  },
  books: {
    list: 'books',
    store: 'books',
    update: (id: number) => `books/${id}`,
    delete: (id: number) => `books/${id}`,
  },
  paymentMethods: {
    list: 'payment-methods',
    store: 'payment-methods',
    delete: (id: number) => `payment-methods/${id}`,
  },
  orders: {
    list: 'orders',
    store: 'orders',
  },
  admin: {
    users: {
      authors: 'admin/users/authors',
      customers: 'admin/users/customers',
    }
  }
} as const;
