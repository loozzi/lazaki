import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaEye, FaLock, FaUnlock } from 'react-icons/fa'
import { UserInfoDetailComp } from '~/components/admin/user-detail'
import { User } from '~/models/user'

const columns = [
  { name: 'Họ và tên', uid: 'name' },
  { name: 'Email', uid: 'email' },
  { name: 'Trạng thái', uid: 'status' },
  { name: 'Hành động', uid: 'actions' }
]

export const ViewAdminManageUserPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [pagination, setPagination] = useState({ page: 1, limit: 10 } as { page: number; limit: number })

  const handleToggleUserStatus = (id: number) => {
    // Call API here
    console.log(id)
  }

  useEffect(() => {
    setUsers([
      {
        id: 1,
        fullName: 'Nguyen Van A',
        email: 'nguyenquangthao@gmail',
        status: 'active',
        birthday: '1999-01-01',
        gender: 'male',
        address: {
          id: 1,
          phoneNumber: '0123456789',
          province: 'Hanoi',
          district: 'Cau Giay',
          ward: 'Nghia Do',
          street: 'Xuan Thuy'
        }
      },
      {
        id: 2,
        fullName: 'Nguyen Van B',
        email: 'nguyenquangthao@gmail',
        status: 'active',
        birthday: '1999-01-01',
        gender: 'male',
        address: {
          id: 1,
          phoneNumber: '0123456789',
          province: 'Hanoi',
          district: 'Cau Giay',
          ward: 'Nghia Do',
          street: 'Xuan Thuy'
        }
      },
      {
        id: 3,
        fullName: 'Nguyen Van C',
        email: 'nguyenquangthao@gmail',
        status: 'deactive',
        birthday: '1999-01-01',
        gender: 'male',
        address: {
          id: 1,
          phoneNumber: '0123456789',
          province: 'Hanoi',
          district: 'Cau Giay',
          ward: 'Nghia Do',
          street: 'Xuan Thuy'
        }
      }
    ])
  }, [])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibol mb-4'>Quản lý người dùng</h1>
      <Input
        placeholder='Tìm kiếm người dùng'
        label='Tìm kiếm'
        isClearable
        radius='lg'
        classNames={{
          label: 'text-black/50 dark:text-white/90',
          input: [
            'bg-transparent',
            'text-black/90 dark:text-white/90',
            'placeholder:text-default-700/50 dark:placeholder:text-white/60'
          ],
          innerWrapper: 'bg-transparent',
          inputWrapper: [
            'shadow-xl',
            'bg-default-200/50',
            'dark:bg-default/60',
            'backdrop-blur-xl',
            'backdrop-saturate-200',
            'hover:bg-default-200/70',
            'dark:hover:bg-default/70',
            'group-data-[focus=true]:bg-default-200/50',
            'dark:group-data-[focus=true]:bg-default/60',
            '!cursor-text',
            'mb-4'
          ]
        }}
        startContent={<CiSearch />}
      />
      <Table aria-label='Example table with custom cells'>
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align='center'>
              <span className={column.uid === 'actions' ? 'flex justify-center' : ''}>{column.name}</span>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.fullName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.status === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'}</TableCell>
              <TableCell className='flex gap-2 justify-center'>
                <Button color='secondary' variant='ghost' isIconOnly onClick={() => setSelectedUser(item)}>
                  <FaEye />
                </Button>
                {item.status === 'active' ? (
                  <Button isIconOnly color='danger' variant='ghost' onClick={() => handleToggleUserStatus(item.id)}>
                    <FaLock />
                  </Button>
                ) : (
                  <Button isIconOnly color='primary' variant='ghost' onClick={() => handleToggleUserStatus(item.id)}>
                    <FaUnlock />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination className='flex justify-center mt-2' total={3} page={1} />

      <Modal isOpen={!!selectedUser} onOpenChange={() => setSelectedUser(undefined)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Thông tin chi tiết</ModalHeader>
              <ModalBody>{selectedUser && <UserInfoDetailComp user={selectedUser} />}</ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={() => {
                    setSelectedUser(undefined)
                    onClose()
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
