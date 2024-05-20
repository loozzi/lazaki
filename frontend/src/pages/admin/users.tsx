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
import { PaginationParams, PaginationState } from '~/models/response'
import { User } from '~/models/user'
import adminService from '~/services/admin.service'

const columns = [
  { name: 'Họ và tên', uid: 'name' },
  { name: 'Email', uid: 'email' },
  { name: 'Trạng thái', uid: 'status' },
  { name: 'Hành động', uid: 'actions' }
]

export const ViewAdminManageUserPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    total: 0,
    perPage: 10
  })

  const handleToggleUserStatus = (id?: number) => {
    // Call API here
    if (!id) return
    adminService.user.update(id).then((res) => {
      if (res.status === 200) {
        setUsers((prev) => {
          return prev.map((user) => {
            if (user.id === id) {
              return {
                ...user,
                status: user.status === 'active' ? 'deactive' : 'active'
              }
            }
            return user
          })
        })
      }
    })
  }

  useEffect(() => {
    const param: PaginationParams = {
      page: pagination.currentPage
    }
    adminService.user.get(param).then((res) => {
      if (res.status === 200) {
        setUsers(res.data?.data || [])
        setPagination({
          ...pagination,
          total: res.data?.total || 0,
          currentPage: res.data?.currentPage || 1,
          perPage: res.data?.perPage || 10
        })
      }
    })
  }, [pagination.currentPage])

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-semibol mb-4'>Quản lý người dùng</h1>

      <Table
        aria-label='Example table with custom cells'
        topContent={
          <Input
            placeholder='Tìm kiếm người dùng'
            label='Tìm kiếm'
            isClearable
            radius='lg'
            startContent={<CiSearch />}
            disabled={true}
          />
        }
        bottomContent={
          <Pagination
            className='flex justify-center mt-2'
            total={Math.ceil(pagination.total / pagination.perPage)}
            page={pagination.currentPage}
            onChange={(e) =>
              setPagination({
                ...pagination,
                currentPage: e
              })
            }
          />
        }
        isStriped
      >
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
              <TableCell width={150}>{item.status === 'active' ? 'Kích hoạt' : 'Vô hiệu hóa'}</TableCell>
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
