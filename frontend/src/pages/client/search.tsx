import { SearchFilterComp } from '~/components/search/filter'
import { ListSearchProductComp } from '~/components/search/list-product'

export const ViewSearchPage = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 mt-4 mx-2 gap-4'>
      <SearchFilterComp className='col-span-1 md:col-span-2 lg:col-span-1' />
      <ListSearchProductComp className='col-span-1 md:col-span-2 lg:col-span-3' />
    </div>
  )
}
