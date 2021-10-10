import React from 'react'
import { useHistory, Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/breadcrumb'
import { Center, Spinner, useToast } from '@chakra-ui/react'
import { Box, Heading, SimpleGrid } from '@chakra-ui/layout'

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

  const navigateToRestaurant = React.useCallback(
    (restaurantId: number) =>
      history.push(`/cities/${city?.id}/restaurants/${restaurantId}`),
    [history, city?.id]
  )

  React.useEffect(() => {
    dispatch(fetchRestaurants(parseInt(cityId)))
  }, [dispatch, cityId])

  return (
    <Layout pt={8} pb={48}>
      {isRestaurantsLoading ? (
        <Center>
          <Spinner size="sm" color="green.500" />
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
            <Heading size="md" mb={4}>
              {restaurants.length} Restaurants in {city.name}
            </Heading>
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
    </Layout>
  )
}

export default Restaurants
