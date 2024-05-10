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
  handleChangeProducts: (products: any[]) => void
}

const columns = [
  { name: 'Tên sản phẩm', uid: 'name' },
  { name: 'Đơn giá', uid: 'price' },
  { name: 'Số lượng', uid: 'quantity' },
  { name: 'Thành tiền', uid: 'total_price' },
  { name: 'Thao tác', uid: 'actions' }
]

export const DetailCartComp = (props: DetailCartCompProps) => {
  const { products, className, handleChangeProducts } = props

  const [totalPrice, setTotalPrice] = useState<number>(0)

  const handleChangeQuantity = (product: any, quantity: number) => {
    if (product.quantity + quantity <= 0) return
    const newProducts = products.map((p) => (p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p))
    handleChangeProducts(newProducts)
  }

  const handleRemoveProduct = (product: any) => {
    handleChangeProducts(products.filter((p) => p.id !== product.id))
  }

  useEffect(() => {
    console.log(products)
  }, [products])

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
            <Button
              isIconOnly
              variant='light'
              radius='full'
              size='sm'
              onClick={() => handleChangeQuantity(product, -1)}
            >
              <FaMinus />
            </Button>
            <Chip className='capitalize' size='sm' variant='flat'>
              {cellValue}
            </Chip>
            <Button
              isIconOnly
              variant='light'
              radius='full'
              size='sm'
              onClick={() => handleChangeQuantity(product, +1)}
            >
              <FaPlus />
            </Button>
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
      <div className='flex md:flex-row flex-col justify-between px-2 gap-4'>
        <Button as={Link} to={routes.client.home} variant='ghost' className='mt-4'>
          Tiếp tục mua hàng?
        </Button>
        <div className='flex gap-4 items-center'>
          <div className='flex flex-col items-end'>
            <span>Tổng thanh toán [{products.length} sản phẩm]</span>
            <span>
              <PriceComp price={totalPrice} size='md' />
            </span>
          </div>
          <Button className='mt-4' color='primary' size='lg'>
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  )
}
