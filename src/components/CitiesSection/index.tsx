import React from 'react'
import { Box, Grid, Heading } from '@chakra-ui/layout'

import type { LeanCity } from 'types/cities'

import { CityCard } from '..'

type Props = {
  title: string
  data: LeanCity[]
  onCityClick: (cityId: string) => void
}

const CitiesSection = ({ title, data = [], onCityClick }: Props) => {
  return (
    <Box>
      <Heading mb={8}>{title}</Heading>
      <Grid templateColumns="repeat(6, 1fr)" gap={4}>
        {data.map((city) => (
          <CityCard city={city} onClick={onCityClick} />
        ))}
      </Grid>
    </Box>
  )
}

export default CitiesSection
