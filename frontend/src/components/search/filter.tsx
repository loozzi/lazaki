import { Button, Checkbox, CheckboxGroup, Input, Select, SelectItem, Slider } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaFilter, FaSearch } from 'react-icons/fa'
import { useLocation } from 'react-router'
import { history } from '~/configs/history'
import routes from '~/configs/routes'
import { Category } from '~/models/category'
import categoryService from '~/services/category.service'

interface SearchFilterProps {
  className?: string
}

export const SearchFilterComp = (props: SearchFilterProps) => {
  const { className } = props

  const location = useLocation()

  const [showFilter, setShowFilter] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])

  const [budget, setBudget] = useState<number[]>([10000, 100000000])
  const [sort, setSort] = useState<string>('asc')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const updateBudget = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setBudget(value) // Directly assign if it's already an array
    } else {
      setBudget((prevBudget) => [...prevBudget, value]) // Append the number if it's a single value
    }
  }

  const handleSelectCat = (value: string) => {
    if (selectedCategories.includes(value)) {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== value))
    } else {
      setSelectedCategories((prev) => [...prev, value])
    }
  }

  const applyFilter = () => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.delete('minPrice')
    searchParams.delete('maxPrice')
    searchParams.delete('sort')
    searchParams.delete('categories')
    searchParams.append('minPrice', budget[0].toString())
    searchParams.append('maxPrice', budget[1].toString())
    searchParams.append('sort', sort)
    searchParams.append('categories', selectedCategories.join(',') || '')
    history.push(`${location.pathname}?${searchParams.toString()}`)
  }

  useEffect(() => {
    // call api get categories
    categoryService.getAll().then((response) => {
      setCategories(response.data || [])
    })
  }, [])

  const [search, setSearch] = useState<string>('')

  const handleSearch = () => {
    history.push(`${routes.client.search}?q=${search}`)
  }

  return (
    <div className={className}>
      <Input
        placeholder='Tìm kiếm sản phẩm...'
        variant='flat'
        label='Tìm kiếm'
        className='lg:hidden mb-4'
        endContent={
          <div className='border-l-1 pl-2 flex align-middle'>
            <Button color='primary' variant='flat' onClick={handleSearch} size='sm' className='m-0'>
              <FaSearch />
            </Button>
          </div>
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
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
            <h3 className='text-lg font-semibold text-gray-400'>Danh mục</h3>
            <CheckboxGroup className='max-h-[360px] overflow-y-auto overflow-x-hidden'>
              {categories.map((category) => (
                <Checkbox key={category.id} value={category.slug} onChange={(e) => handleSelectCat(e.target.value)}>
                  {category.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
          <hr />
          <div className='flex flex-col space-y-1'>
            <Select label='Sắp xếp' selectedKeys={[sort]} onChange={(e) => setSort(e.target.value)}>
              <SelectItem key='asc' value='asc'>
                Giá: Thấp đến cao
              </SelectItem>
              <SelectItem key='desc' value='desc'>
                Giá: Cao đến thấp
              </SelectItem>
            </Select>
          </div>
          <div className='flex flex-col space-y-1'>
            <Slider
              label='Khoảng giá'
              formatOptions={{ style: 'currency', currency: 'VND' }}
              step={10000}
              size='md'
              maxValue={100000000}
              minValue={10000}
              value={budget}
              onChange={updateBudget}
              className='max-w-md'
            />
            {/* <p className='text-default-500 font-medium text-small'>
              Ngân sách đã chọn: {Array.isArray(budget) && budget.map((b) => `₫${b.toLocaleString()}`).join(' - ')}
            </p> */}
          </div>

          <Button className='w-full' color='primary' onClick={applyFilter}>
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  )
}
