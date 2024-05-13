import { useState } from 'react'
import { AiFillProduct } from 'react-icons/ai'
import { BiSolidCategory } from 'react-icons/bi'
import { FaHome, FaSignOutAlt, FaUsers } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import routes from '~/configs/routes'
import { SidebarItemComp } from './sidebar-item'
import { SidebarMenu } from './sidebar-menu'

interface AdminSidebarCompProps {
  className?: string
}

export const AdminSidebarComp = (props: AdminSidebarCompProps) => {
  const { className } = props
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <div className={className}>
      <div className='p-4'>
        <SidebarItemComp
          title='Tổng quan'
          icon={<FaHome />}
          to={routes.admin.overview}
          isActive={window.location.href.includes(routes.admin.overview)}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />
        <SidebarMenu title='Quản lý'>
          <SidebarItemComp
            title='Đơn hàng'
            icon={<FaCartShopping />}
            to={routes.admin.order}
            isActive={window.location.href.includes(routes.admin.order)}
            setCollapsed={setCollapsed}
            collapsed={collapsed}
          />
          <SidebarItemComp
            title='Người dùng'
            icon={<FaUsers />}
            to={routes.admin.users}
            isActive={window.location.href.includes(routes.admin.users)}
            setCollapsed={setCollapsed}
            collapsed={collapsed}
          />
          <SidebarItemComp
            title='Sản phẩm'
            icon={<AiFillProduct />}
            to={routes.admin.product}
            isActive={window.location.href.includes(routes.admin.product)}
            setCollapsed={setCollapsed}
            collapsed={collapsed}
          />
          <SidebarItemComp
            title='Danh mục'
            icon={<BiSolidCategory />}
            to={routes.admin.category}
            isActive={window.location.href.includes(routes.admin.category)}
            setCollapsed={setCollapsed}
            collapsed={collapsed}
          />
        </SidebarMenu>
        <SidebarItemComp
          title='Đăng xuất'
          icon={<FaSignOutAlt />}
          to={routes.admin.logout}
          isActive={window.location.href.includes(routes.admin.logout)}
          setCollapsed={setCollapsed}
          collapsed={collapsed}
        />
      </div>
    </div>
  )
}
