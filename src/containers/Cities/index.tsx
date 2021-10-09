import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
  } from "@chakra-ui/breadcrumb";
  import { Box, Heading, SimpleGrid } from "@chakra-ui/layout";
  import React from "react";
  import { useHistory, Link } from "react-router-dom";
  
  import { Layout } from "..";
  import { CityCard } from "../../components";
  
import { useDispatch } from "react-redux";
import { fetchCities } from "store/cities/actions";
import { useAppSelector } from "store";
import { Center, Spinner } from "@chakra-ui/react";
  
  
  const Cities = () => {
    const history = useHistory();
    const dispatch = useDispatch()

    const cities = useAppSelector(state => state.cities.cities)
    const isLoading = useAppSelector(state => state.cities.meta.isCitiesLoading)
  
    const navigateToCity = (cityId: string) =>
    history.push(`/cities/${cityId}`)

    React.useEffect(() => {
        dispatch(fetchCities())
    }, [dispatch])
  
    return (
      <Layout pt={8} pb={48}>
  
        <Box>
          <Heading size="lg" mb={8}>
            Cities
          </Heading>
          {
              isLoading? (
                  <Center>
                      <Spinner color="green.500" size="sm" />
                  </Center>
              ) :
          (
          <>
        <Breadcrumb mb={8}>
          <BreadcrumbItem>
            <BreadcrumbLink>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>
              <Link to="/cities">Cities</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

          <SimpleGrid columns={6} spacing={4}>
            {
                cities.map(city => (
                    <CityCard  key={city.id} city={city} onClick={() => navigateToCity(city.id)} />
                ))
            }
          </SimpleGrid>
          </>)}
        </Box>
      </Layout>
    );
  };
  
  export default Cities;
  