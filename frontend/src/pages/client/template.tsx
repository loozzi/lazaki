import { Outlet } from 'react-router'
import { HeaderComp } from '~/components/header'

export const TemplateClientPage = () => {
  return (
    <div className='bg-[#f5f5fa]'>
      <HeaderComp />
      <div className='max-w-[1280px] mx-auto'>
        <Outlet />
      </div>
    </div>
  )
}
