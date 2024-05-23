import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { AdminSidebarComp } from '~/components/admin/sidebar'
import { history } from '~/configs/history'
import routes from '~/configs/routes'

export const AdminTemplate = () => {
  if (window.location.pathname === '/admin') {
    history.push(routes.admin.overview)
  }

  useEffect(() => {
    const adminAccessToken = localStorage.getItem('adminAccessToken')
    if (!adminAccessToken) {
      history.push(routes.admin.login)
    }
  }, [])

  return (
    <div className='flex bg-sky-50'>
      <div className='md:w-64 w-20'>
        <AdminSidebarComp className='h-[100vh] ' />
      </div>
      <div className='flex-1 m-2 bg-white rounded-lg'>
        <Outlet />{' '}
      </div>
    </div>
  )
}
