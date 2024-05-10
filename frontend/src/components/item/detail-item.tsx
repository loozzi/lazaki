import { Button, ButtonGroup, Input } from '@nextui-org/react'
import { useState } from 'react'
import { FaGift, FaMinus, FaPlus } from 'react-icons/fa'
import { MdBikeScooter } from 'react-icons/md'
import { PriceComp } from '../price'
import { StarComp } from '../star-field'
import { ItemImageControllerComp } from './image-controller'

interface DetailItemCompProps {
  item: any
}

export const DetailItemComp = (props: DetailItemCompProps) => {
  const { item } = props
  const [quantitySelected, setQuantitySelected] = useState<number>(1)

  const handleChangeQuantity = (value: number) => {
    if (quantitySelected + value > 0 && quantitySelected + value <= item.quantity)
      setQuantitySelected(quantitySelected + value)
  }
  return (
    <div className='flex flex-col py-4 đămx-2 lg:mx-0'>
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
    </div>
  )
}
