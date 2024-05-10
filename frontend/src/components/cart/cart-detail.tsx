import {
  Button,
  Checkbox,
  Chip,
  Image,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { FaDeleteLeft } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'
import { PriceComp } from '../price'

interface DetailCartCompProps {
  products: any[]
  className?: string
  handleChangeProducts?: (products: any[]) => void
  viewOnly?: boolean
}

export const DetailCartComp = (props: DetailCartCompProps) => {
  const { products, className, handleChangeProducts, viewOnly = false } = props

  const columns = [
    { name: 'Sản phẩm', uid: 'name' },
    { name: 'Giá', uid: 'price' },
    { name: 'Số lượng', uid: 'quantity' },
    { name: 'Thành tiền', uid: 'total_price' }
  ]

  if (!viewOnly) columns.push({ name: 'Thao tác', uid: 'actions' })

  const [totalPrice, setTotalPrice] = useState<number>(0)

  const handleChangeQuantity = (product: any, quantity: number) => {
    if (product.quantity + quantity <= 0) return
    const newProducts = products.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p))
    handleChangeProducts!(newProducts)
  }

  const handleRemoveProduct = (product: any) => {
    handleChangeProducts!(products.filter((p) => p.id !== product.id))
  }

  const renderCell = (product: any, columnKey: any) => {
    const cellValue = product[columnKey]

    switch (columnKey) {
      case 'checked':
        return <Checkbox checked={cellValue}></Checkbox>
      case 'name':
        return (
          <div className='flex gap-2 items-center'>
            <Image src={product.image} width={50} height={50} className='w-full' alt={product.name} />
            <span className='font-semibold'>{product.name}</span>
          </div>
        )
      case 'price':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm'>
              <PriceComp price={product.price} size='sm' />
            </p>
            <p className='text-bold text-sm text-default-400 line-through'>
              <PriceComp price={product.old_price} fontSize={12} />
            </p>
          </div>
        )
      case 'total_price':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm'>
              <PriceComp price={product.price * product.quantity} size='sm' />
            </p>
            <p className='text-bold text-sm text-default-400'>{}</p>
          </div>
        )
      case 'quantity':
        return (
          <div className='flex items-center gap-2'>
            {!viewOnly && (
              <Button
                isIconOnly
                variant='light'
                radius='full'
                size='sm'
                onClick={() => handleChangeQuantity(product, -1)}
              >
                <FaMinus />
              </Button>
            )}
            <Chip className='capitalize' size='sm' variant='flat'>
              {cellValue}
            </Chip>
            {!viewOnly && (
              <Button
                isIconOnly
                variant='light'
                radius='full'
                size='sm'
                onClick={() => handleChangeQuantity(product, +1)}
              >
                <FaPlus />
              </Button>
            )}
          </div>
        )
      case 'actions':
        return (
          <Tooltip color='danger' content='Xóa sản phẩm'>
            <span
              className='text-lg text-danger cursor-pointer active:opacity-50'
              onClick={() => handleRemoveProduct(product)}
            >
              <FaDeleteLeft />
            </span>
          </Tooltip>
        )
      default:
        return cellValue
    }
  }

  useEffect(() => {
    setTotalPrice(products.reduce((total, product) => total + product.price * product.quantity, 0))
  }, [products])

  return (
    <div className={className}>
      <Table isStriped className='p-2'>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={products}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell className={columnKey == 'name' ? 'w-3/5' : ''}>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div
        className={'flex md:flex-row flex-col item-centers justify-between px-2 gap-4' + (viewOnly ? ' items-end' : '')}
      >
        {!viewOnly && (
          <Button as={Link} to={routes.client.home} variant='ghost' className='mt-4'>
            Tiếp tục mua hàng?
          </Button>
        )}
        {viewOnly && <div></div>}
        <div className='flex gap-4 items-center justify-between'>
          <div className='flex flex-col items-end'>
            <span>Tổng thanh toán [{products.length} sản phẩm]</span>
            <span className='font-semibold'>
              <PriceComp price={totalPrice} size='md' color='#338cf1' />
            </span>
          </div>
          {!viewOnly && (
            <Button className='mt-4' color='primary' size='lg'>
              Đặt hàng
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
