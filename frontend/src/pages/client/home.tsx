import { ListCardItemComp } from '~/components/list-card-item'

export const HomePage = () => {
  return (
    <div>
      <ListCardItemComp
        className='mt-4'
        heading='Gợi ý sản phẩm'
        items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
      />
      <ListCardItemComp
        className='mt-4'
        heading='Gợi ý cho bạn'
        items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]}
      />
    </div>
  )
}
