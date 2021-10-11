import React from 'react'
import { Box, Heading, SimpleGrid } from '@chakra-ui/layout'

import type { LeanCity } from 'types/cities'

import { CityCard } from '..'

type Props = {
  title: string
  data: LeanCity[]
  onCityClick: (cityId: string) => void
}

const CitiesSection = ({ title, data = [], onCityClick }: Props) => {
  return (
    <Box w="full">
      <Heading mb={8}>{title}</Heading>
      <SimpleGrid columns={[1, null, 2, 3, 4, 5, 6]} gap={8}>
        {data.map((city) => (
          <CityCard city={city} onClick={onCityClick} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default CitiesSection
