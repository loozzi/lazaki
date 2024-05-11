export function parseDateToDMY(dateString: string) {
  const date = new Date(dateString)

  // Lấy ngày, tháng và năm
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0') // Tháng trong JavaScript từ 0-11
  const year = date.getFullYear()

  // Trả về chuỗi theo định dạng dd/mm/yyyy
  return `${day}/${month}/${year}`
}
