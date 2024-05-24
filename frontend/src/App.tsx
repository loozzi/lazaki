import { Route, Routes, useLocation } from 'react-router'
import { routesConfig } from './configs/app.config'
import routes from './configs/routes'
import { AdminTemplate } from './pages/admin/template'
import { TemplateClientPage } from './pages/client/template'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const location = useLocation()
  return (
    <>
      <Routes location={location}>
        <Route path={routes.client.template} element={<TemplateClientPage />}>
          {routesConfig.client.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Route>
        <Route path={routes.admin.home} element={<AdminTemplate />}>
          {routesConfig.admin.map((route) => (
            <Route key={route.path} path={route.path} element={<route.component />} />
          ))}
        </Route>
        {routesConfig.others.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
