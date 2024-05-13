import { Outlet } from 'react-router'
import { FooterComp } from '~/components/footer'
import { HeaderComp } from '~/components/header'

export const TemplateClientPage = () => {
  return (
    <div className='bg-[#fafafa]'>
      <HeaderComp />
      <div className='max-w-[1280px] mx-auto'>
        <Outlet />
      </div>
      <FooterComp />
    </div>
  )
}
