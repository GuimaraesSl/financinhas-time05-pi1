import React from 'react'

interface ExitIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string // Propriedade para definir a cor do ícone
}

const ExitIcon: React.FC<ExitIconProps> = ({ color = '#570000', ...props }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props} // Permite passar outras propriedades como className, style, etc.
  >
    <path
      d="M16 5V4C16 3.45 15.55 3 15 3H6C5.45 3 5 3.45 5 4V20C5 20.55 5.45 21 6 21H15C15.55 21 16 20.55 16 20V19"
      stroke={color} // Define a cor do ícone dinamicamente
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 12H21"
      stroke={color} // Define a cor do ícone dinamicamente
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.5 8.5L21 12L17.5 15.5"
      stroke={color} // Define a cor do ícone dinamicamente
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ExitIcon
