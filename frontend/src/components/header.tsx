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
  NavbarItem
} from '@nextui-org/react'
import { useEffect } from 'react'
import { CiUser } from 'react-icons/ci'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { PiShoppingCartSimple } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { useAppSelector } from '~/app/hook'
import assets from '~/assets'
import { history } from '~/configs/history'
import routes from '~/configs/routes'
import { selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { selectCart } from '~/hooks/order/order.slice'
import { SearchInputHeaderComp } from './search-input'

export const HeaderComp = () => {
  const suggestions = [
    { label: 'Điện thoại', slug: '#' },
    { label: 'Máy tính bảng', slug: '#' },
    { label: 'Laptop', slug: '#' },
    { label: 'Điều hòa', slug: '#' }
  ]

  const cart = useAppSelector(selectCart)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <Navbar isBordered className='h-24 w-full justify-center' maxWidth='xl'>
      <NavbarBrand as={Link} to={routes.client.home} className='cursor-pointer'>
        <Image src={assets.lazaki} className='min-w-36 max-w-36' />
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-6' justify='center'>
        <NavbarItem className='w-full'>
          <SearchInputHeaderComp />
          <NavbarItem className='hidden md:flex mt-2'>
            {suggestions.map((sg) => (
              <Link key={sg.label} className='mr-4 flex items-center text-blue-500' to={sg.slug}>
                {sg.label}
                <FaExternalLinkAlt className='ml-1 text-sm' />
              </Link>
            ))}
          </NavbarItem>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className='flex-col justify-end'>
        <NavbarItem className='lg:flex gap-2'>
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
        <NavbarItem className='md:mt-3'></NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
