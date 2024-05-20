import { ViewAdminManageCategoryPage } from '~/pages/admin/category'
import { ViewAdminCreateProductPage } from '~/pages/admin/create-product'
import { ViewAdminManageDetailProductPage } from '~/pages/admin/detail-product'
import { ViewAdminLoginPage } from '~/pages/admin/login'
import { ViewAdminOrderPage } from '~/pages/admin/order'
import { ViewOverviewPage } from '~/pages/admin/overview'
import { ViewAdminManageProductPage } from '~/pages/admin/product'
import { ViewAdminManageUserPage } from '~/pages/admin/users'
import { ViewAccountPage } from '~/pages/client/account'
import { ViewAuthPage } from '~/pages/client/auth'
import { ViewCartPage } from '~/pages/client/cart'
import { ViewDetailPage } from '~/pages/client/detail'
import { HomePage } from '~/pages/client/home'
import { ViewPurchasePage } from '~/pages/client/purchase'
import { ViewRatingPage } from '~/pages/client/rating-page'
import { ViewSearchPage } from '~/pages/client/search'
import routes from './routes'
import { ViewAdminLogoutPage } from '~/pages/admin/logout'

const client = [
  { path: routes.client.home, component: HomePage },
  { path: routes.client.detail, component: ViewDetailPage },
  { path: routes.client.cart, component: ViewCartPage },
  { path: routes.client.purchase, component: ViewPurchasePage },
  { path: routes.client.search, component: ViewSearchPage },
  { path: routes.client.auth, component: ViewAuthPage },
  { path: routes.client.account, component: ViewAccountPage },
  { path: routes.client.rating, component: ViewRatingPage }
]

const admin = [
  { path: routes.admin.overview, component: ViewOverviewPage },
  { path: routes.admin.order, component: ViewAdminOrderPage },
  { path: routes.admin.users, component: ViewAdminManageUserPage },
  { path: routes.admin.product, component: ViewAdminManageProductPage },
  { path: routes.admin.productCreate, component: ViewAdminCreateProductPage },
  { path: routes.admin.productDetail, component: ViewAdminManageDetailProductPage },
  { path: routes.admin.category, component: ViewAdminManageCategoryPage },
  { path: routes.admin.logout, component: ViewAdminLogoutPage }
]

const others = [{ path: routes.admin.login, component: ViewAdminLoginPage }]

export const routesConfig = {
  client,
  admin,
  others
}
