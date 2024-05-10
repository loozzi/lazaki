import { ReactNode } from 'react'

interface PaneCompProps {
  header: string
  children: ReactNode
  className?: string
}

export const PaneComp = (props: PaneCompProps) => {
  const { header, children, className } = props
  return (
    <div className={className}>
      <div
        className='text-2xl text-center p-4 bg-white rounded-t-lg mx-2 lg:mx-0'
        style={{
          borderBottom: '4px solid #338cf1',
          textTransform: 'uppercase'
        }}
      >
        {header}
      </div>
      {children}
    </div>
  )
}
