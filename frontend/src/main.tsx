import { NextUIProvider } from '@nextui-org/react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import App from '~/App'
import { history } from '~/configs/history'
import { store } from './app/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <HistoryRouter history={history}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </HistoryRouter>
  </Provider>
  // </React.StrictMode>
)
