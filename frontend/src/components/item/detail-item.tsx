import { Button, ButtonGroup, Input, image } from '@nextui-org/react'
import { FaGift, FaMinus, FaPlus } from 'react-icons/fa'
import { MdBikeScooter } from 'react-icons/md'
import { PriceComp } from '../price'
import { ListViewReviewComp } from '../review/list-review'
import { StarComp } from '../star-field'
import { DescriptionItemComp } from './desc-item'
import { ItemImageControllerComp } from './image-controller'
import { useState } from 'react'

interface DetailItemCompProps {
  item: any
}

export const DetailItemComp = (props: DetailItemCompProps) => {
  // const { item } = props
  const [quantitySelected, setQuantitySelected] = useState<number>(1)
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

  const reviews = [
    {
      id: 1,
      rating: 3,
      content: 'Sản phẩm tốt',
      user: {
        id: 1,
        name: 'Nguyễn Văn A'
      },
      images: [
        'https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lr7dmjnzzwyh06.webp',
        'https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lr7dmjo0fd8kd6.webp'
      ],
      created_at: '2021-09-01T00:00:00Z'
    },
    {
      id: 2,
      rating: 4,
      content: 'Sản phẩm rất tốt',
      user: {
        id: 2,
        name: 'Nguyễn Văn B'
      },
      created_at: '2021-09-02T00:00:00Z'
    },
    {
      id: 3,
      rating: 5,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, lorem tempor incididunt ut labore et dolore magna aliqua, lorem ',
      user: {
        id: 3,
        name: 'Nguyễn Văn C'
      },
      images: ['https://down-bs-vn.img.susercontent.com/vn-11134103-7r98o-lunih38whb1ha8.webp'],
      created_at: '2021-09-03T00:00:00Z'
    },
    {
      id: 4,
      rating: 4,
      content:
        'lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      user: {
        id: 4,
        name: 'Nguyễn Văn D'
      },
      created_at: '2021-09-04T00:00:00Z'
    }
  ]

  const handleChangeQuantity = (value: number) => {
    if (quantitySelected + value > 0 && quantitySelected + value <= item.quantity)
      setQuantitySelected(quantitySelected + value)
  }
  return (
    <div className='flex flex-col py-4 mt-4'>
      <div className='flex md:flex-row items-center flex-col bg-white rounded-md p-4'>
        <div className='text-3xl normal-case font-medium md:hidden mx-8 mb-4'>{item.title}</div>
        <ItemImageControllerComp images={item.images} />
        <div className='md:ml-4 pl-4 w-full mt-8 md:mt-0'>
          <div className='text-3xl normal-case font-medium md:block hidden'>{item.title}</div>
          <div className='flex mt-4'>
            <div className='mr-8'>
              <StarComp stars={item.rating} />
            </div>
            <a href='#review' className='mr-8'>
              <span className='mr-1 underline text-sm font-semibold'>{item.reviews}</span>
              Đánh giá
            </a>
            <div>
              <span className='mr-1 underline text-sm font-semibold'>{item.sold}</span>
              Đã bán
            </div>
          </div>
          <div className='bg-slate-200 py-2 px-8 flex items-center mt-16 rounded-md'>
            <span className='line-through text-gray-400'>{<PriceComp price={item.old_price} size={'sm'} />}</span>
            <span className='font-bold text-4xl ml-8'>
              {<PriceComp price={item.price} size='lg' color='#328bf1' />}
            </span>
          </div>
          <div className='mt-16 md:flex text-gray-400 hidden'>
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
              <Button isIconOnly variant='light' radius='none' onClick={() => handleChangeQuantity(-1)}>
                <FaMinus />
              </Button>
              <span className='w-20'>
                <Input
                  type='number'
                  value={quantitySelected.toString()}
                  onChange={(e) => setQuantitySelected(parseInt(e.target.value))}
                  width={12}
                  radius='none'
                  min={1}
                  max={item.quantity}
                />
              </span>
              <Button isIconOnly variant='light' radius='none' onClick={() => handleChangeQuantity(1)}>
                <FaPlus />
              </Button>
            </ButtonGroup>
            <span className='ml-8'>{item.quantity} sản phẩm có sẵn</span>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <div>
          <DescriptionItemComp item={item} />

          <ListViewReviewComp reviews={reviews} className='mt-4' />
        </div>
        <div>{/* Suggestion list */}</div>
      </div>
    </div>
  )
}
