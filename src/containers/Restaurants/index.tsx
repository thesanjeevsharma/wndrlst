import React from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/breadcrumb'
import {
  Center,
  Spinner,
  useToast,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input, InputGroup } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/checkbox'

import { useAppSelector } from 'store'
import {
  fetchRestaurants,
  toggleRestaurantLike,
} from 'store/restaurants/actions'
import type { Restaurant } from 'types/restaurants'

import { RestaurantCard } from '../../components'
import { Layout } from '..'
import supabase from 'supabase'
import { CODES } from 'constants/codes'

const Restaurants = () => {
  const history = useHistory()
  const { cityId } = useParams<{ cityId: string }>()
  const dispatch = useDispatch()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const [name, setName] = React.useState<string>('')
  const [images, setImages] = React.useState<string[]>([''])
  const [priceForTwo, setPriceForTwo] = React.useState<string>('')
  const [address, setAddress] = React.useState<string>('')
  const [cuisines, setCuisines] = React.useState<string>('')
  const [isVegan, setIsVegan] = React.useState<boolean>(false)
  const [inFlight, setInFlight] = React.useState<boolean>(false)

  const {
    city,
    restaurants,
    meta: { isRestaurantsLoading },
  } = useAppSelector((state) => state.restaurants)
  const { user, likedRestaurants } = useAppSelector((state) => state.user)

  // TODO: make this func common
  const onLikeClick = async (restaurantId: number, isLiked: boolean) => {
    const newLikedState = !isLiked

    if (!user?.id) {
      return toast({
        position: 'top-right',
        title: 'Oops! Cannot do that.',
        description: 'Please login to like.',
        status: 'warning',
        isClosable: true,
        duration: 3000,
      })
    }

    let result
    if (newLikedState === true) {
      result = await supabase
        .from('likes')
        .insert([{ user_id: user.id, restaurant_id: restaurantId }])
    } else {
      result = await supabase
        .from('likes')
        .delete()
        .match({ user_id: user.id, restaurant_id: restaurantId })
    }

    const { error } = result

    if (error) {
      if (error.code === CODES.DUPLICATE_RECORD) {
        return console.log('Error: dev logic')
      }
      return toast({
        position: 'top-right',
        title: 'Something went wrong!',
        description: 'Please try again, later.',
        status: 'error',
        isClosable: true,
        duration: 3000,
      })
    }

    dispatch(toggleRestaurantLike(restaurantId, newLikedState))
  }

  const navigateToRestaurant = React.useCallback(
    (restaurantId: number) =>
      history.push(`/cities/${city?.id}/restaurants/${restaurantId}`),
    [history, city?.id]
  )

  const handleAddRestaurant = () => {
    if (!user) {
      return toast({
        position: 'top-right',
        title: 'Oops! Cannot do that.',
        description: 'Please login to add a Restaurant.',
        status: 'warning',
        isClosable: true,
        duration: 3000,
      })
    }
    onOpen()
  }

  const handleSubmit = async () => {
    try {
      setInFlight(true)

      if (
        !name ||
        !priceForTwo ||
        !address ||
        !cuisines ||
        !images.some((img) => img.length)
      ) {
        setInFlight(false)
        return toast({
          position: 'top-right',
          title: 'Invalid input!',
          description: 'All fields are required!',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      }

      if (Number.isNaN(priceForTwo)) {
        setInFlight(false)
        return toast({
          position: 'top-right',
          title: 'Invalid price!',
          description: 'Price should be a numeric value!',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      }

      const { error } = await supabase.from('requests').insert([
        {
          user_id: user.id,
          data: {
            name,
            priceForTwo,
            address,
            cuisines,
            isVegan,
            images: images.filter((img) => img.length),
            city: {
              id: city.id,
              name: city.name,
            },
          },
        },
      ])

      if (error) {
        setInFlight(false)
        return toast({
          position: 'top-right',
          title: 'Failed to create request!',
          description: 'Please try again, later!',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      }

      setInFlight(false)
      setName('')
      setPriceForTwo('')
      setCuisines('')
      setAddress('')
      setImages([''])
      setIsVegan(false)
      onClose()
      toast({
        position: 'top-right',
        title: 'Request created!',
        description: 'Thank you! Please check back later.',
        status: 'success',
        isClosable: true,
        duration: 3000,
      })
    } catch (err) {
      setInFlight(false)
      return toast({
        position: 'top-right',
        title: 'Something went wrong!',
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
      })
    }
  }

  React.useEffect(() => {
    dispatch(fetchRestaurants(parseInt(cityId)))
  }, [dispatch, cityId])

  return (
    <Layout pt={8} pb={48}>
      {isRestaurantsLoading ? (
        <Center>
          <Spinner size="sm" color="#22c35e" />
        </Center>
      ) : (
        <>
          <Breadcrumb mb={8}>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to="/cities">Cities</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={`/cities/${city.id}`}>{city.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Restaurants</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box>
            <Flex mb={4} align="center" justify="space-between">
              <Heading size="md">
                {restaurants.length} Restaurants in {city.name}
              </Heading>
              <Button
                variant="solid"
                colorScheme="whatsapp"
                onClick={handleAddRestaurant}
                ref={btnRef}
              >
                Add a Restaurant
              </Button>
            </Flex>
            <SimpleGrid columns={3} spacing={8}>
              {restaurants.map((restaurant: Restaurant) => {
                const isRestaurantLiked =
                  user && likedRestaurants.includes(restaurant.id)
                return (
                  <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                    isRestaurantLiked={isRestaurantLiked}
                    onLikeClick={() =>
                      onLikeClick(restaurant.id, isRestaurantLiked)
                    }
                    onHeadingClick={() => navigateToRestaurant(restaurant.id)}
                  />
                )
              })}
            </SimpleGrid>
          </Box>
        </>
      )}

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a Restaurant</DrawerHeader>

          <DrawerBody>
            <Alert status="info" mb={16}>
              <AlertIcon />
              Your Restaurant won't be added right away. It has to be reviewed
              and approved by the admin. This process could take up to 24 hours.
            </Alert>

            <VStack spacing="4" align="start">
              <HStack spacing={4}>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Enter Price for Two"
                    value={priceForTwo}
                    onChange={(e) => setPriceForTwo(e.target.value)}
                  />
                </InputGroup>
              </HStack>

              {images.map((image, index) => (
                <Input
                  type="text"
                  placeholder="Enter Image URL"
                  key={index}
                  value={image}
                  onChange={(e) => {
                    const updatedImages = [...images]
                    updatedImages[index] = e.target.value
                    setImages(updatedImages)
                  }}
                />
              ))}

              <Button
                variant="ghost"
                color="gray.500"
                onClick={() => setImages([...images, ''])}
              >
                Add More
              </Button>

              <Input
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <InputGroup>
                <Input
                  type="text"
                  placeholder="Enter Cuisines - Chinese, Indian, Continental"
                  value={cuisines}
                  onChange={(e) => setCuisines(e.target.value)}
                />
              </InputGroup>

              <Checkbox
                colorScheme="whatsapp"
                isChecked={isVegan}
                onChange={() => setIsVegan(!isVegan)}
              >
                Vegan Restaurant
              </Checkbox>
            </VStack>
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
              Create Request
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Layout>
  )
}

export default Restaurants
