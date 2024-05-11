import { PaneComp } from '../pane'

interface DescriptionItemProps {
  item: any
  className?: string
}

export const DescriptionItemComp = (props: DescriptionItemProps) => {
  const { item, className } = props
  return (
    <PaneComp header='Mô tả' className={className}>
      <div className='p-4 bg-white rounded-b-lg mx-2 lg:mx-0'>{item.description}</div>
    </PaneComp>
  )
}
