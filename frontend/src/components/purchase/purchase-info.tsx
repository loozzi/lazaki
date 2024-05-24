import { Input } from '@nextui-org/react'
import { SelectAddressComp } from '../select-address'
import { PurchaseMethodComp } from './purchase-method'
import { useAppSelector } from '~/app/hook'
import { selectUserInfo } from '~/hooks/auth/auth.slice'
import { useEffect } from 'react'
import { OrderConfirmPayload } from '~/models/order'

interface PurchaseInformationCompProps {
  payload: {
    setFieldValue: (field: string, value: string) => void
    values: OrderConfirmPayload
  }
  className?: string
}

export const PurchaseInformationComp = (props: PurchaseInformationCompProps) => {
  const { payload, className } = props

  const userInfo = useAppSelector(selectUserInfo)

  useEffect(() => {
    if (userInfo) {
      payload.setFieldValue('fullName', userInfo.fullName)
      payload.setFieldValue('email', userInfo.email)
      payload.setFieldValue('phoneNumber', userInfo.address.phoneNumber)
      payload.setFieldValue('province', userInfo.address.province)
      payload.setFieldValue('district', userInfo.address.district)
      payload.setFieldValue('ward', userInfo.address.ward)
      payload.setFieldValue('street', userInfo.address.street)
    }
  }, [userInfo])

  return (
    <div className={className}>
      <div className='grid gap-4'>
        <Input
          label='Họ và tên'
          value={payload.values.fullName}
          onChange={(e) => payload.setFieldValue('fullName', e.target.value)}
        />
        <div className='grid grid-cols-5 gap-4'>
          <Input
            label='Email'
            type='email'
            className='col-span-3'
            value={payload.values.email}
            onChange={(e) => payload.setFieldValue('email', e.target.value)}
          />
          <Input
            label='Số điện thoại'
            type='number'
            min={0}
            max={9999999999}
            className='col-span-2'
            value={payload.values.phoneNumber}
            onChange={(e) => payload.setFieldValue('phoneNumber', e.target.value)}
          />
        </div>
        <SelectAddressComp
          setProvince={(province: string) => payload.setFieldValue('province', province)}
          setDistrict={(district: string) => payload.setFieldValue('district', district)}
          setWard={(ward: string) => payload.setFieldValue('ward', ward)}
          currentAddress={{
            province: payload.values.province,
            district: payload.values.district,
            ward: payload.values.ward
          }}
        />
        <div>
          <Input
            label='Địa chỉ'
            value={payload.values.street}
            onChange={(e) => {
              payload.setFieldValue('street', e.target.value)
            }}
          />
        </div>
      </div>
      <PurchaseMethodComp className='grid gap-4 grid-rows-[auto,1fr]' payload={payload} />
    </div>
  )
}
