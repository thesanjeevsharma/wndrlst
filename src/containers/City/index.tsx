import React from "react";
import { Image } from "@chakra-ui/image";
import {
  Badge,
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/layout";
import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/stat";
import { useHistory, Link, useParams } from "react-router-dom";

import { Layout } from "..";
import { RestaurantCard } from "components";

import type { Restaurant } from "types/restaurants";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { useDispatch } from "react-redux";
import { fetchCity } from "store/cities/actions";
import { useAppSelector } from "store";
import { Button, Center, Spinner } from "@chakra-ui/react";


const City = () => {
  const history = useHistory();
  const { cityId } = useParams<{ cityId: string }>()
  const dispatch = useDispatch()

  const { city, meta: { isCityLoading } } = useAppSelector(state => state.cities)

  const onLikeClick = (restaurantId: string): void => {
    console.log(restaurantId);
  };

  const navigateToRestaurants = () =>
  history.push(`/cities/${city?.id}/restaurants`);
  
  const navigateToRestaurant = React.useCallback(
    (restaurantId: string) =>
      history.push(`/cities/${city?.id}/restaurants/${restaurantId}`),
    [history, city]
  );

  React.useEffect(() => {
    dispatch(fetchCity(parseInt(cityId)))
  }, [dispatch, cityId])

  return (
    <Layout pt={8} pb={48}>

      {
        isCityLoading ? (
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
            <Link to={`/cities/${city?.id}`}>{city?.name}</Link>
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
          {city.population.toLocaleString("en-US")}
        </StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Area</StatLabel>
        <StatNumber>
          {`${city.area.toLocaleString("en-US")} km²`}
        </StatNumber>
      </Stat>
    </StatGroup>
    <StatGroup mb={8}>
      <Stat>
        <StatLabel>Language(s)</StatLabel>
        <StatNumber>{city.languages.join(",")}</StatNumber>
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
          {city.restaurants.map((restaurant: Restaurant) => (
            <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onLikeClick={onLikeClick}
            onHeadingClick={navigateToRestaurant}
            />
            ))}
        </SimpleGrid>
        <Center>
          <Button variant="link" colorScheme="whatsapp" onClick={navigateToRestaurants}>
            View all Restaurants
          </Button>
        </Center>
      </Box>


            </>
        )
      }

    </Layout>
  );
};

export default City;
