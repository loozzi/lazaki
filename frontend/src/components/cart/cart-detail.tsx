import {
  Button,
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
import { useAppDispatch } from '~/app/hook'
import routes from '~/configs/routes'
import { orderActions } from '~/hooks/order/order.slice'
import { CartItem, OrderUpdatePayload } from '~/models/order'
import { PriceComp } from '../price'

interface DetailCartCompProps {
  products: CartItem[]
  className?: string
  viewOnly?: boolean
  onClick?: () => void
}

export const DetailCartComp = (props: DetailCartCompProps) => {
  const { products, className, onClick, viewOnly = false } = props

  const columns = [
    { name: 'Sản phẩm', uid: 'name' },
    { name: 'Giá', uid: 'price' },
    { name: 'Số lượng', uid: 'quantity' },
    { name: 'Thành tiền', uid: 'total_price' }
  ]

  if (!viewOnly) columns.push({ name: 'Thao tác', uid: 'actions' })

  const [totalPrice, setTotalPrice] = useState<number>(0)
  const dispatch = useAppDispatch()

  const handleChangeQuantity = (product: CartItem, quantity: number) => {
    const payload: OrderUpdatePayload = {
      variationId: product?.variationId!,
      productId: product.productId!,
      orderDetailId: product.id!,
      quantity: quantity + product.quantity
    }

    if (payload.quantity >= 1)
      dispatch({
        type: orderActions.changeQuantity.type,
        payload: payload
      })
  }

  const handleRemoveProduct = (product: CartItem) => {
    dispatch({
      type: orderActions.removeFromCart.type,
      payload: product.id!
    })
  }

  const renderCell = (item: CartItem, columnKey: any) => {
    const cellValue = item[columnKey]

    switch (columnKey) {
      case 'name':
        return (
          <div className='flex gap-2 items-center'>
            <Image src={item.image} className='' width={50} height={50} alt={item.name} />
            <div className='flex flex-col'>
              <span className='font-semibold'>{item.name}</span>
              <span className='text-default-400 text-sm'>
                {item.variation.type} - {item.variation.name}
              </span>
            </div>
          </div>
        )
      case 'price':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm'>
              <PriceComp price={item.price} size='sm' />
            </p>
            <p className='text-bold text-sm text-default-400 line-through'>
              <PriceComp price={item.oldPrice} fontSize={12} />
            </p>
          </div>
        )
      case 'total_price':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm'>
              <PriceComp price={item.price * item.quantity} size='sm' />
            </p>
            <p className='text-bold text-sm text-default-400'>{}</p>
          </div>
        )
      case 'quantity':
        return (
          <div className='flex items-center gap-2'>
            {!viewOnly && (
              <Button isIconOnly variant='light' radius='full' size='sm' onClick={() => handleChangeQuantity(item, -1)}>
                <FaMinus />
              </Button>
            )}
            <Chip className='capitalize' size='sm' variant='flat'>
              {cellValue}
            </Chip>
            {!viewOnly && (
              <Button isIconOnly variant='light' radius='full' size='sm' onClick={() => handleChangeQuantity(item, +1)}>
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
              onClick={() => handleRemoveProduct(item)}
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

  useEffect(() => {
    console.log(products)
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
            <TableRow key={item.variationId}>
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
        {/* {viewOnly && <div></div>} */}
        <div className={'flex flex-col md:flex-row gap-4 items-center justify-between' + (viewOnly ? ' w-full' : '')}>
          <div className='flex flex-col items-center md:items-end'>
            <span>Tổng thanh toán [{products.length} sản phẩm]</span>
            <span className='font-semibold'>
              <PriceComp price={totalPrice} size='md' color='#338cf1' />
            </span>
          </div>
          {viewOnly ? (
            <Button
              color='primary'
              className='md:w-60 w-full'
              size='lg'
              onClick={onClick}
              disabled={products.length === 0}
            >
              Thanh toán
            </Button>
          ) : (
            <Button className='mt-4' color='primary' size='lg' onClick={onClick}>
              Đặt hàng
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
