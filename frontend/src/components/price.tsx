interface PriceCompProps {
  price: number
  size: 'sm' | 'md' | 'lg'
  color: string
}

export const PriceComp = (props: PriceCompProps) => {
  const { price, size = 'md', color } = props

  const sizes = {
    sm: {
      fontSize: 16
    },
    md: {
      fontSize: 20
    },
    lg: {
      fontSize: 24
    }
  }

  const szConfig = sizes[size || 'md']
  return (
    <span
      style={{
        fontSize: szConfig.fontSize,
        color: color
      }}
    >
      <span style={{ fontSize: szConfig.fontSize - 4, color: color, textDecoration: 'underline' }}>đ</span>
      {price}
    </span>
  )
}
