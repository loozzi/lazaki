import { Route, Routes, useLocation } from 'react-router'
import routes from './configs/routes'
import { HomePage } from './pages/client/home'
import { TemplateClientPage } from './pages/client/template'
import { ViewDetailPage } from './pages/client/detail'
import { ViewCartPage } from './pages/client/cart'

function App() {
  const location = useLocation()
  return (
    <Routes location={location}>
      <Route path={routes.client.template} element={<TemplateClientPage />}>
        <Route path={routes.client.home} element={<HomePage />} />
        <Route path={routes.client.detail} element={<ViewDetailPage />} />
        <Route path={routes.client.cart} element={<ViewCartPage />} />
      </Route>
    </Routes>
  )
}

export default App
