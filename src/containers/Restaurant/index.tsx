import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Alert, AlertIcon } from "@chakra-ui/alert";
import { Stat, StatGroup, StatLabel, StatNumber } from "@chakra-ui/stat";

import { Layout } from "..";
import { LikeIcon } from "assets/icons";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import type { Restaurant as RestaurantType } from "types/restaurants";

const mockRestaurant: RestaurantType = {
  id: "1",
  city_id: "1",
  name: "Lord's Restaurant",
  address: "New York, NY",
  images: [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
    "https://images.unsplash.com/photo-1428515613728-6b4607e44363?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  ],
  cuisines: ["American"],
  priceForTwo: 50,
  likes: 452,
  isVegan: true,
};

const Restaurant = () => {
  const handleLikeClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    event.preventDefault();
    console.log(mockRestaurant.id);
  };

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
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to={`/cities/1`}>New York City</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link to={`/cities/1/restaurants`}>Restaurants</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>
            <Link to={`/cities/1/restaurants/${mockRestaurant.id}`}>
              {mockRestaurant.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box maxWidth="768px" mx="auto">
        <Heading size="lg" mb={2}>
          {mockRestaurant.name}
        </Heading>
        {mockRestaurant.cuisines && (
          <HStack mb={8}>
            {mockRestaurant.cuisines.map((cuisine: string) => (
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
            {mockRestaurant.images.map((image: string) => (
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
        {mockRestaurant.isVegan && (
          <Alert status="success" borderRadius={4} width="fit-content" mb={8}>
            <AlertIcon />
            This is a Vegan Restaurant.
          </Alert>
        )}
        <StatGroup mb={4}>
          <Stat>
            <StatLabel>Price for two</StatLabel>
            <StatNumber>
              ${mockRestaurant.priceForTwo.toLocaleString("en-US")}
            </StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Likes</StatLabel>
            <Flex align="center">
              <LikeIcon mr={2} cursor="pointer" onClick={handleLikeClick} />
              <StatNumber>
                {mockRestaurant.likes.toLocaleString("en-US")}
              </StatNumber>
            </Flex>
          </Stat>
        </StatGroup>
        <Text mb={8}>
          <Text fontWeight="bold">Address:</Text> {mockRestaurant.address}
        </Text>

        <Divider mb={8} />

        {/* <Box>
          <Heading size="md">Reviews</Heading>
        </Box> */}
      </Box>
    </Layout>
  );
};

export default Restaurant;
