import { Route, Routes, useLocation } from 'react-router'
import routes from './configs/routes'
import { HomePage } from './pages/client/home'
import { TemplateClientPage } from './pages/client/template'
import { ViewDetailPage } from './pages/client/detail'
import { ViewCartPage } from './pages/client/cart'
import { ViewPurchasePage } from './pages/client/payment'
import { ViewSearchPage } from './pages/client/search'
import { ViewAuthPage } from './pages/client/auth'
import { ViewAccountPage } from './pages/client/account'
import { ViewAdminLoginPage } from './pages/admin/login'

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
    </Routes>
  )
}

export default App
