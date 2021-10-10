import React from 'react'
import { Flex, Heading, Stack, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/popover'
import { Portal } from '@chakra-ui/portal'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { useDisclosure } from '@chakra-ui/hooks'
import { useToast, Avatar } from '@chakra-ui/react'

import { ArrowInIcon, EmailIcon, ProfileIcon } from 'assets/icons'
import supabase from 'supabase'
import { useDispatch } from 'react-redux'
import { loginUser, logoutUser } from 'store/user/actions'
import { useAppSelector } from 'store'
import { useLocation } from 'react-router'

const TOAST_OPTIONS = {
  duration: 3000,
  isClosable: true,
}

const Navbar = () => {
   const dispatch = useDispatch()
   const { pathname } = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

   const { user } = useAppSelector((state) => state.user)
   const isRootRoute = pathname === '/'

  const btnRef = React.useRef()
  const [isNewUser, setIsNewUser] = React.useState<boolean>(true)
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')
  const [inFlight, setInFlight] = React.useState(false)

  const openLoginDrawer = () => {
    setIsNewUser(false)
    onOpen()
  }

  const openSignUpDrawer = () => {
    setIsNewUser(true)
    onOpen()
  }

  const handleSubmit = async () => {
    try {
      setInFlight(true)

      if (!email || !password) {
        return toast({
          ...TOAST_OPTIONS,
          title: 'Invalid input!',
          description: 'Email and Password is required.',
          status: 'error',
          position: 'top-right',
        })
      }

      if (isNewUser) {
        if (
          // eslint-disable-next-line no-useless-escape
          !/^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/.test(
            email
          )
        ) {
          return toast({
            ...TOAST_OPTIONS,
            title: 'Invalid email!',
            description: 'Enter a valid email.',
            status: 'error',
            position: 'top-right',
          })
        }
        if (password.length < 6) {
          return toast({
            ...TOAST_OPTIONS,
            title: 'Invalid password!',
            description: 'Password should have at least 6 characters.',
            status: 'error',
            position: 'top-right',
          })
        }
      }

      let result

      if (isNewUser) {
        result = await supabase.auth.signUp({
          email,
          password,
        })
      } else {
        result = await supabase.auth.signIn({
          email,
          password,
        })
      }

      const { user, session, error } = result

      if (error) {
        return toast({
          ...TOAST_OPTIONS,
          title: isNewUser ? 'Failed to create account!' : 'Failed to login!',
          description: error.message,
          status: 'error',
          position: 'top-right',
        })
      }

      toast({
        ...TOAST_OPTIONS,
        title: isNewUser ? 'Account created!' : 'Login successful!',
        description: `Welcome, ${user.email}!`,
        status: 'success',
        position: 'top-right',
      })
      dispatch(
        loginUser(
          { id: user.id, email: user.email },
          {
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          }
        )
      )
      onClose()
    } catch (error) {
      setInFlight(false)

      toast({
        ...TOAST_OPTIONS,
        title: 'Something went wrong!',
        description: `Please try again, later!`,
        status: 'error',
        position: 'top-right',
      })
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()

      if (error) {
        return toast({
          ...TOAST_OPTIONS,
          title: 'Failed to logout!',
          description: error.message,
          status: 'error',
          position: 'top-right',
        })
      }

      toast({
        ...TOAST_OPTIONS,
        title: 'Logged out!',
        description: "Hope you'll be back soon.",
        status: 'success',
        position: 'top-right',
      })

      dispatch(logoutUser())
    } catch (err) {
      return toast({
        ...TOAST_OPTIONS,
        title: 'Something went wrong!',
        description: err.message,
        status: 'error',
        position: 'top-right',
      })
    }
  }

  return (
    <Flex align="center" justify="space-between" height={16} px={12}>
      <Heading size="lg">wndrlst</Heading>
      <Popover>
        <PopoverTrigger>
          <Button variant="link">
            {user ? (
              <Avatar name={user.email} bg="green.500" />
            ) : (
              <ProfileIcon
                color={isRootRoute ? 'white' : 'green.500'}
                cursor="pointer"
              />
            )}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent width="min-content">
            <PopoverArrow />
            <PopoverBody px={4}>
              {user ? (
                <>
                  <Text colorScheme="whatsapp" mb={2}>
                    {user.email}
                  </Text>
                  <Button
                    variant="link"
                    colorScheme="gray.300"
                    ref={btnRef}
                    onClick={handleLogout}
                    mb={2}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="link"
                    colorScheme="whatsapp"
                    ref={btnRef}
                    onClick={openLoginDrawer}
                    mb={2}
                  >
                    Login
                  </Button>
                  <Button
                    variant="link"
                    colorScheme="whatsapp"
                    ref={btnRef}
                    onClick={openSignUpDrawer}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{isNewUser ? 'Sign Up' : 'Welcome back!'}</DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<EmailIcon color="gray.300" />}
                />
                <Input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                />
              </InputGroup>

              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children={<ArrowInIcon color="gray.300" />}
                />
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value.trim())}
                />
              </InputGroup>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              isDisabled={inFlight}
            >
              Cancel
            </Button>
            <Button
              colorScheme="whatsapp"
              onClick={handleSubmit}
              isLoading={inFlight}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default Navbar
