import { Input, Select, SelectItem } from '@nextui-org/react'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import assets from '~/assets'
import { DetailCartComp } from '~/components/cart/cart-detail'
import { PaneComp } from '~/components/pane'

export const ViewPaymentPage = () => {
  const [products, setProducts] = useState<any[]>([])

  const [districts, setDistricts] = useState<{ Id: string; Name: string; Wards: any[] }[]>([])
  const [wards, setWards] = useState<any[]>([])

  const initialInfomation = useMemo(
    () => ({
      fullName: '',
      email: '',
      phone: '',
      province: '',
      district: '',
      ward: '',
      address: ''
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
          <div className='text-2xl font-semibold p-4'>Thông tin thanh toán</div>

          <div className='mx-2 grid md:grid-cols-2 gap-4 mb-8'>
            <div className='grid gap-4'>
              <Input label='Họ và tên' />
              <div className='grid grid-cols-5 gap-4'>
                <Input label='Email' type='email' className='col-span-3' />
                <Input label='Số điện thoại' type='number' min={0} max={9999999999} className='col-span-2' />
              </div>
            </div>
            <div className='grid gap-4'>
              <div className='grid gap-4 grid-cols-3'>
                <Select
                  label='Tỉnh thành'
                  onChange={(e) => {
                    const province = assets.address.find((address) => address.Id === e.target.value)
                    payload.setFieldValue('province', province?.Name || '')
                    setDistricts(province?.Districts || [])
                  }}
                >
                  {assets.address.map((address) => (
                    <SelectItem key={address.Id} value={address.Id}>
                      {address.Name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Quận huyện'
                  onChange={(e) => {
                    const district = districts.find((district) => district.Id === e.target.value)
                    payload.setFieldValue('district', district?.Name || '')
                    setWards(district?.Wards || [])
                  }}
                >
                  {districts.map((district) => (
                    <SelectItem key={district.Id} value={district.Id}>
                      {district.Name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label='Phường xã'
                  onChange={(e) => {
                    const ward = wards.find((ward) => ward.Id === e.target.value)
                    payload.setFieldValue('ward', ward?.Name || '')
                  }}
                >
                  {wards.map((ward) => (
                    <SelectItem key={ward.Id} value={ward.Id}>
                      {ward.Name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div>
                <Input
                  label='Địa chỉ'
                  value={payload.values.address}
                  onChange={(e) => {
                    payload.setFieldValue('address', e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            <div className='text-2xl font-semibold p-4'>Thông tin đơn hàng</div>
            <DetailCartComp products={products} viewOnly={true} />
          </div>
        </div>
      </PaneComp>
    </div>
  )
}
