import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useFormik } from 'formik'
import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '~/app/hook'
import { DetailCartComp } from '~/components/cart/cart-detail'
import { PaneComp } from '~/components/pane'
import { PurchaseInformationComp } from '~/components/purchase/purchase-info'
import { ModalPurchaseOnline } from '~/components/purchase/purchase-online'
import { selectCart } from '~/hooks/order/order.slice'
import { OrderConfirmPayload } from '~/models/order'
import orderService from '~/services/order.service'

export const ViewPurchasePage = () => {
  const cart = useAppSelector(selectCart)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isConfirmBanking, setConfirmBanking] = useState(false)

  const initialInfomation: OrderConfirmPayload = useMemo(
    () => ({
      orderId: 0,
      fullName: '',
      email: '',
      phoneNumber: '',
      province: '',
      district: '',
      ward: '',
      street: '',
      note: '',
      paymentMethod: 'cod'
    }),
    []
  )

  const payload = useFormik({
    initialValues: initialInfomation,
    onSubmit: (values) => {
      orderService.purchase(values).then((res) => {
        if (res.status === 200) {
          alert('Đặt hàng thành công')
        } else {
          alert('Đặt hàng thất bại')
        }
      })
    },
    validateOnBlur: true,
    validateOnChange: false
  })

  const handlePay = () => {
    if (
      payload.values.province === '' ||
      payload.values.district === '' ||
      payload.values.ward === '' ||
      payload.values.street === ''
    ) {
      alert('Vui lòng nhập đầy đủ thông tin địa chỉ giao hàng')
      return
    }

    if (payload.values.fullName === '' || payload.values.phoneNumber === '') {
      alert('Vui lòng nhập đầy đủ thông tin liên hệ')
      return
    }

    if (payload.values.paymentMethod === 'cod') {
      payload.handleSubmit()
    } else {
      onOpen()
    }
  }

  useEffect(() => {
    payload.setFieldValue('orderId', cart?.id || 0)
  }, [cart])

  useEffect(() => {
    if (isConfirmBanking) {
      payload.handleSubmit()
      setConfirmBanking(false)
    }
  }, [isConfirmBanking])

  return (
    <div>
      <PaneComp header='Thanh toán' className='mx-2 mt-4'>
        <div className='bg-white pb-4'>
          <div>
            <div className='text-2xl font-semibold p-4'>Thông tin thanh toán</div>
            <PurchaseInformationComp payload={payload} className='mx-2 grid md:grid-cols-2 gap-4 mb-8' />
          </div>
          <div>
            <div className='text-2xl font-semibold p-4'>Thông tin đơn hàng</div>
            <DetailCartComp products={cart?.orderDetails || []} viewOnly={true} onClick={handlePay} />
          </div>
        </div>
      </PaneComp>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setConfirmBanking(false)
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Thông tin thanh toán</ModalHeader>
              <ModalBody>
                <ModalPurchaseOnline />
              </ModalBody>
              <ModalFooter>
                <Button onClick={onClose} color='danger' variant='light'>
                  Hủy
                </Button>
                <Button color='primary' onClick={() => setConfirmBanking(true)}>
                  Xác nhận đã thanh toán
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
