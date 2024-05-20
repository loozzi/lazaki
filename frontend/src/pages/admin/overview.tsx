import { Card, CardBody, CardHeader } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import routes from '~/configs/routes'
import { AdminOverviewResponse } from '~/models/admin'
import adminService from '~/services/admin.service'

export const ViewOverviewPage = () => {
  const [overviewWeek, setOverviewWeek] = useState<AdminOverviewResponse | null>(null)
  const [overviewMonth, setOverviewMonth] = useState<AdminOverviewResponse | null>(null)

  useEffect(() => {
    adminService.overview({ time: 'week', type: 'all' }).then((res) => {
      if (res.status === 200 && res.data) setOverviewWeek(res.data)
    })
    adminService.overview({ time: 'month', type: 'all' }).then((res) => {
      if (res.status === 200 && res.data) setOverviewMonth(res.data)
    })
  }, [])
  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibol mb-4'>Tổng quan</h1>
      <div className='grid grid-cols-1 gap-4'>
        <div className='bg-sky-100 p-4 rounded-lg'>
          <h2 className='text-xl font-semibold mb-2'>Sản phẩm</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <Card as={Link} to={routes.admin.category}>
              <CardHeader className='text-xl'>Số lượng danh mục</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewMonth?.totalCategory}</CardBody>
            </Card>
            <Card>
              <CardHeader as={Link} to={routes.admin.product} className='text-xl'>
                Số lượng sản phẩm
              </CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewMonth?.totalProduct}</CardBody>
            </Card>
            <Card as={Link} to={routes.admin.users}>
              <CardHeader className='text-xl'>Số lượng thành viên</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewMonth?.totalCustomer}</CardBody>
            </Card>
          </div>
        </div>
        <div className='bg-sky-100 p-4 rounded-lg'>
          <h2 className='text-xl font-semibold mb-2'>Doanh thu - Tuần</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Card as={Link} to={routes.admin.order}>
              <CardHeader className='text-xl'>Số lượng đơn hàng</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewWeek?.totalOrder}</CardBody>
            </Card>
            <Card>
              <CardHeader className='text-xl'>Doanh thu</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewWeek?.totalRevenue.toLocaleString()} VNĐ</CardBody>
            </Card>
            <Card>
              <CardHeader className='text-xl'>Đơn hàng chờ xử lý</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewWeek?.pendingOrder}</CardBody>
            </Card>
            <Card>
              <CardHeader className='text-xl'>Đơn hàng đã hoàn thành</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewWeek?.completedOrder}</CardBody>
            </Card>
          </div>
        </div>
        <div className='bg-sky-100 p-4 rounded-lg'>
          <h2 className='text-xl font-semibold mb-2'>Doanh thu - Tháng</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            <Card as={Link} to={routes.admin.order}>
              <CardHeader className='text-xl'>Số lượng đơn hàng</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewMonth?.totalOrder}</CardBody>
            </Card>
            <Card>
              <CardHeader className='text-xl'>Doanh thu</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewMonth?.totalRevenue.toLocaleString()} VNĐ</CardBody>
            </Card>
            <Card>
              <CardHeader className='text-xl'>Đơn hàng chờ xử lý</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewMonth?.pendingOrder}</CardBody>
            </Card>
            <Card>
              <CardHeader className='text-xl'>Đơn hàng đã hoàn thành</CardHeader>
              <CardBody className='font-semibold text-3xl'>{overviewMonth?.completedOrder}</CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
