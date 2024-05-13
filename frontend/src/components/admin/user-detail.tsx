import { User } from '~/models/user'
interface UserInfoDetailCompProps {
  className?: string
  user: User
}

export const UserInfoDetailComp = (props: UserInfoDetailCompProps) => {
  const { className, user } = props
  return (
    <div className={className}>
      <div className='flex flex-col gap-1'>
        <div className='grid grid-cols-3'>
          <div className='col-span-1 font-semibold'>Họ và tên:</div>
          <div className='col-span-2'>{user.fullName}</div>
        </div>
        <div className='grid grid-cols-3'>
          <div className='col-span-1 font-semibold'>Email:</div>
          <div className='col-span-2'>{user.email}</div>
        </div>
        <div className='grid grid-cols-3'>
          <div className='col-span-1 font-semibold'>Số điện thoại:</div>
          <div className='col-span-2'>{user.address.phoneNumber}</div>
        </div>
        <div className='grid grid-cols-3'>
          <div className='col-span-1 font-semibold'>Ngày sinh:</div>
          <div className='col-span-2'>{user.birthday}</div>
        </div>
        <div className='grid grid-cols-3'>
          <div className='col-span-1 font-semibold'>Giới tính:</div>
          <div className='col-span-2'>{user.gender === 'male' ? 'Nam' : 'Nữ'}</div>
        </div>
        <div className='grid grid-cols-3'>
          <div className='col-span-1 font-semibold'>Địa chỉ</div>
          <div className='col-span-2'>
            {user.address.street}, {user.address.ward}, {user.address.district}, {user.address.province}
          </div>
        </div>
        <div className='grid grid-cols-3'>
          <div className='col-span-1 font-semibold'>Trạng thái:</div>
          <div className='col-span-2'>{user.status === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'}</div>
        </div>
      </div>
    </div>
  )
}
