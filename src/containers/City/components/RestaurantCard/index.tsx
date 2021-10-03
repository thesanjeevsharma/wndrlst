import React from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";

import { LikeIcon } from "assets/icons";
import type { Restaurant } from "types/restaurants";

type Props = {
  restaurant: Restaurant;
  onLikeClick: (id: string) => void;
  onHeadingClick: (id: string) => void;
};

const RestaurantCard = ({ restaurant, onLikeClick, onHeadingClick }: Props) => {
  const { name, images, priceForTwo, likes, cuisines } = restaurant;

  const handleLikeClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    onLikeClick(restaurant.id);
  };

  const handleHeadingClick = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ): void => {
    event.stopPropagation();
    onHeadingClick(restaurant.id);
  };

  return (
    <Box>
      <Box bg="gray.100" height="300" overflow="hidden" borderRadius={8}>
        <Image src={images[0]} width="100%" height="auto" />
      </Box>
      <Flex p={4} align="flex-start" justify="space-between">
        <Box>
          <Heading
            size="md"
            cursor="pointer"
            _hover={{
              color: "green.500",
            }}
            onClick={handleHeadingClick}
          >
            {name}
          </Heading>
          {cuisines && <Text color="gray.500"> {cuisines.join(",")} </Text>}
          <Text mt={2} textColor="gray.600" fontWeight="bold">
            ${priceForTwo} for two
          </Text>
        </Box>
        <Flex align="center">
          <LikeIcon cursor="pointer" onClick={handleLikeClick} />
          <Text color="gray.600" ml={2}>
            {likes.toLocaleString("en-US")} likes
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default RestaurantCard;
