import React from "react";
import { Box, Grid, Heading } from "@chakra-ui/layout";

import { CityCard } from "..";
import type { City } from "types/cities";

type Props = {
  title: string;
  data: City[];
};

const CitiesSection = ({ title, data }: Props) => {
  return (
    <Box>
      <Heading mb={8}>{title}</Heading>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        {data.map((city) => (
          <CityCard city={city} />
        ))}
      </Grid>
    </Box>
  );
};

export default CitiesSection;
