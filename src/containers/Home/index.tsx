import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Box, Center, VStack } from '@chakra-ui/layout'
import { Button, Spinner } from '@chakra-ui/react'

import { useAppSelector } from 'store'
import { fetchPopularCities } from 'store/cities/actions'

import { CitiesSection, Search } from '../../components'
import { Layout, Navbar } from '../'

const Home = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const cities = useAppSelector((state) => state.cities.popularCities)
  const isLoading = useAppSelector(
    (state) => state.cities.meta.isPopularCitiesLoading
  )

  const navigateToCities = () => {
    history.push('/cities')
  }

  const navigateToCity = React.useCallback(
    (cityId: string) => history.push(`/cities/${cityId}`),
    [history]
  )

  React.useEffect(() => {
    dispatch(fetchPopularCities())
  }, [dispatch])

  return (
    <Layout withNav={false} px={0}>
      <Box
        bgImage={`url(https://images.unsplash.com/photo-1527824404775-dce343118ebc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80)`}
        bgSize="cover"
        bgPosition="center"
      >
        <Navbar />
        <Center height={80}>
          <Search onSearch={(val) => console.log(val)} />
        </Center>
      </Box>
      <Box px={12} pt={16} pb={40}>
        {isLoading ? (
          <Center>
            <Spinner color="#22c35e" size="sm" />
          </Center>
        ) : (
          <VStack spacing={16} align="flex-start">
            <CitiesSection
              title="Popular Cities"
              data={cities}
              onCityClick={navigateToCity}
            />
            <Center w="full">
              <Button
                colorScheme="whatsapp"
                variant="link"
                onClick={navigateToCities}
              >
                View all Cities
              </Button>
            </Center>
          </VStack>
        )}
      </Box>
    </Layout>
  )
}

export default Home
