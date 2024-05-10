import { CardItem } from './item/card-item'
import { PaneComp } from './pane'

interface ListCardItemProps {
  heading: string
  items: any[]
  className?: string
}

export const ListCardItemComp = (props: ListCardItemProps) => {
  const { heading, items, className } = props

  return (
    <PaneComp header={heading} className={className}>
      <div className='grid gap-4 lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 mt-2 p-2'>
        {items.map((item, index) => (
          <CardItem key={index} item={item} size='md' />
        ))}
      </div>
    </PaneComp>
  )
}
