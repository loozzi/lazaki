import { Button, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import { CiShoppingCart, CiUser } from 'react-icons/ci'
import assets from '~/assets'
import routes from '~/configs/routes'
import { SearchInputHeaderComp } from './search-input'

export const HeaderComp = () => {
  const suggestions = [
    { label: 'Điện thoại', slug: '#' },
    { label: 'Máy tính bảng', slug: '#' },
    { label: 'Laptop', slug: '#' },
    { label: 'Điều hòa', slug: '#' }
  ]

  return (
    <Navbar isBordered className='h-24 '>
      <NavbarBrand>
        <Image src={assets.lazaki} />
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-6 w-full max-w-[520px]' justify='center'>
        <NavbarItem className='w-full'>
          <SearchInputHeaderComp />
          <NavbarItem className='hidden md:flex mt-2'>
            {suggestions.map((sg) => (
              <Link className='mr-2' href={sg.slug} showAnchorIcon>
                {sg.label}
              </Link>
            ))}
          </NavbarItem>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify='end' className='flex-col'>
        <NavbarItem className='lg:flex'>
          <Button
            as={Link}
            href={routes.client.account}
            color='primary'
            variant='flat'
            startContent={<CiUser size={24} />}
            className='mr-2'
          >
            Tài khoản
          </Button>
          <Button as={Link} color='primary' href='#' variant='light' startContent={<CiShoppingCart size={24} />}>
            Giỏ hàng
          </Button>
        </NavbarItem>
        <NavbarItem className='md:mt-3'></NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
