import { OrderStatusType, PaymentMethodType, PaymentStatusType } from './models/order'

export function parseDateToDMY(dateString: string) {
  const date = new Date(dateString)

  // Lấy ngày, tháng và năm
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript từ 0-11
  const year = date.getFullYear()

  // Trả về chuỗi theo định dạng dd/mm/yyyy
  return `${day}/${month}/${year}`
}

export function parseTimeToHM(dateString: string) {
  // Parse the input string into a Date object
  const date = new Date(dateString)

  // Check if the parsing was successful
  if (isNaN(date.getTime())) {
    return 'Invalid date string'
  }

  // Format the date and time
  const formattedDate =
    date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) +
    ' - ' +
    date.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })

  return formattedDate
}

export function PaymentMethodName(method: PaymentMethodType) {
  switch (method) {
    case 'cod':
      return 'Thanh toán khi nhận hàng'
    case 'banking':
      return 'Thanh toán online'
    default:
      return 'Thanh toán khi nhận hàng'
  }
}

export function PaymentStatusName(status: PaymentStatusType) {
  switch (status) {
    case 'unpaid':
      return 'Chưa thanh toán'
    case 'paid':
      return 'Đã thanh toán'
    default:
      return 'Chưa thanh toán'
  }
}

export function OrderStatusName(status: OrderStatusType) {
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

export const OrderStatusColor = (status: OrderStatusType) => {
  switch (status) {
    case 'success':
      return 'success'
    case 'order':
      return 'warning'
    case 'cancel':
      return 'danger'
    case 'shipping':
      return 'secondary'
    case 'preparing':
      return 'warning'
    default:
      return 'default'
  }
}

export function stringToSlug(str: string) {
  // remove accents
  var from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ',
    to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy'
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], 'gi'), to[i])
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, '-')
    .replace(/-+/g, '-')

  return str
}
