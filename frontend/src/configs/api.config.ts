const auth = {
  signIn: '/auth/sign-in',
  refreshToken: '/auth/refresh',
  loginAdmin: '/auth/admin'
}

const admin = {
  root: '/admin',
  user: '/admin/user',
  overview: '/admin/overview',
  product: '/admin/product',
  category: '/admin/category',
  order: '/admin/order',
  review: '/admin/review'
}

const product = {
  suggest: '/product/suggest',
  all: '/product/all',
  search: '/product/search',
  detail: '/product/detail'
}

const category = {
  all: '/category/all'
}

const order = {
  current: '/order/current',
  history: '/order/history',
  detail: '/order/detail',
  update: '/order/update',
  purchase: '/order/purchase',
  add: '/order/add',
  remove: '/order'
}

const payment = {
  root: '/payment',
  confirm: '/payment/confirm'
}

const user = '/user/'

const review = '/review'

const image = '/image/add'

export default {
  auth,
  admin,
  product,
  category,
  order,
  payment,
  user,
  review,
  image
}
