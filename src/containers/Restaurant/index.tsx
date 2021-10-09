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
import { Center, Spinner } from '@chakra-ui/react'

import { LikeIcon } from 'assets/icons'
import { useAppSelector } from 'store'
import { fetchRestaurant } from 'store/restaurants/actions'

import { Layout } from '..'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

const Restaurant = () => {
  const dispatch = useDispatch()
  const { cityId, restaurantId } =
    useParams<{ cityId: string; restaurantId: string }>()

  const {
    restaurant,
    meta: { isRestaurantLoading },
  } = useAppSelector((state) => state.restaurants)

  const handleLikeClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    event.preventDefault()
    console.log(restaurantId)
  }

  React.useEffect(() => {
    dispatch(fetchRestaurant(parseInt(restaurantId)))
  }, [dispatch, restaurantId])

  return (
    <Layout pt={8} pb={48}>
      {isRestaurantLoading ? (
        <Center>
          <Spinner color="green.500" size="sm" />
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
                    height="600px"
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
                  <LikeIcon mr={2} cursor="pointer" onClick={handleLikeClick} />
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

            {/* <Box>
          <Heading size="md">Reviews</Heading>
        </Box> */}
          </Box>
        </>
      )}
    </Layout>
  )
}

export default Restaurant
