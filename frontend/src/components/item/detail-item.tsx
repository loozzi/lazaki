import { Button, ButtonGroup, Input } from '@nextui-org/react'
import { FaGift, FaMinus, FaPlus } from 'react-icons/fa'
import { MdBikeScooter } from 'react-icons/md'
import { PriceComp } from '../price'
import { StarComp } from '../star-field'
import { ItemImageControllerComp } from './image-controller'

interface DetailItemCompProps {
  item: any
}

export const DetailItemComp = (props: DetailItemCompProps) => {
  // const { item } = props
  const item = {
    images: [
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1n8mxd16',
        alt: 'Image 1',
        isPrimary: true
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1ne9754b',
        alt: 'Image 2',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1na1ht2e',
        alt: 'Image 3',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1nbg29de',
        alt: 'Image 4',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1ncump72',
        alt: 'Image 5',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1nfnrl9a',
        alt: 'Image 6',
        isPrimary: false
      },
      {
        url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lu8o9o1nh2c1ce',
        alt: 'Image 7',
        isPrimary: false
      }
    ],
    title:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    price: 1000000,
    sold: 349,
    rating: 2.5,
    reviews: 100,
    quantity: 129,
    old_price: 1200000,
    description:
      'lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
  }
  return (
    <div className='flex py-4'>
      <ItemImageControllerComp images={item.images} />
      <div className='ml-4 px-4'>
        <div className='text-3xl normal-case font-medium'>{item.title}</div>
        <div className='flex'>
          <div className='flex items-center mr-8'>
            <span className='mr-2 underline text-sm'>{item.rating}</span>
            <StarComp stars={item.rating} />
          </div>
          <a href='#review' className='mr-8'>
            <span className='mr-1 underline text-sm'>{item.reviews}</span>
            Đánh giá
          </a>
          <div>
            <span className='mr-1 underline text-sm'>{item.sold}</span>
            Đã bán
          </div>
        </div>
        <div className='bg-slate-200 py-2 px-8 flex items-center mt-16 rounded-md'>
          <span className='line-through text-gray-400'>{<PriceComp price={item.old_price} size={'sm'} />}</span>
          <span className='font-bold text-4xl ml-8'>{<PriceComp price={item.price} size='lg' color='#328bf1' />}</span>
        </div>
        <div className='mt-16 flex text-gray-400'>
          <span className='w-32'>Vận chuyển</span>
          <div className='flex flex-col'>
            <span className='flex items-center'>
              <FaGift className='mr-2' />
              Xử lý đơn hàng bởi Lazaki
            </span>
            <span className='flex items-center'>
              <MdBikeScooter className='mr-2' />
              Miễn phí vận chuyển
            </span>
          </div>
        </div>
        <div className='mt-20 flex items-center'>
          <span className='w-32'>Số lượng</span>

          <ButtonGroup className='border rounded-xl overflow-hidden'>
            <Button isIconOnly variant='light' radius='none'>
              <FaMinus />
            </Button>
            <span className='w-20'>
              <Input type='number' value={'1'} width={12} radius='none' />
            </span>
            <Button isIconOnly variant='light' radius='none'>
              <FaPlus />
            </Button>
          </ButtonGroup>
          <span className='ml-8'>{item.quantity} sản phẩm có sẵn</span>
        </div>
      </div>
    </div>
  )
}
