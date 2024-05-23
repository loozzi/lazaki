import {
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { CiUser } from 'react-icons/ci'
import { FaExternalLinkAlt, FaHome, FaSearch, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6'
import { PiShoppingCartSimple } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { useAppSelector } from '~/app/hook'
import assets from '~/assets'
import routes from '~/configs/routes'
import { selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { selectCart } from '~/hooks/order/order.slice'
import { SearchInputHeaderComp } from './search-input'

export const HeaderComp = () => {
  const suggestions = [
    { label: 'Điện thoại', slug: routes.client.search + '?q=điện thoại' },
    { label: 'Máy tính bảng', slug: routes.client.search + '?q=máy tính bảng' },
    { label: 'Laptop', slug: routes.client.search + '?q=laptop' },
    { label: 'Điều hòa', slug: routes.client.search + '?q=điều hòa' }
  ]

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const cart = useAppSelector(selectCart)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <Navbar isBordered className='h-24 w-full justify-center' maxWidth='xl' onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='md:hidden' />
        <NavbarBrand as={Link} to={routes.client.home} className='cursor-pointer'>
          <Image src={assets.lazaki} className='min-w-36 max-w-36' />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className='hidden lg:flex gap-6' justify='center'>
        <NavbarItem className='w-full'>
          <SearchInputHeaderComp />
          <NavbarItem className='hidden md:flex mt-2'>
            {suggestions.map((sg) => (
              <Link key={sg.label} className='mr-4 flex items-center text-blue-500' to={sg.slug}>
                {sg.label}
                <FaExternalLinkAlt className='ml-1 text-sm' size={8} />
              </Link>
            ))}
          </NavbarItem>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem className='hidden md:flex gap-2 lg:items-start'>
          <Button
            as={Link}
            color='primary'
            to={routes.client.cart}
            variant='light'
            startContent={
              isAuthenticated ? (
                <Badge content={cart?.orderDetails.length.toString() || 0} size='md' color='danger'>
                  <PiShoppingCartSimple size={24} />
                </Badge>
              ) : (
                <PiShoppingCartSimple size={24} />
              )
            }
          >
            Giỏ hàng
          </Button>
          {isAuthenticated ? (
            <Dropdown>
              <DropdownTrigger>
                <Button color='primary' variant='flat' startContent={<CiUser size={24} />}>
                  Tài khoản
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key='account' color='primary'>
                  <Link to={routes.client.account}>Thông tin tài khoản</Link>
                </DropdownItem>
                <DropdownItem key='signout' color='danger'>
                  <Link to={routes.client.signOut}>Đăng xuất</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              as={Link}
              to={routes.client.auth}
              color='primary'
              variant='flat'
              startContent={<CiUser size={24} />}
              className='mr-2'
            >
              Tài khoản
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className='mt-8'>
        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
          <Link to={routes.client.search} className='p-4 border-b-1 border-gray-400 flex items-center gap-2'>
            <FaHome />
            Trang chủ
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
          <Link to={routes.client.search} className='p-4 border-b-1 border-gray-400 flex items-center gap-2'>
            <FaSearch />
            Tìm kiếm sản phẩm
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
          <Link to={routes.client.cart} className='p-4 border-b-1 border-gray-400  flex items-center gap-2'>
            <FaCartShopping />
            Giỏ hàng
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
          <Link to={routes.client.account} className='p-4 border-b-1 border-gray-400  flex items-center gap-2'>
            <FaUser />
            Tài khoản
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
          <Link to={routes.client.signOut} className='p-4 border-b-1 border-gray-400  flex items-center gap-2'>
            <FaSignOutAlt />
            Đăng xuất
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
