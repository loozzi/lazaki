import { Button, Chip, Input, Select, SelectItem, Textarea, Tooltip, divider } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Category } from '~/models/category'
import { ProductDetailResponse } from '~/models/product'

interface AdminProductInfoCompProps {
  className?: string
  product: ProductDetailResponse
}

export const AdminProductInfoComp = (props: AdminProductInfoCompProps) => {
  const { className, product } = props

  const [categories, setCategories] = useState<Category[]>([])

  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const handleChangeCategories = (keys: string) => {
    const lastKey = keys.split(',').pop()
    const lastCategoryId = parseInt(lastKey || '0')
    setSelectedCategories((prev) => {
      if (prev.includes(lastCategoryId)) {
        return prev.filter((id) => id !== lastCategoryId)
      } else {
        return [...prev, lastCategoryId]
      }
    })
    console.log(keys)
  }

  useEffect(() => {
    setCategories([
      {
        id: 1,
        name: 'Category 1',
        slug: 'category-1',
        description: 'Lorem   '
      },
      {
        id: 2,
        name: 'Category 2',
        slug: 'category-2',
        description: 'Lorem   '
      },
      {
        id: 3,
        name: 'Category 3',
        slug: 'category-3',
        description: 'Lorem   '
      },
      {
        id: 4,
        name: 'Category 4',
        slug: 'category-4',
        description: 'Lorem   '
      }
    ])
  }, [])

  return (
    <div className={className}>
      <div className='flex flex-col gap-4'>
        <Input label='Tên sản phẩm' value={product.name} />
        <Textarea label='Mô tả' value={product.description} />

        <div className='grid grid-cols-3 gap-4'>
          {/* Category */}
          <div>
            <div className='font-semibold'>Danh mục</div>
            <Select
              items={categories}
              label='Danh mục'
              variant='bordered'
              isMultiline={true}
              selectionMode='multiple'
              placeholder='Chọn danh mục'
              labelPlacement='outside'
              classNames={{
                base: 'max-w',
                trigger: 'min-h-12 py-2'
              }}
              renderValue={(items) => (
                <div className='flex flex-wrap gap-2'>
                  {items.map((item) => (
                    <Tooltip content={item.data?.description}>
                      <Chip key={item.data?.id}>{item.data?.name}</Chip>
                    </Tooltip>
                  ))}
                </div>
              )}
              defaultSelectedKeys={selectedCategories}
              onChange={(keys) => handleChangeCategories(keys.target.value)}
            >
              {(category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              )}
            </Select>
          </div>

          {/* Property */}
          <div className='col-span-2'>
            <div className='font-semibold'>Thuộc tính</div>
            <div className='grid grid-cols-1 gap-4'>
              {product.properties.map((property, index) => (
                <div key={index} className='grid grid-cols-2 gap-2'>
                  <Input label='Tên' value={property.value} />
                  <Input label='Giá trị' value={property.value} />
                </div>
              ))}
            </div>
            <div className='mt-4 flex justify-end'>
              <Button startContent={<FaPlus />} color='primary' variant='ghost'>
                Thêm thuộc tính
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
