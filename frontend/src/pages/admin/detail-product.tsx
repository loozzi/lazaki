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
    console.log(payload.values)
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
        },
        {
          id: 2,
          type: 'Color',
          name: 'Blue',
          option: 'XL',
          image: '',
          price: 10300,
          oldPrice: 0,
          quantity: 10,
          sold: 0
        },
        {
          id: 3,
          type: 'Color',
          name: 'Green',
          option: 'XL',
          image: '',
          price: 4523000,
          oldPrice: 1203981,
          quantity: 10,
          sold: 0
        }
      ],
      images: [
        {
          link: 'https://via.placeholder.com/150',
          isPrimary: true
        },
        {
          link: 'https://via.placeholder.com/250',
          isPrimary: false
        },
        {
          link: 'https://via.placeholder.com/152',
          isPrimary: false
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
