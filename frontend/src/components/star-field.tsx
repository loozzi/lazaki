import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

interface StarCompProps {
  stars: number
  className?: string
}
export const StarComp = (props: StarCompProps) => {
  const { stars, className } = props
  const fullStars = Math.floor(stars)
  const halfStar = stars - fullStars > 0 ? 1 : 0
  const emptyStars = 5 - fullStars - halfStar
  return (
    <div className={'flex ' + className}>
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
