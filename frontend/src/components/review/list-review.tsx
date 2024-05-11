import { PaneComp } from '../pane'
import { ViewReviewComp } from './review'

interface ListViewReviewProps {
  reviews: any[]
  className?: string
}

export const ListViewReviewComp = (props: ListViewReviewProps) => {
  const { reviews, className } = props

  return (
    <PaneComp header='Đánh giá sản phẩm' className={className}>
      <div className='p-4 bg-white rounded-b-lg mx-2 lg:mx-0 grid md:grid-cols-1 grid-cols-1'>
        {reviews.map((review, index) => (
          <ViewReviewComp key={index} review={review} />
        ))}
      </div>
    </PaneComp>
  )
}
