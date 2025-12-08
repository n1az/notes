import { useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface NeoBrutalistCardProps {
  children: ReactNode
  className?: string
  backgroundColor?: string
  borderColor?: string
  shadowColor?: string
  borderWidth?: string
  shadowOffset?: string
  hoverEffect?: boolean
  href?: string
  onClick?: () => void
}

export function NeoBrutalistCard({
  children,
  className = '',
  backgroundColor = 'bg-brutal-white',
  borderColor = 'border-brutal-black',
  shadowColor = '#000000',
  borderWidth = 'border-6',
  shadowOffset = '8px',
  hoverEffect = true,
  href,
  onClick,
}: NeoBrutalistCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const baseClasses = cn(
    'relative rounded-none',
    borderWidth,
    borderColor,
    backgroundColor,
    'transition-all duration-200 ease-out',
    hoverEffect && 'cursor-pointer',
    className
  )

  const shadowStyle = {
    boxShadow: isHovered && hoverEffect
      ? `4px 4px 0px 0px ${shadowColor}`
      : `${shadowOffset} ${shadowOffset} 0px 0px ${shadowColor}`,
    transform: isHovered && hoverEffect ? 'translate(4px, 4px)' : 'translate(0, 0)',
  }

  const content = (
    <div
      className={baseClasses}
      style={shadowStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return content
}

interface NeoBrutalistButtonProps {
  children: ReactNode
  className?: string
  backgroundColor?: string
  borderColor?: string
  shadowColor?: string
  textColor?: string
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

export function NeoBrutalistButton({
  children,
  className = '',
  backgroundColor = 'bg-brutal-yellow',
  borderColor = 'border-brutal-black',
  shadowColor = '#000000',
  textColor = 'text-brutal-black',
  onClick,
  href,
  type = 'button',
  disabled = false,
  fullWidth = false,
}: NeoBrutalistButtonProps) {
  const [isActive, setIsActive] = useState(false)

  const baseClasses = cn(
    'relative px-6 py-3 font-bold uppercase text-lg',
    'border-5 rounded-none',
    borderColor,
    backgroundColor,
    textColor,
    'transition-all duration-100 ease-out',
    'hover:translate-x-1 hover:translate-y-1',
    'active:shadow-none active:translate-x-2 active:translate-y-2',
    disabled && 'opacity-50 cursor-not-allowed',
    fullWidth && 'w-full',
    !disabled && 'cursor-pointer',
    className
  )

  const shadowStyle = {
    boxShadow: isActive ? 'none' : `8px 8px 0px 0px ${shadowColor}`,
  }

  const content = (
    <div
      className={baseClasses}
      style={shadowStyle}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
    >
      {children}
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className="inline-block">
      {content}
    </button>
  )
}

interface NeoBrutalistBadgeProps {
  children: ReactNode
  className?: string
  color?: 'yellow' | 'pink' | 'cyan' | 'lime' | 'blue' | 'orange' | 'purple'
}

export function NeoBrutalistBadge({
  children,
  className = '',
  color = 'yellow',
}: NeoBrutalistBadgeProps) {
  const colorMap = {
    yellow: 'bg-brutal-yellow border-brutal-black',
    pink: 'bg-brutal-pink border-brutal-black',
    cyan: 'bg-brutal-cyan border-brutal-black',
    lime: 'bg-brutal-lime border-brutal-black',
    blue: 'bg-brutal-blue border-brutal-white',
    orange: 'bg-brutal-orange border-brutal-black',
    purple: 'bg-brutal-purple border-brutal-black',
  }

  const textColorMap = {
    yellow: 'text-brutal-black',
    pink: 'text-brutal-white',
    cyan: 'text-brutal-black',
    lime: 'text-brutal-black',
    blue: 'text-brutal-white',
    orange: 'text-brutal-black',
    purple: 'text-brutal-white',
  }

  return (
    <span
      className={cn(
        'inline-block px-3 py-1 font-bold uppercase text-sm',
        'border-3 rounded-none',
        colorMap[color],
        textColorMap[color],
        'shadow-[4px_4px_0px_0px_#000000]',
        className
      )}
    >
      {children}
    </span>
  )
}

interface NeoBrutalistInputProps {
  type?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  label?: string
  required?: boolean
}

export function NeoBrutalistInput({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  label,
  required = false,
}: NeoBrutalistInputProps) {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block mb-2 font-bold uppercase text-brutal-black text-lg">
          {label}
          {required && <span className="text-brutal-pink ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className={cn(
          'w-full px-4 py-3 font-body text-lg',
          'bg-brutal-white border-4 border-brutal-black rounded-none',
          'focus:outline-none focus:border-brutal-blue',
          'transition-colors duration-200',
          'shadow-[4px_4px_0px_0px_#000000]'
        )}
      />
    </div>
  )
}

interface NeoBrutalistTextAreaProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  label?: string
  required?: boolean
  rows?: number
}

export function NeoBrutalistTextArea({
  placeholder,
  value,
  onChange,
  className = '',
  label,
  required = false,
  rows = 4,
}: NeoBrutalistTextAreaProps) {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block mb-2 font-bold uppercase text-brutal-black text-lg">
          {label}
          {required && <span className="text-brutal-pink ml-1">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={cn(
          'w-full px-4 py-3 font-body text-lg',
          'bg-brutal-white border-4 border-brutal-black rounded-none',
          'focus:outline-none focus:border-brutal-blue',
          'transition-colors duration-200',
          'shadow-[4px_4px_0px_0px_#000000]',
          'resize-none'
        )}
      />
    </div>
  )
}
