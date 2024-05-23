import { useEffect } from 'react'
import { history } from '~/configs/history'
import routes from '~/configs/routes'

export const ViewAdminLogoutPage = () => {
  document.title = 'Đăng xuất'
  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem('adminAccessToken')
      history.push(routes.client.home)
    }, 3000)
  }, [])

  return <div>Đăng xuất sau 3s...</div>
}
