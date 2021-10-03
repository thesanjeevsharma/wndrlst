import React from "react";
import { Box, Center, Text } from "@chakra-ui/layout";

import type { City } from "types/cities";

type Props = {
  city: City;
};

const CityCard = ({ city }: Props) => {
  const { name, image } = city;

  return (
    <Box
      width={48}
      height={48}
      borderRadius={8}
      overflow="hidden"
      bgImage={`url(${image})`}
      bgSize="cover"
      position="relative"
      cursor="pointer"
    >
      <Center
        bottom={0}
        left={0}
        right={0}
        position="absolute"
        py={2}
        textColor="white"
        fontWeight="bold"
        bg="linear-gradient(transparent, #111 70%);"
      >
        <Text>{name}</Text>
      </Center>
    </Box>
  );
};

export default CityCard;
