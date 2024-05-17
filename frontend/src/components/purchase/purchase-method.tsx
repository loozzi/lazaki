import { Select, SelectItem, Textarea } from '@nextui-org/react'

interface PurchaseMethodCompProps {
  className?: string
  payload: any
}

export const PurchaseMethodComp = (props: PurchaseMethodCompProps) => {
  const { className, payload } = props

  return (
    <div className={className}>
      <Select
        label='Chọn phương thức thanh toán'
        required
        onChange={(e) => payload.setFieldValue('method', e.target.value)}
        selectedKeys={[payload.values.paymentMethod]}
      >
        <SelectItem key='cod' value='cod'>
          Thanh toán khi nhận hàng
        </SelectItem>
        <SelectItem key='momo' value='momo'>
          Thanh toán qua ngân hàng
        </SelectItem>
      </Select>
      <Textarea
        className='row-auto'
        label='Ghi chú'
        type='text'
        minRows={8}
        value={payload.values.note}
        onChange={(e) => payload.setFieldValue('note', e.target.value)}
      />
    </div>
  )
}
