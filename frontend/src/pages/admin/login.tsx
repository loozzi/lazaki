import { Button, Input } from '@nextui-org/react'
import { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

export const ViewAdminLoginPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    console.group('Login')
    console.log('username:', username)
    console.log('password:', password)
    console.groupEnd()
  }

  return (
    <div className='flex justify-center items-center w-full h-[100vh]'>
      <div className='flex flex-col gap-4 mx-4'>
        <h1 className='text-3xl'>Đăng nhập trang quản trị</h1>
        <div className='flex flex-col gap-4'>
          <Input placeholder='Tài khoản' value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input
            placeholder='Mật khẩu'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button color='primary' variant='solid' startContent={<FaSignInAlt />} onClick={handleLogin}>
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  )
}
