import { Button, Image } from '@nextui-org/react'
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa'
import assets from '~/assets'

export const ViewAuthPage = () => {
  const handleLoginByGoogle = () => {}

  const handleLoginByFacebook = () => {}

  const handleLoginByGithub = () => {}

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
