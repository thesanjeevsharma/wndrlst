import React from 'react'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'

import { LikeIcon } from 'assets/icons'
import type { Restaurant } from 'types/restaurants'

type Props = {
  restaurant: Restaurant
  onLikeClick: () => void
  onHeadingClick: () => void
  isRestaurantLiked: boolean
}

const RestaurantCard = ({
  restaurant,
  onLikeClick,
  onHeadingClick,
  isRestaurantLiked = false,
}: Props) => {
  const { name, images, price_for_two, likes, cuisines } = restaurant

  const handleLikeClick = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ): void => {
    event.stopPropagation()
    onLikeClick()
  }

  const handleHeadingClick = (
    event: React.MouseEvent<HTMLHeadingElement, MouseEvent>
  ): void => {
    event.stopPropagation()
    onHeadingClick()
  }

  return (
    <Box>
      <Box bg="gray.100" height="300" overflow="hidden" borderRadius={8}>
        <Image src={images[0]} width="100%" height="100%" objectFit="cover" />
      </Box>
      <Flex p={4} align="flex-start" justify="space-between">
        <Box>
          <Heading
            size="md"
            cursor="pointer"
            _hover={{
              color: '#22c35e',
            }}
            onClick={handleHeadingClick}
          >
            {name}
          </Heading>
          {cuisines && <Text color="gray.500"> {cuisines.join(',')} </Text>}
          <Text mt={2} textColor="gray.600" fontWeight="bold">
            ${price_for_two} for two
          </Text>
        </Box>
        <Flex align="center">
          <LikeIcon
            cursor="pointer"
            onClick={handleLikeClick}
            isFilled={isRestaurantLiked}
          />
          <Text color="gray.600" ml={2}>
            {likes.toLocaleString('en-US')} like{likes === 1 ? '' : 's'}
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default RestaurantCard
