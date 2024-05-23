import { Button, Tab, Tabs } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { FaImages, FaInfo, FaSitemap } from 'react-icons/fa6'
import { useParams } from 'react-router'
import { AdminProductImageComp } from '~/components/admin/product/image'
import { AdminProductInfoComp } from '~/components/admin/product/AdminProductInfoComp'
import { AdminProductVariationComp } from '~/components/admin/product/variation'
import { ProductDetailResponse, ProductUpdatePayload } from '~/models/product'
import { FaEdit } from 'react-icons/fa'
import { useFormik } from 'formik'
import adminService from '~/services/admin.service'
import { history } from '~/configs/history'
import routes from '~/configs/routes'
import productService from '~/services/product.service'

export const ViewAdminManageDetailProductPage = () => {
  const params = useParams()
  const [product, setProduct] = useState<ProductDetailResponse | null>(null)

  const inititalPayload: ProductUpdatePayload = useMemo(
    () => ({
      productId: 0,
      productName: '',
      slug: '',
      description: '',
      properties: [],
      addVariations: [],
      removeVariations: [],
      editVariations: [],
      images: [],
      categories: []
    }),
    []
  )

  const payload = useFormik({
    initialValues: inititalPayload,
    onSubmit: (value) => {
      console.log(value)
    }
  })

  const handleUpdateProduct = () => {
    adminService.product.update(payload.values).then((res) => {
      if (res.status === 200) {
        alert('Cập nhật sản phẩm thành công')
        history.push(routes.admin.product)
      }
    })
  }

  const handleRemoveProduct = () => {
    const confirmStatus = confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')
    if (confirmStatus) {
      adminService.product.delete(product?.slug || '').then((res) => {
        if (res.status === 200) {
          alert('Xóa sản phẩm thành công')
          history.push(routes.admin.product)
        }
      })
    }
  }

  useEffect(() => {
    const { slug } = params

    productService.detail(slug || '').then((res) => {
      setProduct(res.data)
    })
  }, [params])

  useEffect(() => {
    if (product) {
      payload.setValues({
        productId: product.id,
        productName: product.name,
        slug: product.slug,
        description: product.description,
        properties: product.properties,
        addVariations: [],
        removeVariations: [],
        editVariations: [],
        images: product.images,
        categories: product.categories.map((e) => e.id)
      })
      document.title = product.name
    }
  }, [product])

  return (
    <div className='p-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibol mb-4'>Quản lý chi tiết sản phẩm </h1>
        <Button color='danger' className='mb-4' onClick={handleRemoveProduct}>
          Xóa sản phẩm
        </Button>
      </div>
      <div className=''>
        <Tabs aria-label='options' color='primary' variant='bordered'>
          <Tab
            key='info'
            title={
              <div className='flex items-center space-x-2'>
                <FaInfo />
                <span>Thông tin</span>
              </div>
            }
          >
            {product && <AdminProductInfoComp payload={payload} />}
          </Tab>
          <Tab
            key='properties'
            title={
              <div className='flex items-center space-x-2'>
                <FaImages />
                <span>Hình ảnh</span>
              </div>
            }
          >
            <AdminProductImageComp payload={payload} />
          </Tab>
          <Tab
            key='variations'
            title={
              <div className='flex items-center space-x-2'>
                <FaSitemap />
                <span>Phân loại</span>
              </div>
            }
          >
            <AdminProductVariationComp payload={payload} variations={product?.variations || []} />
          </Tab>
        </Tabs>
      </div>
      <Button
        color='primary'
        className='fixed bottom-4 right-4'
        startContent={<FaEdit />}
        onClick={handleUpdateProduct}
      >
        Cập nhật thông tin
      </Button>
    </div>
  )
}
