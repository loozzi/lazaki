import { Route, Routes, useLocation } from 'react-router'
import { HomePage } from './pages/client/home'
import { TemplateClientPage } from './pages/client/template'
import routes from './configs/routes'

function App() {
  const location = useLocation()

  return (
    <div className='root'>
      <Routes location={location}>
        <Route path={routes.client.template} element={<TemplateClientPage />}>
          <Route path={routes.client.home} element={<HomePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
