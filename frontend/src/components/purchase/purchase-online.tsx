import { useEffect, useState } from 'react'
import { useAppSelector } from '~/app/hook'
import { selectCart } from '~/hooks/order/order.slice'
import paymentService from '~/services/payment.service'
import { Image, Skeleton } from '@nextui-org/react'

export const ModalPurchaseOnline = () => {
  const cart = useAppSelector(selectCart)
  const [qrCode, setQrCode] = useState<string>('')
  useEffect(() => {
    paymentService.getQrCode(cart?.id || 0).then((res) => {
      if (res.status === 200) {
        setQrCode(res.data!.qrCode)
      }
    })
  }, [cart])
  return (
    <div className='flex justify-center'>
      {qrCode === '' ? (
        <Skeleton className='w-[300px] h-[300px] rounded-lg' />
      ) : (
        <Image src={qrCode} alt='qr code' width={300} height={300} />
      )}
    </div>
  )
}
