import React from 'react'
import Icon, { IconProps } from '@chakra-ui/icon'

type Props = IconProps & {
  size?: number
  color?: string
}

const ArrowIn = ({ size = 6, color = '#000000', ...props }: Props) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
  </Icon>
)

export default ArrowIn
