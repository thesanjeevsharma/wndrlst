import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { Box, Heading, SimpleGrid } from "@chakra-ui/layout";
import React from "react";
import { useHistory, Link, useParams } from "react-router-dom";

import { Layout } from "..";
import { RestaurantCard } from "../../components";

import type { Restaurant } from "types/restaurants";
import { useDispatch } from "react-redux";
import { fetchRestaurants } from "store/restaurants/actions";
import { useAppSelector } from "store";
import { Center, Spinner } from "@chakra-ui/react";

const Restaurants = () => {
  const history = useHistory();
  const { cityId } = useParams<{ cityId: string }>()
  const dispatch = useDispatch()

  const { city, restaurants, meta: { isRestaurantsLoading } } = useAppSelector(state => state.restaurants)

  const onLikeClick = (restaurantId: string): void => {
    console.log(restaurantId);
  };

  const navigateToRestaurant = React.useCallback(
    (restaurantId: string) =>
      history.push(`/cities/${city?.id}/restaurants/${restaurantId}`),
    [history, city?.id]
  );

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
          {restaurants.map((restaurant: Restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onLikeClick={onLikeClick}
              onHeadingClick={navigateToRestaurant}
            />
          ))}
        </SimpleGrid>
      </Box></>)}
    </Layout>
  );
};

export default Restaurants;
