import { Card, CardBody, CardFooter, Image, Skeleton } from '@nextui-org/react'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'
import { ProductResponse } from '~/models/product'
import { PriceComp } from '../price'

interface CardItemProps {
  item: ProductResponse
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const CardItem = (props: CardItemProps) => {
  const { item, size = 'md', loading } = props

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

  if (loading)
    return (
      <Card
        shadow='sm'
        className={`w-[${szConfig.width}px] h-[${szConfig.height}px] rounded-md cursor-pointer shadow-lg`}
        isPressable
      >
        <CardBody className='p-0'>
          <Skeleton className={`aspect-square w-[${szConfig.width}px] h-[${szConfig.width}px] max-w-full rounded-lg`} />
        </CardBody>
        <CardFooter>
          <div className='space-y-3'>
            <Skeleton isLoaded={loading} className='w-3/5 rounded-lg'>
              <div className='h-3 w-full rounded-lg bg-secondary'></div>
            </Skeleton>
            <Skeleton isLoaded={loading} className='w-4/5 rounded-lg'>
              <div className='h-3 w-full rounded-lg bg-secondary-300'></div>
            </Skeleton>
            <Skeleton isLoaded={loading} className='w-2/5 rounded-lg'>
              <div className='h-3 w-full rounded-lg bg-secondary-200'></div>
            </Skeleton>
          </div>
        </CardFooter>
      </Card>
    )
  else
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
            className={`w-full object-contain aspect-square h-[${szConfig.width}px]`}
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
