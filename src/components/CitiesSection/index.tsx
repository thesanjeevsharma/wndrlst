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
    <Box m={['0 auto', 'auto']}>
      <Heading mb={8} textAlign={['center', null, 'left']}>
        {title}
      </Heading>
      <Grid
        alignItems="center"
        templateColumns={[
          '1fr',
          '1fr 1fr',
          null,
          'repeat(3, 1fr)',
          'repeat(4, 1fr)',
          'repeat(5, 1fr)',
          'repeat(6, 1fr)',
        ]}
        gap={4}
      >
        {data.map((city) => (
          <CityCard city={city} onClick={onCityClick} />
        ))}
      </Grid>
    </Box>
  )
}

export default CitiesSection
