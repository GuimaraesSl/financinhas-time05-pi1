import React from 'react'

import './Button.style.css'

export interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
  children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  style,
  disabled
}) => {
  return (
    <button onClick={onClick} className={`button ${className}`} style={style} disabled={disabled}>
      {children}
    </button>
  )
}
