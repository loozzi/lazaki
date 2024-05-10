import { Input, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import assets from '~/assets'
import { PaymentMethodComp } from './payment-method'

interface PaymentInformationCompProps {
  payload: any
  className?: string
}

export const PaymentInformationComp = (props: PaymentInformationCompProps) => {
  const { payload, className } = props

  const [districts, setDistricts] = useState<{ Id: string; Name: string; Wards: any[] }[]>([])
  const [wards, setWards] = useState<any[]>([])

  return (
    <div className={className}>
      <div className='grid gap-4'>
        <Input label='Họ và tên' />
        <div className='grid grid-cols-5 gap-4'>
          <Input label='Email' type='email' className='col-span-3' />
          <Input label='Số điện thoại' type='number' min={0} max={9999999999} className='col-span-2' />
        </div>
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
      <PaymentMethodComp className='grid gap-4' payload={payload} />
    </div>
  )
}
