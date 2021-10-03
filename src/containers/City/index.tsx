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
import { useHistory, Link } from "react-router-dom";

import { Layout } from "..";
import { RestaurantCard } from "components";

import type { City as CityType } from "types/cities";
import type { Restaurant } from "types/restaurants";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";

const mockCity: CityType = {
  id: "1",
  name: "New York City",
  image:
    "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80",
  description:
    "New York is a state in the Northeastern and Mid-Atlantic regions of the United States. New York is the 27th-most extensive, the third-most populous, and the seventh-most densely populated of the 50 United States. New York is bordered by New Jersey and Pennsylvania to the south, Pennsylvania to the north, Connecticut and Massachusetts to the west, and the Atlantic Ocean to the east.",
  population: 8550902,
  area: 14973.0,
  currency: "United States Dollar",
  languages: ["English"],
  state: "New York",
  country: "United States",
  createdAt: "Today",
  isCovidFree: true,
  isHillStation: true,
  isBeachStation: true,
  restaurants: [
    {
      id: "1",
      city_id: "1",
      name: "Lord's Restaurant",
      address: "New York, NY",
      images: [
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
      ],
      cuisines: ["American"],
      priceForTwo: 50,
      likes: 452,
      isVegan: false,
    },
    {
      id: "2",
      city_id: "1",
      name: "Burger Kind",
      address: "New York, NY",
      images: [
        "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
      ],
      cuisines: ["American"],
      priceForTwo: 30,
      likes: 234,
      isVegan: false,
    },
  ],
};

const City = () => {
  const history = useHistory();

  const onLikeClick = (restaurantId: string): void => {
    console.log(restaurantId);
  };

  const navigateToRestaurant = React.useCallback(
    (restaurantId: string) =>
      history.push(`/cities/${mockCity.id}/restaurants/${restaurantId}`),
    [history]
  );

  return (
    <Layout pt={8} pb={48}>
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
            <Link to={`/cities/${mockCity.id}`}>{mockCity.name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <SimpleGrid columns={2} spacing={8} mb={24}>
        <Box>
          <Heading>{mockCity.name}</Heading>
          <Text size="lg" textColor="gray.500" mb={4}>
            {mockCity.state}, {mockCity.country}
          </Text>
          <HStack spacing={2} mb={10}>
            {mockCity.isCovidFree ? (
              <Badge colorScheme="green">COVID Free</Badge>
            ) : (
              <Badge colorScheme="warning">Not COVID Free</Badge>
            )}
            {mockCity.isHillStation && (
              <Badge colorScheme="purple">Mountains</Badge>
            )}
            {mockCity.isBeachStation && (
              <Badge colorScheme="blue">Beaches</Badge>
            )}
          </HStack>
          <StatGroup mb={4}>
            <Stat>
              <StatLabel>Population</StatLabel>
              <StatNumber>
                {mockCity.population.toLocaleString("en-US")}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Area</StatLabel>
              <StatNumber>
                {`${mockCity.area.toLocaleString("en-US")} km²`}
              </StatNumber>
            </Stat>
          </StatGroup>
          <StatGroup mb={8}>
            <Stat>
              <StatLabel>Language(s)</StatLabel>
              <StatNumber>{mockCity.languages.join(",")}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel>Currency</StatLabel>
              <StatNumber>{mockCity.currency}</StatNumber>
            </Stat>
          </StatGroup>
          <Text size="xl">{mockCity.description}</Text>
        </Box>
        <Box>
          <Image src={mockCity.image} borderRadius={8} />
        </Box>
      </SimpleGrid>

      <Box>
        <Heading color="gray.600" size="lg" mb={8}>
          Restaurants
        </Heading>
        <SimpleGrid columns={3} spacing={8}>
          {mockCity.restaurants.map((restaurant: Restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
              onLikeClick={onLikeClick}
              onHeadingClick={navigateToRestaurant}
            />
          ))}
        </SimpleGrid>
      </Box>
    </Layout>
  );
};

export default City;
