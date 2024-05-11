import { Input } from '@nextui-org/react'
import { SelectAddressComp } from '../select-address'
import { PurchaseMethodComp } from './purchase-method'

interface PurchaseInformationCompProps {
  payload: any
  className?: string
}

export const PurchaseInformationComp = (props: PurchaseInformationCompProps) => {
  const { payload, className } = props

  return (
    <div className={className}>
      <div className='grid gap-4'>
        <Input label='Họ và tên' />
        <div className='grid grid-cols-5 gap-4'>
          <Input label='Email' type='email' className='col-span-3' />
          <Input label='Số điện thoại' type='number' min={0} max={9999999999} className='col-span-2' />
        </div>
        <SelectAddressComp
          setProvince={(province: string) => payload.setFieldValue('province', province)}
          setDistrict={(district: string) => payload.setFieldValue('district', district)}
          setWard={(ward: string) => payload.setFieldValue('ward', ward)}
        />
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
      <PurchaseMethodComp className='grid gap-4 grid-rows-[auto,1fr]' payload={payload} />
    </div>
  )
}
