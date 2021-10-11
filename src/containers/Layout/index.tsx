import React, { ReactNode } from 'react'
import { useLocation } from 'react-router'
import { Box, BoxProps } from '@chakra-ui/layout'

import { Navbar, Footer } from '../'

type Props = BoxProps & {
  children: ReactNode
  withNav?: boolean
}

const Layout = ({
  children,
  withNav = true,
  px = [4, 8, 12],
  ...props
}: Props) => {
  const { pathname } = useLocation()

  React.useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [pathname])

  return (
    <Box textColor="gray.700">
      {withNav && <Navbar />}
      <Box px={px} {...props} minH="100vh">
        {children}
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
