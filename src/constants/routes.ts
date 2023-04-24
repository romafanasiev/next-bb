export const routes = {
  default: {
    root: '/',
    auth: '/auth',
    signUp: '/signUp',
    about: '/about',
    faq: '/faq',
    cart: '/cart',
  },
  users: {
    root: '/users',
  },
  admin: {
    root: '/admin',
    dashboard: '/admin/dashboard',
    mailing: '/admin/mailing',
    update: '/admin/update',
    upload: '/admin/upload',
  },
} as const;
