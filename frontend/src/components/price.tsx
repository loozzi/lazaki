interface PriceCompProps {
  price: number
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const PriceComp = (props: PriceCompProps) => {
  const { price, size = 'md', color } = props

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
        fontSize: szConfig.fontSize,
        color: color
      }}
    >
      <span style={{ fontSize: szConfig.fontSize - 8, color: color, textDecoration: 'underline' }}>đ</span>
      {price.toLocaleString()}
    </span>
  )
}
