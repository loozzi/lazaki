import { Button, Image } from '@nextui-org/react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import assets from '~/assets'

import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, facebookProvider, githubProvider, googleProvider } from '~/services/firebase.service'

export const ViewAuthPage = () => {
  const handleLoginByGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((data) => {
        const credential = GoogleAuthProvider.credentialFromResult(data)
        console.log(credential)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleLoginByFacebook = () => {
    signInWithPopup(auth, facebookProvider)
      .then((data) => {
        const credential = FacebookAuthProvider.credentialFromResult(data)
        console.log(credential?.accessToken)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleLoginByGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((data) => {
        const credential = GithubAuthProvider.credentialFromResult(data)
        console.log(data)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <div className='flex justify-center mt-4'>
      <div className='flex flex-col max-w-screen-sm w-full gap-4 bg-white px-16 pt-5 pb-24 rounded-e-md'>
        <div className='flex justify-center'>
          <Image src={assets.lazaki} alt='Lazaki' />
        </div>
        <h1 className='text-3xl font-semibold text-center'>Đăng nhập hệ thống</h1>
        <Button color='primary' variant='ghost' startContent={<FaGoogle />} size='lg' onClick={handleLoginByGoogle}>
          Đăng nhập với Google
        </Button>
        <Button color='primary' variant='ghost' startContent={<FaFacebook />} size='lg' onClick={handleLoginByFacebook}>
          Đăng nhập với Facebook
        </Button>
        <Button color='primary' variant='ghost' startContent={<FaGithub />} size='lg' onClick={handleLoginByGithub}>
          Đăng nhập với Github
        </Button>
      </div>
    </div>
  )
}
