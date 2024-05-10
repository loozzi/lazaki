import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

interface StarCompProps {
  stars: number
  hideNumber?: boolean
  className?: string
}
export const StarComp = (props: StarCompProps) => {
  const { stars, className, hideNumber = false } = props
  const fullStars = Math.floor(stars)
  const halfStar = stars - fullStars > 0 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar
  return (
    <div className={'flex items-center ' + className}>
      <span className={'mr-2 underline text-yellow-400 font-bold' + (hideNumber ? ' hidden' : '')}>{stars}</span>
      {[...Array(fullStars)].map((_, index) => {
        return <FaStar key={index} className='text-yellow-400' />
      })}
      {halfStar > 0 && <FaStarHalfAlt className='text-yellow-400' />}
      {[...Array(emptyStars)].map((_, index) => {
        return <FaStar key={index} className='text-gray-400' />
      })}
    </div>
  )
}
