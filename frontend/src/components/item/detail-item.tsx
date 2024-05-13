import { Button, ButtonGroup, Input } from '@nextui-org/react'
import { useState } from 'react'
import { FaCartPlus, FaGift, FaMinus, FaPlus } from 'react-icons/fa'
import { MdBikeScooter } from 'react-icons/md'
import { useAppDispatch } from '~/app/hook'
import { orderActions } from '~/hooks/order/order.slice'
import { CartItem } from '~/models/order'
import { ProductDetailResponse, VariationResponse } from '~/models/product'
import { PriceComp } from '../price'
import { StarComp } from '../star-field'
import { ItemImageControllerComp } from './image-controller'

interface DetailItemCompProps {
  product: ProductDetailResponse
}

export const DetailItemComp = (props: DetailItemCompProps) => {
  const { product } = props
  const [quantitySelected, setQuantitySelected] = useState<number>(1)
  const [selectedVariation, setSelectedVariation] = useState<VariationResponse>(product.variations[0])

  const dispatch = useAppDispatch()

  const variationTypes = new Set(product.variations.map((variation) => variation.type))

  const handleChangeQuantity = (value: number) => {
    if (quantitySelected + value > 0 && quantitySelected + value <= selectedVariation.quantity)
      setQuantitySelected(quantitySelected + value)
  }

  const handleChangeVariation = (variation: VariationResponse) => {
    setSelectedVariation(variation)
    if (variation.quantity < quantitySelected) setQuantitySelected(variation.quantity)
  }

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      variationId: selectedVariation.id,
      productId: product.id,
      quantity: quantitySelected,
      price: selectedVariation.price,
      oldePrice: selectedVariation.oldPrice
    }
    dispatch({ type: orderActions.addToCart.type, payload: cartItem })
  }

  return (
    <div className='flex flex-col py-4 đămx-2 lg:mx-0'>
      <div className='flex md:flex-row items-start flex-col bg-white rounded-md p-4'>
        <div className='text-3xl normal-case font-medium md:hidden mx-2 mb-4'>{product.name}</div>
        <ItemImageControllerComp images={product.images} />
        <div className='md:ml-4 pl-4 w-full mt-8 md:mt-0'>
          <div className='text-3xl normal-case font-medium md:block hidden'>{product.name}</div>
          <div className='flex mt-4'>
            <div className='mr-8'>
              <StarComp stars={0} />
            </div>
            <a href='#review' className='mr-8'>
              <span className='mr-1 underline text-sm font-semibold'>{0}</span>
              Đánh giá
            </a>
            <div>
              <span className='mr-1 underline text-sm font-semibold'>{selectedVariation.sold}</span>
              Đã bán
            </div>
          </div>
          <div className='bg-slate-200 py-2 px-8 flex items-center mt-16 rounded-md'>
            <span className='line-through text-gray-400'>
              {<PriceComp price={selectedVariation.oldPrice} size={'sm'} />}
            </span>
            <span className='font-bold text-4xl ml-8'>
              {<PriceComp price={selectedVariation.price} size='lg' color='#328bf1' />}
            </span>
          </div>
          <div className='mt-8 md:flex text-gray-400 hidden'>
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
          <div className='mt-8 flex items-center'>
            <span className='w-32 text-gray-400'>Số lượng</span>

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
                  max={selectedVariation.quantity}
                />
              </span>
              <Button isIconOnly variant='light' radius='none' onClick={() => handleChangeQuantity(1)}>
                <FaPlus />
              </Button>
            </ButtonGroup>
            <span className='ml-8'>{selectedVariation.quantity} sản phẩm có sẵn</span>
          </div>

          {[...variationTypes].map((type) => (
            <div key={type} className='mt-8 flex items-center'>
              <span className='min-w-32 text-gray-400'>{type}</span>

              <div className='flex flex-wrap gap-2 max-h-48 overflow-auto'>
                {product.variations
                  .filter((variation) => variation.type === type)
                  .map((variation, index) => {
                    return (
                      <Button
                        key={index}
                        variant={variation.id === selectedVariation.id ? 'solid' : 'ghost'}
                        color='primary'
                        onClick={() => handleChangeVariation(variation)}
                      >
                        {variation.option}
                      </Button>
                    )
                  })}
              </div>
            </div>
          ))}
          <div className='mt-8 flex justify-start gap-2'>
            <Button variant='ghost' color='primary' startContent={<FaCartPlus size={24} />} onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
            <Button variant='solid' color='primary' className='w-48'>
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
