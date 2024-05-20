import { Outlet } from 'react-router'
import { FooterComp } from '~/components/footer'
import { HeaderComp } from '~/components/header'

export const TemplateClientPage = () => {
  return (
    <div className='bg-[#fafafa] min-h-[100vh] flex flex-col'>
      <HeaderComp />
      <div className='max-w-[1280px] mx-auto w-full'>
        <Outlet />
      </div>
      <FooterComp />
      <div className='bg-[#f1f1f1] h-full flex-1'></div>
    </div>
  )
}
