import { Pagination } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { SearchFilterComp } from '~/components/search/filter'
import { ListSearchProductComp } from '~/components/search/list-product'
import { ProductResponse, ProductSearchParams } from '~/models/product'
import { PaginationState } from '~/models/response'
import productService from '~/services/product.service'

export const ViewSearchPage = () => {
  document.title = 'Tìm kiếm sản phẩm'
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    perPage: 12,
    total: 0
  })

  const [loading, setLoading] = useState<boolean>(false)

  const location = useLocation()
  useEffect(() => {
    // Call API to get products
    const searchParams = new URLSearchParams(location.search)
    const q = searchParams.get('q') || undefined
    const maxPrice = searchParams.get('maxPrice') || undefined
    const minPrice = searchParams.get('minPrice') || undefined
    const categories = searchParams.get('categories') || undefined
    const sort = searchParams.get('sort') || undefined
    const params: ProductSearchParams = {
      keyword: q,
      maxPrice: maxPrice ? +maxPrice : undefined,
      minPrice: minPrice ? +minPrice : undefined,
      categories: categories,
      page: pagination.currentPage,
      limit: pagination.perPage,
      sort: sort
    }
    setLoading(true)
    setProducts([])
    productService
      .search(params)
      .then((response) => {
        setProducts(response.data?.data || [])
        setPagination({
          currentPage: response.data?.currentPage || 1,
          perPage: response.data?.perPage || 10,
          total: response.data?.total || 0
        })
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [location, pagination.currentPage])

  return (
    <div className='grid grid-cols-1 md:grid-cols-4 mt-4 mx-2 gap-4'>
      <SearchFilterComp className='col-span-1 md:col-span-2 lg:col-span-1' />
      <ListSearchProductComp
        className='col-span-1 md:col-span-2 lg:col-span-3'
        products={products || []}
        loading={loading}
        bottomContent={
          <Pagination
            total={Math.ceil(pagination.total / pagination.perPage)}
            page={pagination.currentPage}
            onChange={(e) =>
              setPagination({
                ...pagination,
                currentPage: e
              })
            }
            className='mt-2'
          />
        }
      />
    </div>
  )
}
