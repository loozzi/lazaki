export function parseDateToDMY(dateString: string) {
  const date = new Date(dateString)

  // Lấy ngày, tháng và năm
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript từ 0-11
  const year = date.getFullYear()

  // Trả về chuỗi theo định dạng dd/mm/yyyy
  return `${day}/${month}/${year}`
}

export function PaymentMethodName(method: string) {
  switch (method) {
    case 'cod':
      return 'Thanh toán khi nhận hàng'
    case 'momo':
      return 'Ví MoMo'
    case 'zalopay':
      return 'Ví ZaloPay'
    case 'visa':
      return 'Thẻ Visa/MasterCard'
    case 'banking':
      return 'Thanh toán online'
    default:
      return 'Thanh toán khi nhận hàng'
  }
}

export function PaymentStatusName(status: string) {
  switch (status) {
    case 'unpaid':
      return 'Chưa thanh toán'
    case 'paid':
      return 'Đã thanh toán'
    default:
      return 'Chưa thanh toán'
  }
}

export function OrderStatusName(status: string) {
  switch (status) {
    case 'order':
      return 'Giỏ hàng'
    case 'cancel':
      return 'Đã hủy'
    case 'shipping':
      return 'Đang giao hàng'
    case 'preparing':
      return 'Đang chuẩn bị'
    case 'success':
      return 'Thành công'
    default:
      return 'Đã đặt hàng'
  }
}
