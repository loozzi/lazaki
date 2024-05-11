import { Image, Link } from '@nextui-org/react'
import assets from '~/assets'

interface IFooterItem {
  title: string
  href: string
}

interface IFooterCol {
  title: string
  items: IFooterItem[]
}

const ColComp = ({ title, items }: IFooterCol) => {
  return (
    <div className='lg:mt-3'>
      <div className='font-bold capitalize text-2xl mb-2'>{title}</div>
      <ul className='flex flex-col'>
        {items.map((item, index) => (
          <Link href={item.href} key={index} color='foreground'>
            {item.title}
          </Link>
        ))}
      </ul>
    </div>
  )
}

export const FooterComp = () => {
  return (
    <div className='bg-[#f1f1f1] mt-4 pb-4 px-2'>
      <div className='max-w-[1280px] mx-auto py-8 grid lg:grid-cols-5 md:grid-cols-2 sm:grid-cols-1 gap-2'>
        <div>
          <Image src={assets.lazaki} width={100} /> Lazaki - ứng dụng mua sắm trực tuyến thú vị, tin cậy, an toàn và
          miễn phí! Lazaki là nền tảng giao dịch trực tuyến hàng đầu ở Việt nam. Với sự đảm bảo của Lazaki, bạn sẽ mua
          hàng trực tuyến an tâm và nhanh chóng hơn bao giờ hết!
        </div>
        <ColComp
          title='Công ty'
          items={[
            { title: 'Giới thiệu', href: '#' },
            { title: 'Tuyển dụng', href: '#' },
            { title: 'Tính năng', href: '#' }
          ]}
        />
        <ColComp
          title='Hỗ trợ'
          items={[
            { title: 'Hướng dẫn mua hàng', href: '#' },
            { title: 'Hỗ trợ khách hàng', href: '#' },
            { title: 'Chính sách bảo mật', href: '#' }
          ]}
        />
        <ColComp
          title='Liên hệ'
          items={[
            { title: 'Hotline: 1900 1234', href: 'tel:19001234' },
            { title: 'Email: hotline@lazaki.com', href: 'mailto: hotline@lazaki.com' },
            { title: 'Địa chỉ: 123 Xuân Thủy, CG, HN', href: '#' }
          ]}
        />

        <ColComp
          title='Kết nối'
          items={[
            { title: 'Facebook', href: 'https://facebook.com/lazaki' },
            { title: 'Instagram', href: 'https://instagram.com/lazaki' },
            { title: 'Youtube', href: 'https://youtube.com/lazaki' }
          ]}
        />
      </div>
      <div>
        <div className='text-center text-sm text-slate-400'>
          © 2024 Lazaki. All rights reserved. Designed by{' '}
          <Link href='#' color='foreground'>
            Lazaki Team
          </Link>
        </div>
      </div>
    </div>
  )
}
