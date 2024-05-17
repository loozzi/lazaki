export default {
  client: {
    home: '/',
    template: '/',
    account: '/account',
    detail: '/detail/:permalink',
    cart: '/cart',
    purchase: '/purchase',
    search: '/search',
    auth: '/auth'
  },
  admin: {
    home: '/admin',
    login: '/admin/login',
    order: '/admin/orders',
    overview: '/admin/overview',
    users: '/admin/users',
    product: '/admin/products',
    productDetail: '/admin/products/:slug',
    category: '/admin/categories',
    logout: '/admin/logout'
  }
}
