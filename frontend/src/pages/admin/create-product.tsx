import { Button, Tab, Tabs } from '@nextui-org/react'
import { useFormik } from 'formik'
import { useMemo } from 'react'
import { FaImages, FaInfo, FaPlus, FaSitemap } from 'react-icons/fa'
import { AdminProductInfoComp } from '~/components/admin/product/AdminProductInfoComp'
import { AdminCreateVariationComp } from '~/components/admin/product/create-variation'
import { AdminProductImageComp } from '~/components/admin/product/image'
import { history } from '~/configs/history'
import routes from '~/configs/routes'
import { ProductCreatePayload } from '~/models/product'
import adminService from '~/services/admin.service'

export const ViewAdminCreateProductPage = () => {
  const initialValues: ProductCreatePayload = useMemo(
    () => ({
      productName: '',
      slug: '',
      description: '',
      properties: [],

      images: [],
      categories: [],
      variations: []
    }),
    []
  )

  const payload = useFormik({
    initialValues,
    onSubmit: (value) => {
      console.log(value)
    }
  })

  const handleCreateProduct = () => {
    if (!payload.values.productName || !payload.values.slug) {
      alert('Vui lòng nhập tên và slug cho sản phẩm')
      return
    }
    if (!payload.values.variations.length) {
      alert('Vui lòng thêm ít nhất một biến thể cho sản phẩm')
      return
    }
    if (!payload.values.images.length) {
      alert('Vui lòng thêm ít nhất một hình ảnh cho sản phẩm')
      return
    }

    if (!payload.values.images.some((x) => x.isPrimary)) {
      payload.setFieldValue(
        'images',
        payload.values.images.map((x, i) => ({ ...x, isPrimary: i === 0 }))
      )
    }

    adminService.product.create(payload.values).then((res) => {
      if (res.status === 200) history.push(routes.admin.productDetail.replace(':slug', res.data!.slug))
    })
  }

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibol mb-4'>Thêm sản phẩm mới</h1>
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
            <AdminProductInfoComp payload={payload} />
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
            <AdminCreateVariationComp payload={payload} />
          </Tab>
        </Tabs>
      </div>
      <Button
        color='primary'
        className='fixed bottom-4 right-4'
        startContent={<FaPlus />}
        onClick={handleCreateProduct}
      >
        Thêm sản phẩm
      </Button>
    </div>
  )
}
