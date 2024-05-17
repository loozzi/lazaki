import { useFormik } from 'formik'
import { useEffect, useMemo } from 'react'
import { useAppSelector } from '~/app/hook'
import { DetailCartComp } from '~/components/cart/cart-detail'
import { PaneComp } from '~/components/pane'
import { PurchaseInformationComp } from '~/components/purchase/purchase-info'
import { selectCart } from '~/hooks/order/order.slice'
import { OrderConfirmPayload } from '~/models/order'

export const ViewPurchasePage = () => {
  const cart = useAppSelector(selectCart)

  const initialInfomation: OrderConfirmPayload = useMemo(
    () => ({
      orderId: 0,
      fullName: '',
      email: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      street: '',
      note: '',
      paymentMethod: 'cod'
    }),
    []
  )

  const payload = useFormik({
    initialValues: initialInfomation,
    onSubmit: (values) => {
      console.log(values)
    },
    validateOnBlur: true,
    validateOnChange: false
  })

  const handlePay = () => {
    console.log(payload.values)
  }

  useEffect(() => {
    payload.setFieldValue('orderId', cart)
  }, [cart])

  return (
    <div>
      <PaneComp header='Thanh toán' className='mx-2 mt-4'>
        <div className='bg-white pb-4'>
          <div>
            <div className='text-2xl font-semibold p-4'>Thông tin thanh toán</div>
            <PurchaseInformationComp payload={payload} className='mx-2 grid md:grid-cols-2 gap-4 mb-8' />
          </div>
          <div>
            <div className='text-2xl font-semibold p-4'>Thông tin đơn hàng</div>
            <DetailCartComp products={cart?.orderDetails || []} viewOnly={true} onClick={handlePay} />
          </div>
        </div>
      </PaneComp>
    </div>
  )
}
