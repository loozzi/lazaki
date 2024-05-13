import { Card, CardBody, CardFooter, Image, Skeleton } from '@nextui-org/react'
import { PriceComp } from '../price'

interface CardItemProps {
  item: any
  size?: 'sm' | 'md' | 'lg'
}

export const CardItem = (props: CardItemProps) => {
  // const {item, size = 'md'} = props
  const item = {
    image: 'https://down-vn.img.susercontent.com/file/sg-11134201-22100-g0vtmbg1llive9',
    title: 'Sản phẩm có tên là giống với tên của sản phẩm ở chỗ bán sản phẩm',
    price: 100000,
    sold: 592
  }

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

  const szConfig = sizes[props.size || 'md']

  const handleViewDetail = () => {
    console.log('View detail')
  }

  return (
    <Card
      shadow='sm'
      className={`w-[${szConfig.width}px] h-[${szConfig.height}px] rounded-md cursor-pointer shadow-lg`}
      isPressable
      onPress={handleViewDetail}
    >
      <CardBody className='p-0'>
        <Image
          isZoomed
          src={item.image}
          alt={item.title}
          radius='lg'
          width='100%'
          className={`w-full object-cover h-[${szConfig.width}px]`}
        />
      </CardBody>
      <CardFooter>
        <div className='flex-col'>
          <span className='line-clamp-2'>{item.title}</span>
          <div className='flex justify-between items-center'>
            <PriceComp price={item.price} size='sm' color='#338cf1' />
            <span className='text-slate-400 text-sm'>Đã bán {item.sold}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
