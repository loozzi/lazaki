interface Props {
  title: string
  children: React.ReactNode
}

export const SidebarMenu = (props: Props) => {
  const { title, children } = props

  return (
    <div className='flex gap-2 flex-col'>
      <span className='text-sm font-normal mt-8 ml-2'>{title}</span>
      {children}
    </div>
  )
}
