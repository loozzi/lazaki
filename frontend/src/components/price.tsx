interface PriceCompProps {
  price: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
  fontSize?: number
}

export const PriceComp = (props: PriceCompProps) => {
  const { price, size = 'md', color, fontSize } = props

  const sizes = {
    sm: {
      fontSize: 16
    },
    md: {
      fontSize: 24
    },
    lg: {
      fontSize: 28
    }
  }

  const szConfig = sizes[size || 'md']
  return (
    <span
      style={{
        fontSize: fontSize ? fontSize : szConfig.fontSize,
        color: color
      }}
      className='flex items-start'
    >
      <span
        style={{
          fontSize: fontSize ? fontSize - 4 : size === 'sm' ? szConfig.fontSize - 4 : szConfig.fontSize - 8,
          color: color,
          textDecoration: 'underline',
          marginRight: 2
        }}
      >
        đ
      </span>
      {price.toLocaleString()}
    </span>
  )
}
