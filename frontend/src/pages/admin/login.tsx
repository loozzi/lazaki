import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { history } from '~/configs/history'
import routes from '~/configs/routes'
import authService from '~/services/auth.service'

export const ViewAdminLoginPage = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = () => {
    authService.adminSignIn({ username, password }).then((res) => {
      if (res.status === 200) {
        localStorage.setItem('adminAccessToken', res.data!.accessToken)
        history.push(routes.admin.overview)
      } else {
        alert('Đăng nhập không thành công')
      }
    })
  }

  useEffect(() => {
    const adminAccessToken = localStorage.getItem('adminAccessToken')
    if (adminAccessToken) {
      history.push(routes.admin.overview)
    }
  }, [])

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
