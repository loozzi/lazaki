import { Button, Input } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { history } from '~/configs/history'
import routes from '~/configs/routes'

export const SearchInputHeaderComp = () => {
  const [isFocus, setFocus] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')
  const location = useLocation()

  const [listHistory, setListHistory] = useState<string[]>([])

  const handleSearch = () => {
    setListHistory([...listHistory, search])
    history.push(`${routes.client.search}?q=${search}`)
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get('q') || ''
    setSearch(query)
  }, [location.search])

  return (
    <div className='relative'>
      <Input
        placeholder='Tìm kiếm sản phẩm...'
        variant='flat'
        className='pr-0'
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false)
          }, 150)
        }}
        endContent={
          <div className='border-l-1 pl-2 flex align-middle'>
            <Button color='primary' variant='flat' onClick={handleSearch} size='sm' className='m-0'>
              <FaSearch />
            </Button>
          </div>
        }
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
            setFocus(false)
          }
        }}
      />
      {isFocus && (
        <div className='absolute z-10 bg-white w-full shadow-lg p-2 rounded-md mt-2' onClick={() => setFocus(true)}>
          <div className='text-slate-400 pl-2'>Lịch sử tìm kiếm</div>
          <ul className='flex flex-col'>
            {listHistory.map((item, index) => (
              <Link
                to={routes.client.search + '?q=' + item}
                key={index}
                className='py-1 px-2 hover:bg-slate-200 text-black'
              >
                {item}
              </Link>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
