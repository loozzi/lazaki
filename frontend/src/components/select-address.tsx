import { Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import assets from '~/assets'

interface SelectAddressCompProps {
  setProvince: (province: string) => void
  setDistrict: (district: string) => void
  setWard: (ward: string) => void
  hasPlaceholder?: boolean
}

export const SelectAddressComp = (props: SelectAddressCompProps) => {
  const { setProvince, setDistrict, setWard, hasPlaceholder } = props

  const [districts, setDistricts] = useState<{ Id: string; Name: string; Wards: any[] }[]>([])
  const [wards, setWards] = useState<any[]>([])

  return (
    <div className='grid gap-4 grid-cols-1 lg:grid-cols-3'>
      <Select
        label='Tỉnh thành'
        placeholder={hasPlaceholder ? 'Chọn tỉnh thành' : undefined}
        onChange={(e) => {
          const province = assets.address.find((address) => address.Id === e.target.value)
          setProvince(province?.Name || '')
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
        placeholder={hasPlaceholder ? 'Chọn quận huyện' : undefined}
        onChange={(e) => {
          const district = districts.find((district) => district.Id === e.target.value)
          setDistrict(district?.Name || '')
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
        placeholder={hasPlaceholder ? 'Chọn phường xã' : undefined}
        onChange={(e) => {
          const ward = wards.find((ward) => ward.Id === e.target.value)
          setWard(ward?.Name || '')
        }}
      >
        {wards.map((ward) => (
          <SelectItem key={ward.Id} value={ward.Id}>
            {ward.Name}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}
