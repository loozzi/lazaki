import { ProductResponse } from '~/models/product'
import { CardItem } from './item/card-item'
import { PaneComp } from './pane'

interface ListCardItemProps {
  heading: string
  items: ProductResponse[]
  className?: string
  isColumn?: boolean
}

export const ListCardItemComp = (props: ListCardItemProps) => {
  const { heading, items, className, isColumn } = props

  return (
    <PaneComp header={heading} className={className}>
      <div
        className={
          isColumn
            ? 'grid gap-4 grid-cols-2 md:grid-cols-1 mt-4 mx-2 lg:mx-0'
            : 'grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 mt-2 p-2'
        }
      >
        {items.map((item, index) => (
          <CardItem key={index} item={item} size='md' />
        ))}
      </div>
    </PaneComp>
  )
}
