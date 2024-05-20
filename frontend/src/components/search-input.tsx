import { Button, Input, Link } from '@nextui-org/react'
import { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import routes from '~/configs/routes'
import { history } from '~/configs/history'

export const SearchInputHeaderComp = () => {
  const [isFocus, setFocus] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  const [listHistory, setListHistory] = useState<string[]>([
    'máy tính bảng samsung',
    'điện thoại iphone',
    'laptop dell'
  ])

  const handleSearch = () => {
    setListHistory([...listHistory, search])
    history.push(`${routes.client.search}?q=${search}`)
  }

  return (
    <div className='relative'>
      <Input
        placeholder='Tìm kiếm sản phẩm...'
        variant='bordered'
        className='pr-0'
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        endContent={
          <div className='border-l-1 pl-2 flex align-middle'>
            <Button color='primary' variant='light' onClick={handleSearch} size='sm' className='m-0'>
              <CiSearch size={24} /> Tìm kiếm
            </Button>
          </div>
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isFocus && (
        <div className='absolute z-10 bg-white w-full shadow-lg p-2 rounded-md mt-2'>
          <div className='text-slate-400 pl-2'>Lịch sử tìm kiếm</div>
          <ul className='flex flex-col'>
            {listHistory.map((item, index) => (
              <Link key={index} href='#' className='py-1 px-2 hover:bg-slate-200 text-black'>
                {item}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
