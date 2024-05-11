import { Checkbox, CheckboxGroup, Select, SelectItem, Slider } from '@nextui-org/react'
import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'

interface SearchFilterProps {
  className?: string
}

export const SearchFilterComp = (props: SearchFilterProps) => {
  const { className } = props

  const [showFilter, setShowFilter] = useState<boolean>(false)

  const [budget, setBudget] = useState<number[]>([10000, 100000000])

  const updateBudget = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setBudget(value) // Directly assign if it's already an array
    } else {
      setBudget((prevBudget) => [...prevBudget, value]) // Append the number if it's a single value
    }
  }

  return (
    <div className={className}>
      <div className='bg-white p-4 rounded-md'>
        <div
          className='flex justify-between items-center border-b-1 pb-4 mb-4 w-full cursor-pointer'
          onClick={() => setShowFilter(!showFilter)}
        >
          <h2 className='text-lg font-semibold'>Bộ lọc</h2>
          <FaFilter />
        </div>
        <div className={'flex-col gap-4 md:flex' + (!showFilter ? ' hidden' : ' flex')}>
          <div className='flex flex-col space-y-1'>
            <CheckboxGroup label='Danh mục' defaultValue={['buenos-aires', 'london']}>
              <Checkbox value='buenos-aires'>Buenos Aires</Checkbox>
              <Checkbox value='sydney'>Sydney</Checkbox>
              <Checkbox value='san-francisco'>San Francisco</Checkbox>
              <Checkbox value='london'>London</Checkbox>
              <Checkbox value='tokyo'>Tokyo</Checkbox>
            </CheckboxGroup>
          </div>
          <div className='flex flex-col space-y-1'>
            <Slider
              label='Khoảng giá'
              formatOptions={{ style: 'currency', currency: 'VND' }}
              step={10000}
              size='sm'
              maxValue={100000000}
              minValue={10000}
              value={budget}
              onChange={updateBudget}
              className='max-w-md'
            />
            <p className='text-default-500 font-medium text-small'>
              Ngân sách đã chọn: {Array.isArray(budget) && budget.map((b) => `₫${b.toLocaleString()}`).join(' - ')}
            </p>
          </div>
          <div className='flex flex-col space-y-1'>
            <Select label='Sắp xếp' selectedKeys={['default']}>
              <SelectItem key='default'>Mặc định</SelectItem>
              <SelectItem key='low'>Giá: Thấp đến cao</SelectItem>
              <SelectItem key='high'>Giá: Cao đến thấp</SelectItem>
            </Select>
          </div>
          <div className='flex flex-col space-y-1'>
            <Select selectedKeys={['all']} label='Đánh giá'>
              <SelectItem key='all'>Tất cả</SelectItem>
              <SelectItem key='1'>1 Sao</SelectItem>
              <SelectItem key='2'>2 Sao</SelectItem>
              <SelectItem key='3'>3 Sao</SelectItem>
              <SelectItem key='4'>4 Sao</SelectItem>
              <SelectItem key='5'>5 Sao</SelectItem>
            </Select>
          </div>
          <button className='w-full p-2 text-white bg-blue-500 rounded'>Áp dụng</button>
        </div>
      </div>
    </div>
  )
}
