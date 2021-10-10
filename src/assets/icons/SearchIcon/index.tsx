import React from 'react'
import Icon from '@chakra-ui/icon'

type Props = {
  size?: number
  boldness?: number
  color?: string
}

const Search = ({ size = 4, color = 'gray.700', boldness = 2 }: Props) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={boldness}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </Icon>
)

export default Search
