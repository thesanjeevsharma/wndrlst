import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Heading, SimpleGrid } from "@chakra-ui/layout";

import RestaurantCard from "../components/RestaurantCard";

import type { City } from "types/cities";
import type { Restaurant } from "types/restaurants";

type Props = {
  city: City;
};

const FoodSection = ({ city }: Props) => {
  const history = useHistory();

  const onLikeClick = (restaurantId: string): void => {
    console.log(restaurantId);
  };

  const navigateToRestaurant = React.useCallback(
    (restaurantId: string) =>
      history.push(`/city/${city.id}/restaurants/${restaurantId}`),
    [city.id, history]
  );

  return (
    <Box>
      <Heading color="gray.600" size="lg" mb={8}>
        Restaurants ({city.restaurants.length})
      </Heading>
      <SimpleGrid columns={3} spacing={8}>
        {city.restaurants.map((restaurant: Restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            onLikeClick={onLikeClick}
            onHeadingClick={navigateToRestaurant}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FoodSection;
