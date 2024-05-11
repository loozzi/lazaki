import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { MdOutlinePreview } from 'react-icons/md'
import { PriceComp } from '../price'
import { HistoryDetailComp } from './history-detail'

interface HistoryCompProps {
  history: any
  className?: string
}

export const HistoryComp = (props: HistoryCompProps) => {
  const { history, className } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleOpen = () => {
    onOpen()
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <div className={className}>
      <div className='p-4 bg-white rounded-md border-1 border-gray-200'>
        <div className='flex justify-between gap-4 items-center border-b-1 border-gray-200 pb-2'>
          <div className='text-gray-400'>{history.date}</div>
          <div className='text-lg font-semibold capitalize'>{history.status}</div>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
          {history.items.map((item: any) => (
            <div key={item.id} className='flex justify-between gap-4 border-b-1 border-gray-200 pb-2'>
              <div className='flex gap-4 items-center'>
                <Image src={item.image} alt={item.name} className='w-20 h-20 object-cover' />
                <div className='flex flex-col gap-2'>
                  <div className='text-lg font-semibold'>{item.name}</div>
                  <div className='flex gap-4'>
                    <div className='text-sm text-gray-500'>Số lượng: {item.quantity}</div>
                  </div>
                </div>
              </div>
              <div className='flex gap-4 items-center'>
                <div className='text-sm text-blue-500'>
                  <PriceComp price={item.price} size='sm' />
                </div>
                <div className='text-sm text-gray-500  line-through'>
                  <PriceComp price={item.old_price} size='sm' />
                </div>
              </div>
            </div>
          ))}
          <div className='flex justify-between items-end gap-4'>
            <div>
              <Button
                color='primary'
                variant='ghost'
                size='md'
                startContent={<MdOutlinePreview size={24} />}
                onClick={handleOpen}
              >
                Xem chi tiết
              </Button>
            </div>
            <div className='text-lg font-semibold flex gap-2'>
              Thành tiền: <PriceComp price={history.total} color='#3b82f6' />
            </div>
          </div>
        </div>
      </div>
      <Modal size='2xl' isOpen={isOpen} onClose={handleClose} scrollBehavior='inside'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Chi tiết đơn hàng</ModalHeader>
              <ModalBody className='overflow-auto'>
                <HistoryDetailComp history={history} />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Đóng
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
