import { Pagination } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { OrderHistoryResponse } from '~/models/order'
import orderService from '~/services/order.service'
import { PaneComp } from '../pane'
import { HistoryComp } from './history'

interface HistoryPurchaseProps {
  className?: string
}

export const HistoryPurchaseComp = (props: HistoryPurchaseProps) => {
  const { className } = props
  const [histories, setHistories] = useState<OrderHistoryResponse[]>([])
  const [pagination, setPagination] = useState<{
    currentPage: number
    perPage: number
    total: number
  }>({
    currentPage: 1,
    perPage: 10,
    total: 0
  })

  useEffect(() => {
    orderService.histories().then((res) => {
      if (res.status === 200) {
        setHistories(res.data?.data || [])
        setPagination({
          currentPage: res.data?.currentPage || 1,
          perPage: res.data?.perPage || 10,
          total: res.data?.total || 0
        })
      }
    })
  }, [pagination.currentPage])

  return (
    <div className={className}>
      <PaneComp header='Lịch sử mua hàng' className='bg-white flex flex-col space-y-4 rounded-md'>
        <div className='p-4 pt-0 space-y-4'>
          {histories.map((history) => (
            <HistoryComp history={history} />
          ))}
          <Pagination
            total={Math.ceil(pagination.total / pagination.perPage)}
            page={pagination.currentPage}
            onChange={(e) =>
              setPagination({
                ...pagination,
                currentPage: e
              })
            }
            className='flex justify-center'
          />
        </div>
      </PaneComp>
    </div>
  )
}
