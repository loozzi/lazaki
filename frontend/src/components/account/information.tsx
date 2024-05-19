import { Button, Input } from '@nextui-org/react'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { useAppDispatch } from '~/app/hook'
import { authActions } from '~/hooks/auth/auth.slice'
import { User, UserUpdatePayload } from '~/models/user'
import userService from '~/services/user.service'
import { PaneComp } from '../pane'
import { SelectAddressComp } from '../select-address'

interface UserInformationCompProps {
  className?: string
}

export const UserInformationComp = (props: UserInformationCompProps) => {
  const { className } = props

  const dispatch = useAppDispatch()

  const [userDetail, setUserDetail] = useState<User | undefined>()

  const initialUser: UserUpdatePayload = useMemo(
    () => ({
      fullName: userDetail?.fullName || '',
      birthday: userDetail?.birthday || '',
      gender: userDetail?.gender || 'male',
      email: userDetail?.email || '',
      phoneNumber: userDetail?.address.phoneNumber || '',
      province: userDetail?.address.province || '',
      district: userDetail?.address.district || '',
      ward: userDetail?.address.ward || '',
      street: userDetail?.address.street || ''
    }),
    []
  )

  const payload = useFormik({
    initialValues: initialUser,
    onSubmit: (values) => {
      console.log(values)
    }
  })

  const handleUpdateUserInformation = () => {
    userService.update(payload.values).then((res) => {
      if (res.status === 200) {
        alert('Cập nhật thông tin thành công')
        dispatch(authActions.setUserInfo(res.data))
      }
    })
  }

  useEffect(() => {
    userService.get().then((res) => {
      setUserDetail(res.data)
    })
  }, [])

  useEffect(() => {
    payload.setFieldValue('fullName', userDetail?.fullName || '')
    payload.setFieldValue('email', userDetail?.email || '')
    payload.setFieldValue('phoneNumber', userDetail?.address.phoneNumber || '')
    payload.setFieldValue('province', userDetail?.address.province || '')
    payload.setFieldValue('district', userDetail?.address.district || '')
    payload.setFieldValue('ward', userDetail?.address.ward || '')
    payload.setFieldValue('street', userDetail?.address.street || '')
  }, [userDetail])

  return (
    <div className={className}>
      <PaneComp header='Thông tin cá nhân' className='bg-white rounded-md'>
        <div className='p-4 flex flex-col gap-4'>
          <div className='grid grig-cols-1 lg:grid-cols-3 gap-4'>
            <Input
              label='Họ và tên'
              placeholder='Nhập họ và tên'
              value={payload.values.fullName}
              onChange={(e) => payload.setFieldValue('fullName', e.target.value)}
            />
            <Input
              label='Email'
              placeholder='Nhập email'
              value={payload.values.email}
              onChange={(e) => payload.setFieldValue('email', e.target.value)}
            />
            <Input
              label='Số điện thoại'
              placeholder='Nhập số điện thoại'
              value={payload.values.phoneNumber}
              onChange={(e) => payload.setFieldValue('phoneNumber', e.target.value)}
            />
          </div>
          <SelectAddressComp
            setProvince={(province) => {
              payload.setFieldValue('province', province)
            }}
            setDistrict={(district) => {
              payload.setFieldValue('district', district)
            }}
            setWard={(ward) => {
              payload.setFieldValue('ward', ward)
            }}
            hasPlaceholder
            currentAddress={{
              province: payload.values.province,
              district: payload.values.district,
              ward: payload.values.ward
            }}
          />
          <Input
            label='Địa chỉ'
            placeholder='Nhập địa chỉ'
            value={payload.values.street}
            onChange={(e) => payload.setFieldValue('street', e.target.value)}
          />
          <div className='flex justify-end'>
            <Button
              className='max-w-32'
              color='primary'
              onClick={handleUpdateUserInformation}
              startContent={<FaEdit />}
            >
              Chỉnh sửa
            </Button>
          </div>
        </div>
      </PaneComp>
    </div>
  )
}
