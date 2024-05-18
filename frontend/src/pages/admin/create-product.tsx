import { Button, Tab, Tabs } from '@nextui-org/react'
import { useFormik } from 'formik'
import { useMemo } from 'react'
import { FaImages, FaInfo, FaPlus, FaSitemap } from 'react-icons/fa'
import { AdminProductInfoComp } from '~/components/admin/product/AdminProductInfoComp'
import { AdminCreateVariationComp } from '~/components/admin/product/create-variation'
import { AdminProductImageComp } from '~/components/admin/product/image'
import { ProductCreatePayload } from '~/models/product'

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
    console.log(payload.values)
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
