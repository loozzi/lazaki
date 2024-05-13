import { Route, Routes, useLocation } from 'react-router'
import routes from './configs/routes'
import { ViewAdminLoginPage } from './pages/admin/login'
import { ViewOverviewPage } from './pages/admin/overview'
import { AdminTemplate } from './pages/admin/template'
import { ViewAccountPage } from './pages/client/account'
import { ViewAuthPage } from './pages/client/auth'
import { ViewCartPage } from './pages/client/cart'
import { ViewDetailPage } from './pages/client/detail'
import { HomePage } from './pages/client/home'
import { ViewPurchasePage } from './pages/client/payment'
import { ViewSearchPage } from './pages/client/search'
import { TemplateClientPage } from './pages/client/template'

function App() {
  const location = useLocation()
  return (
    <Routes location={location}>
      <Route path={routes.client.template} element={<TemplateClientPage />}>
        <Route path={routes.client.home} element={<HomePage />} />
        <Route path={routes.client.detail} element={<ViewDetailPage />} />
        <Route path={routes.client.cart} element={<ViewCartPage />} />
        <Route path={routes.client.purchase} element={<ViewPurchasePage />} />
        <Route path={routes.client.search} element={<ViewSearchPage />} />
        <Route path={routes.client.auth} element={<ViewAuthPage />} />
        <Route path={routes.client.account} element={<ViewAccountPage />} />
      </Route>
      <Route path={routes.admin.login} element={<ViewAdminLoginPage />} />
      <Route path={routes.admin.home} element={<AdminTemplate />}>
        <Route path={routes.admin.overview} element={<ViewOverviewPage />} />
      </Route>
    </Routes>
  )
}

export default App
