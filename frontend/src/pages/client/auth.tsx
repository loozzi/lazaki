import { Button, Image } from '@nextui-org/react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import assets from '~/assets'

import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, facebookProvider, githubProvider, googleProvider } from '~/services/firebase.service'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~/app/hook'
import { authActions, selectIsAuthenticated } from '~/hooks/auth/auth.slice'
import { TokenAuthPayload } from '~/models/token'
import { history } from '~/configs/history'
import routes from '~/configs/routes'

export const ViewAuthPage = () => {
  document.title = 'Đăng nhập tài khoản'
  const [provider, setProvider] = useState<GoogleAuthProvider | FacebookAuthProvider | GithubAuthProvider | undefined>(
    undefined
  )

  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (provider !== undefined) {
      signInWithPopup(auth, provider)
        .then((data) => {
          if (data === null) return
          else {
            const payload: TokenAuthPayload = {
              token: (data.user as any).accessToken
            }

            dispatch({
              type: authActions.signIn.type,
              payload
            })
          }
        })
        .catch((error) => {
          console.error(error)
        })
      setProvider(undefined)
    }
  }, [provider])

  useEffect(() => {
    if (isAuthenticated) {
      history.push(routes.client.account)
    }
    console.log(isAuthenticated)
  }, [isAuthenticated])

  return (
    <div className='flex justify-center mt-4'>
      <div className='flex flex-col max-w-screen-sm w-full gap-4 bg-white px-16 pt-5 pb-24 rounded-e-md'>
        <div className='flex justify-center'>
          <Image src={assets.lazaki} alt='Lazaki' />
        </div>
        <h1 className='text-3xl font-semibold text-center'>Đăng nhập hệ thống</h1>
        <Button
          color='primary'
          variant='ghost'
          startContent={<FaGoogle />}
          size='lg'
          onClick={() => setProvider(googleProvider)}
        >
          Đăng nhập với Google
        </Button>
        <Button
          color='primary'
          variant='ghost'
          startContent={<FaFacebook />}
          size='lg'
          onClick={() => setProvider(facebookProvider)}
        >
          Đăng nhập với Facebook
        </Button>
        <Button
          color='primary'
          variant='ghost'
          startContent={<FaGithub />}
          size='lg'
          onClick={() => setProvider(githubProvider)}
        >
          Đăng nhập với Github
        </Button>
      </div>
    </div>
  )
}
