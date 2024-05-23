import { useEffect } from 'react'
import { useAppDispatch } from '~/app/hook'
import { authActions } from '~/hooks/auth/auth.slice'

export const ViewLogoutPage = () => {
  document.title = 'Đăng xuất'
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authActions.signOut())
  }, [])

  return <div>Đăng xuất sau 3s...</div>
}
