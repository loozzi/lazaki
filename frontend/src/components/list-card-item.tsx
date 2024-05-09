import { CardItem } from './card-item'

interface ListCardItemProps {
  heading: string
  items: any[]
  className?: string
}

export const ListCardItemComp = (props: ListCardItemProps) => {
  const { heading, items, className } = props

  return (
    <div className={className}>
      <div
        className='text-2xl text-center p-4 bg-white rounded-t-lg'
        style={{
          borderBottom: '4px solid #338cf1',
          textTransform: 'uppercase'
        }}
      >
        {heading}
      </div>
      <div className='grid gap-4 grid-cols-5 mt-2 p-2'>
        {items.map((item, index) => (
          <CardItem key={index} item={item} size='md' />
        ))}
      </div>
    </div>
  )
}
