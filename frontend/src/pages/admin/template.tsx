import { Outlet } from 'react-router'
import { AdminSidebarComp } from '~/components/admin/sidebar'

export const AdminTemplate = () => {
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
