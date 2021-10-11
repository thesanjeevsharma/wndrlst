import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/breadcrumb'
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
} from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import { Alert, AlertIcon } from '@chakra-ui/alert'
import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/stat'
import { Center, Spinner, useToast } from '@chakra-ui/react'

import { LikeIcon } from 'assets/icons'
import { useAppSelector } from 'store'
import {
  fetchRestaurant,
  toggleRestaurantLike,
} from 'store/restaurants/actions'

import { Layout } from '..'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import supabase from 'supabase'
import { CODES } from 'constants/codes'

const Restaurant = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { cityId, restaurantId } =
    useParams<{ cityId: string; restaurantId: string }>()

  const {
    restaurant,
    meta: { isRestaurantLoading },
  } = useAppSelector((state) => state.restaurants)
  const { user, likedRestaurants } = useAppSelector((state) => state.user)

  const isLiked = likedRestaurants.includes(parseInt(restaurantId))

  const handleLikeClick = async (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.preventDefault()

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
        .insert([{ user_id: user.id, restaurant_id: restaurant.id }])
    } else {
      result = await supabase
        .from('likes')
        .delete()
        .match({ user_id: user.id, restaurant_id: restaurant.id })
    }

    const { error } = result

    if (error) {
      if (error.code === CODES.DUPLICATE_RECORD) {
        return console.log('Dev Error: logic for like')
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

    dispatch(toggleRestaurantLike(restaurant.id, newLikedState))
  }

  React.useEffect(() => {
    dispatch(fetchRestaurant(parseInt(restaurantId)))
  }, [dispatch, restaurantId])

  return (
    <Layout pt={8} pb={48}>
      {isRestaurantLoading ? (
        <Center>
          <Spinner color="#22c35e" size="sm" />
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
                <Link to={`/cities/${cityId}`}>{restaurant.city.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link to={`/cities/1/restaurants`}>Restaurants</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>
                <Link to={`/cities/1/restaurants/${restaurant.id}`}>
                  {restaurant.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <Box maxWidth="768px" mx="auto">
            <Heading size="lg" mb={2}>
              {restaurant.name}
            </Heading>
            {restaurant.cuisines && (
              <HStack mb={8}>
                {restaurant.cuisines.map((cuisine: string) => (
                  <Badge>{cuisine}</Badge>
                ))}
              </HStack>
            )}
            <Box mb={8}>
              <Carousel
                showIndicators={false}
                showThumbs={false}
                showStatus={false}
                swipeable
              >
                {restaurant.images.map((image: string) => (
                  <Box
                    height={['240px', '320px', '480px', '600px']}
                    width="100%"
                    borderRadius={8}
                    overflow="hidden"
                  >
                    <Image src={image} height="600px" objectFit="cover" />
                  </Box>
                ))}
              </Carousel>
            </Box>
            {restaurant.is_vegan && (
              <Alert
                status="success"
                borderRadius={4}
                width="fit-content"
                mb={8}
              >
                <AlertIcon />
                This is a Vegan Restaurant.
              </Alert>
            )}
            <StatGroup mb={4}>
              <Stat>
                <StatLabel>Price for two</StatLabel>
                <StatNumber>
                  ${restaurant.price_for_two.toLocaleString('en-US')}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Likes</StatLabel>
                <Flex align="center">
                  <LikeIcon
                    mr={2}
                    cursor="pointer"
                    onClick={handleLikeClick}
                    isFilled={isLiked}
                  />
                  <StatNumber>
                    {restaurant.likes.toLocaleString('en-US')}
                  </StatNumber>
                </Flex>
              </Stat>
            </StatGroup>
            <Text mb={8}>
              <Text fontWeight="bold">Address:</Text> {restaurant.address}
            </Text>

            <Divider mb={8} />

            <Box>
              <Heading size="md">Reviews</Heading>
              <Text>Coming soon...</Text>
            </Box>
          </Box>
        </>
      )}
    </Layout>
  )
}

export default Restaurant
