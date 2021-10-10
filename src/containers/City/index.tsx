import React from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Image } from '@chakra-ui/image'
import {
  Badge,
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout'
import { Stat, StatGroup, StatLabel, StatNumber } from '@chakra-ui/stat'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/breadcrumb'
import { Button, Center, Spinner, useToast } from '@chakra-ui/react'

import { RestaurantCard } from 'components'
import { useAppSelector } from 'store'
import { fetchCity } from 'store/cities/actions'
import type { Restaurant } from 'types/restaurants'

import { Layout } from '..'
import supabase from 'supabase'
import { CODES } from 'constants/codes'
import { toggleRestaurantLike } from 'store/restaurants/actions'

const City = () => {
  const history = useHistory()
  const { cityId } = useParams<{ cityId: string }>()
  const dispatch = useDispatch()
  const toast = useToast()

  const { user, likedRestaurants } = useAppSelector((state) => state.user)

  React.useEffect(() => {
    dispatch(fetchCity(parseInt(cityId)))
  }, [dispatch, cityId])

  const {
    city,
    meta: { isCityLoading },
  } = useAppSelector((state) => state.cities)

  console.log({ city, isCityLoading })

  const onLikeClick = async (restaurantId: number, isLiked: boolean) => {
    const newLikedState = !isLiked

    if (!user?.id) {
      return toast({
        position: 'top-right',
        title: 'Oops! Cannot do that.',
        description: 'Please login to like.',
        status: 'error',
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
        return console.log('unlike')
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

  const navigateToRestaurants = () =>
    history.push(`/cities/${city?.id}/restaurants`)

  const navigateToRestaurant = React.useCallback(
    (restaurantId: number) =>
      history.push(`/cities/${city?.id}/restaurants/${restaurantId}`),
    [history, city]
  )

  return (
    <Layout pt={8} pb={48}>
      {isCityLoading ? (
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
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>
                <Link to={`/cities/${city.id}`}>{city.name}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          <SimpleGrid columns={2} spacing={8} mb={24}>
            <Box>
              <Heading>{city.name}</Heading>
              <Text size="lg" textColor="gray.500" mb={4}>
                {city.state}, {city.country}
              </Text>
              <HStack spacing={2} mb={10}>
                {city.is_covid_free ? (
                  <Badge colorScheme="green">COVID Free</Badge>
                ) : (
                  <Badge colorScheme="warning">Not COVID Free</Badge>
                )}
                {city.is_hill_station && (
                  <Badge colorScheme="purple">Mountains</Badge>
                )}
                {city.is_beach_station && (
                  <Badge colorScheme="blue">Beaches</Badge>
                )}
              </HStack>
              <StatGroup mb={4}>
                <Stat>
                  <StatLabel>Population</StatLabel>
                  <StatNumber>
                    {city.population.toLocaleString('en-US')}
                  </StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Area</StatLabel>
                  <StatNumber>
                    {`${city.area.toLocaleString('en-US')} km²`}
                  </StatNumber>
                </Stat>
              </StatGroup>
              <StatGroup mb={8}>
                <Stat>
                  <StatLabel>Language(s)</StatLabel>
                  <StatNumber>{city.languages.join(',')}</StatNumber>
                </Stat>
                <Stat>
                  <StatLabel>Currency</StatLabel>
                  <StatNumber>{city.currency}</StatNumber>
                </Stat>
              </StatGroup>
              <Text size="xl">{city.description}</Text>
            </Box>
            <Box>
              <Image src={city.images[0]} borderRadius={8} />
            </Box>
          </SimpleGrid>

          <Box>
            <Heading color="gray.600" size="lg" mb={8}>
              Restaurants
            </Heading>
            <SimpleGrid columns={3} spacing={8} mb={8}>
              {city.restaurants.map((restaurant: Restaurant) => {
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
            <Center>
              <Button
                variant="link"
                colorScheme="whatsapp"
                onClick={navigateToRestaurants}
              >
                View all Restaurants
              </Button>
            </Center>
          </Box>
        </>
      )}
    </Layout>
  )
}

export default City
