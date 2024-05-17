import { VariationResponse } from '~/models/product'

interface AdminProductVariationProps {
  className?: string
  variations: VariationResponse[]
}

export const AdminProductVariationComp = (props: AdminProductVariationProps) => {
  const { className, variations } = props
  return <div className={className}>AdminProductVariationComp</div>
}
