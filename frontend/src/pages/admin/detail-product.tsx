import { Button, Tab, Tabs } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { FaImages, FaInfo, FaSitemap } from 'react-icons/fa6'
import { useParams } from 'react-router'
import { AdminProductImageComp } from '~/components/admin/product/image'
import { AdminProductInfoComp } from '~/components/admin/product/AdminProductInfoComp'
import { AdminProductVariationComp } from '~/components/admin/product/variation'
import { ProductDetailResponse, ProductCreatePayload } from '~/models/product'
import { FaEdit } from 'react-icons/fa'
import { useFormik } from 'formik'

export const ViewAdminManageDetailProductPage = () => {
  const params = useParams()
  const [product, setProduct] = useState<ProductDetailResponse | null>(null)

  const inititalPayload: ProductCreatePayload = useMemo(
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
    console.log(payload.values)
  }

  useEffect(() => {
    const { slug } = params
    console.log(slug)

    const product = {
      id: 1,
      name: 'Product 1',
      slug: 'sample-product-1',
      categories: [
        {
          id: 1,
          name: 'Category 1',
          slug: 'category-1',
          description: 'Lorem   '
        },
        {
          id: 2,
          name: 'Category 2',
          slug: 'category-2',
          description: 'Lorem   '
        }
      ],
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, ex eu tincidunt ultricies, nunc magna fermentum nunc, nec auctor felis metus nec nunc. Ut euismod, dolor ac tincidunt ultricies, nunc magna fermentum nunc, nec auctor felis metus nec nunc. Ut euismod, dolor ac tincidunt ultricies, nunc magna fermentum nunc, nec auctor felis metus nec nunc. Ut euismod, dolor ac tincidunt ultricies, nunc magna fermentum nunc, nec auctor felis metus nec nunc. Ut euismod, dolor ac tincidunt ultricies, nunc magna fermentum nunc, nec auctor felis metus nec nunc. Ut euismod, dolor ac tincidunt ultricies, nunc magna fermentum nunc, nec auctor felis metus nec nunc. Ut euismod, dolor ac tincidunt ultricies, nunc magna fermentum nunc, nec auctor felis metus nec nunc. Ut euismod, dolor ac tincidunt ultricies, nunc magna fermentum nunc, nec auctor felis metus nec nunc. Ut euismod, dolor ac tincidunt ultricies, nunc magna fermentum nunc, nec auctor felis metus nec nunc.',
      properties: [
        {
          name: 'Branch',
          value: 'Xiaomi'
        },
        {
          name: 'Type',
          value: 'Mobile'
        }
      ],
      variations: [
        {
          id: 1,
          type: 'Color',
          name: 'Red',
          option: 'XL',
          image: '',
          price: 10000,
          oldPrice: 0,
          quantity: 10,
          sold: 0
        }
      ],
      images: [
        {
          link: '',
          isPrimary: true
        }
      ]
    }

    setProduct(product)
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
  }, [params])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibol mb-4'>Quản lý chi tiết sản phẩm</h1>
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
            <AdminProductImageComp images={product?.images || []} />
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
            <AdminProductVariationComp variations={product?.variations || []} />
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
