import { Button, DatePicker, Input, Select, SelectItem } from '@nextui-org/react'
import { PaneComp } from '../pane'
import { SelectAddressComp } from '../select-address'

interface UserInformationCompProps {
  className?: string
}

export const UserInformationComp = (props: UserInformationCompProps) => {
  const { className } = props
  return (
    <div className={className}>
      <PaneComp header='Thông tin cá nhân' className='bg-white rounded-md'>
        <div className='p-4 flex flex-col gap-4'>
          <div className='grid grid-cols-2 lg:grid-cols-7 gap-4'>
            <Input className='col-span-2 lg:col-span-3' label='Họ và tên' placeholder='Nhập họ và tên' />
            <DatePicker className='col-span-1 lg:col-span-2' label='Ngày sinh' />
            <Select label='Giới tính' placeholder='Chọn giới tính' className='col-span-1 lg:col-span-2'>
              <SelectItem key='male' value='male'>
                Nam
              </SelectItem>
              <SelectItem key='female' value='female'>
                Nữ
              </SelectItem>
            </Select>
          </div>
          <div className='grid grig-cols-1 lg:grid-cols-2 gap-4'>
            <Input label='Email' placeholder='Nhập email' />
            <Input label='Số điện thoại' placeholder='Nhập số điện thoại' />
          </div>
          <SelectAddressComp setProvince={() => {}} setDistrict={() => {}} setWard={() => {}} hasPlaceholder />
          <Input label='Địa chỉ' placeholder='Nhập địa chỉ' />
          <Button className='max-w-32' color='primary'>
            Chỉnh sửa
          </Button>
        </div>
      </PaneComp>
    </div>
  )
}
