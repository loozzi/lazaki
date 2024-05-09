import { Outlet } from 'react-router'
import { HeaderComp } from '~/components/header'

export const TemplateClientPage = () => {
  return (
    <div>
      <HeaderComp />
      <Outlet />
    </div>
  )
}
