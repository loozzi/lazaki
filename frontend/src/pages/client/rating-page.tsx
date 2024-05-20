import { useEffect } from 'react'
import { useParams } from 'react-router'
import { HistoryDetailComp } from '~/components/history/history-detail'

export const ViewRatingPage = () => {
  const params = useParams()
  const { orderId } = params

  useEffect(() => {
    console.log(orderId)
  }, [])

  return (
    <div className='mt-4'>
      <HistoryDetailComp historyId={parseInt(orderId || '0')} />
    </div>
  )
}
