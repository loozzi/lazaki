import { NextUIProvider } from '@nextui-org/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import App from '~/App'
import { history } from '~/configs/history'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </HistoryRouter>
  </React.StrictMode>
)
