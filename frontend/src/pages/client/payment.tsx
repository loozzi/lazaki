import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { DetailCartComp } from '~/components/cart/cart-detail'
import { PaneComp } from '~/components/pane'
import { PurchaseInformationComp } from '~/components/purchase/purchase-info'

export const ViewPurchasePage = () => {
  const [products, setProducts] = useState<any[]>([])

  const initialInfomation = useMemo(
    () => ({
      fullName: '',
      email: '',
      phone: '',
      province: '',
      district: '',
      ward: '',
      address: '',
      note: '',
      method: 'cod'
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
    setProducts([
      {
        id: 1,
        checked: true,
        name: 'Sản phẩm này có tên là sản phẩm này có làm sao để biết tên sản phẩm thì phải xem tên sản phẩm là gì sản phẩm thì phải xem tên sản phẩm là gì',
        price: 2023324,
        old_price: 1239121,
        quantity: 2,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 2,
        checked: true,
        name: 'àdlkjlkjl',
        price: 222090,
        old_price: 1239121,
        quantity: 1,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 3,
        checked: true,
        name: 'ádfasdfjklasdf',
        price: 1028221,
        old_price: 1239121,
        quantity: 3,
        image: 'https://via.placeholder.com/150'
      },
      {
        id: 4,
        checked: true,
        name: 'ádfasdflkj',
        price: 3981212,
        old_price: 1239121,
        quantity: 4,
        image: 'https://via.placeholder.com/150'
      }
    ])
  }, [])
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
            <DetailCartComp products={products} viewOnly={true} onClick={handlePay} />
          </div>
        </div>
      </PaneComp>
    </div>
  )
}
