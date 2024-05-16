import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'
import { ProductResponse } from '~/models/product'
import { PriceComp } from '../price'

interface CardItemProps {
  item: ProductResponse
  size?: 'sm' | 'md' | 'lg'
}

export const CardItem = (props: CardItemProps) => {
  const { item, size = 'md' } = props

  const sizes = {
    sm: {
      width: 150,
      height: 232
    },
    md: {
      width: 190,
      height: 292
    },
    lg: {
      width: 240,
      height: 368
    }
  }

  const szConfig = sizes[size || 'md']

  return (
    <Card
      shadow='sm'
      className={`w-[${szConfig.width}px] h-[${szConfig.height}px] rounded-md cursor-pointer shadow-lg`}
      isPressable
      as={Link}
      to={routes.client.detail.replace(':permalink', item.slug)}
    >
      <CardBody className='p-0'>
        <Image
          isZoomed
          src={item.image}
          alt={item.name}
          radius='lg'
          width='100%'
          className={`w-full object-cover h-[${szConfig.width}px]`}
        />
      </CardBody>
      <CardFooter>
        <div className='flex-col'>
          <span className='line-clamp-2'>{item.name}</span>
          <div className='flex justify-between items-center'>
            <PriceComp price={item.price} size='sm' color='#338cf1' />
            <span className='text-slate-400 text-sm'>Đã bán {item.sold}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
