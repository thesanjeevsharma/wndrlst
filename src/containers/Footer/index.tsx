import React from 'react'

import { Center } from '@chakra-ui/layout'
import { Link } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Center bg="whatsapp.500" py={4} textColor="white">
      <Link href="https://github.com/thesanjeevsharma" isExternal mr={2}>
        @thesanjeevsharma
      </Link>
      X
      <Link href="https://github.com/supabase" isExternal ml={2}>
        @supabase
      </Link>
    </Center>
  )
}

export default Footer
