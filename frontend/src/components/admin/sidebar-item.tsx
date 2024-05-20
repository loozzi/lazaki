import { Tooltip } from '@nextui-org/react'
import { Link } from 'react-router-dom'

interface SidebarItemCompProps {
  className?: string
  title: string
  icon: React.ReactNode
  isActive?: boolean
  to?: string
  setCollapsed: (collapsed: boolean) => void
  collapsed: boolean
}

export const SidebarItemComp = (props: SidebarItemCompProps) => {
  const { title, className, icon, isActive, to, setCollapsed, collapsed } = props

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      setCollapsed(true)
    }
  }

  return (
    <Link to={to || ''} className={`text-default-900 active:bg-none max-w-full ${className}`}>
      <Tooltip content={title} isDisabled={!collapsed}>
        <div
          className={
            'flex gap-2 px-5 py-3 items-center hover:bg-slate-200 rounded-xl w-16 md:w-full' +
            (isActive ? ' bg-sky-200' : '')
          }
          onClick={handleClick}
        >
          <span className={'text-xl ' + (isActive ? ' text-blue-500' : 'text-gray-400')}>{icon}</span>
          {!collapsed && (
            <span className={'text-lg hidden md:block' + (isActive ? ' font-semibold' : '')}>{title}</span>
          )}
        </div>
      </Tooltip>
    </Link>
  )
}
