import React from "react";
import { Box, Center, Text } from "@chakra-ui/layout";

import type { HomeCity } from "types/cities";

type Props = {
  city: HomeCity;
  onClick: (id: string) => void;
};

const CityCard = ({ city, onClick }: Props) => {
  const { id, name, image } = city;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    onClick(id);
  };

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
      onClick={handleClick}
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
