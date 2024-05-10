import { Image } from '@nextui-org/react'
import assets from '~/assets'

export const EmptyCartComp = () => (
  <div className='flex flex-col items-center py-8 bg-white'>
    <Image src={assets.emptyCart} />
    <span className='text-3xl font-semibold'>Giỏ hàng trống</span>
    <span>Bạn tham khảo sản phẩm được Lazaki gợi ý bên dưới nhé.</span>
  </div>
)
