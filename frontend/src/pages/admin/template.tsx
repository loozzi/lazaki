import { Outlet } from 'react-router'
import { AdminSidebarComp } from '~/components/admin/sidebar'

export const AdminTemplate = () => {
  return (
    <div className='grid grid-cols-12'>
      <div className='lg:col-span-3 md:col-span-4 col-span-2'>
        <AdminSidebarComp className='border-r-1 h-[100vh]' />
      </div>
      <div className='lg:col-span-9 md:col-span-8 col-span-10'>
        <Outlet />{' '}
      </div>
    </div>
  )
}
