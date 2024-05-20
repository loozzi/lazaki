import {
  Badge,
  Button,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react'
import { CiLogout, CiShoppingCart, CiUser } from 'react-icons/ci'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import assets from '~/assets'
import { history } from '~/configs/history'
import routes from '~/configs/routes'
import { SearchInputHeaderComp } from './search-input'
import { useAppSelector } from '~/app/hook'
import { selectCart } from '~/hooks/order/order.slice'
import { useEffect } from 'react'
import { selectIsAuthenticated } from '~/hooks/auth/auth.slice'

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
      <NavbarBrand onClick={() => history.push(routes.client.home)} className='cursor-pointer'>
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
        <NavbarItem className='lg:flex'>
          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger>
                <Button color='primary' variant='flat' startContent={<CiUser size={24} />} className='mr-2'>
                  Tài khoản
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className='flex flex-col items-start py-2'>
                  <Button
                    color='primary'
                    variant='light'
                    startContent={<CiUser size={24} />}
                    fullWidth
                    className='flex justify-start'
                    as={Link}
                    to={routes.client.account}
                  >
                    Thông tin tài khoản
                  </Button>
                  <Button
                    color='primary'
                    variant='light'
                    startContent={<CiLogout size={24} />}
                    fullWidth
                    className='flex justify-start'
                    as={Link}
                    to={routes.client.signOut}
                  >
                    Đăng xuất
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
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
          <Button
            as={Link}
            color='primary'
            to={routes.client.cart}
            variant='light'
            startContent={
              isAuthenticated ? (
                <Badge content={cart?.orderDetails.length.toString() || 0} size='md' color='danger'>
                  <CiShoppingCart size={24} />
                </Badge>
              ) : (
                <CiShoppingCart size={24} />
              )
            }
          >
            Giỏ hàng
          </Button>
        </NavbarItem>
        <NavbarItem className='md:mt-3'></NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
