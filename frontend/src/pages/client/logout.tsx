import { useEffect } from 'react'
import { useAppDispatch } from '~/app/hook'
import { history } from '~/configs/history'
import routes from '~/configs/routes'
import { authActions } from '~/hooks/auth/auth.slice'

export const ViewLogoutPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authActions.signOut())
  }, [])

  return <div>Đăng xuất sau 3s...</div>
}
