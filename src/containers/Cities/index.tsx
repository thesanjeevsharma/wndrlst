import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from '@chakra-ui/breadcrumb'
import {
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from '@chakra-ui/layout'
import {
  Center,
  Spinner,
  useToast,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Alert,
  AlertIcon,
  Textarea,
} from '@chakra-ui/react'
import { Button } from '@chakra-ui/button'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input, InputGroup } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/checkbox'

import { useAppSelector } from 'store'
import { fetchCities } from 'store/cities/actions'

import { CityCard } from '../../components'
import { Layout } from '..'
import supabase from 'supabase'

const Cities = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const toast = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const {
    cities,
    meta: { isCitiesLoading: isLoading },
  } = useAppSelector((state) => state.cities)
  const { user } = useAppSelector((state) => state.user)

  const [name, setName] = React.useState<string>('')
  const [state, setState] = React.useState<string>('')
  const [country, setCountry] = React.useState<string>('')
  const [images, setImages] = React.useState<string[]>([''])
  const [population, setPopulation] = React.useState<string>('')
  const [area, setArea] = React.useState<string>('')
  const [languages, setLanguages] = React.useState<string>('')
  const [currency, setCurrency] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [isCovidFree, setIsCovidFree] = React.useState<boolean>(false)
  const [isHillStation, setIsHillStation] = React.useState<boolean>(false)
  const [isBeachStation, setIsBeachStation] = React.useState<boolean>(false)
  const [inFlight, setInFlight] = React.useState<boolean>(false)

  const navigateToCity = (cityId: string) => history.push(`/cities/${cityId}`)

  const handleAddCity = () => {
    if (!user) {
      return toast({
        position: 'top-right',
        title: 'Oops! Cannot do that.',
        description: 'Please login to add a City.',
        status: 'warning',
        isClosable: true,
        duration: 3000,
      })
    }
    onOpen()
  }

  const handleSubmit = async () => {
    try {
      setInFlight(true)

      if (
        !name ||
        !state ||
        !country ||
        !population ||
        !area ||
        !currency ||
        !description ||
        !languages ||
        !images.some((img) => img.length)
      ) {
        setInFlight(false)
        return toast({
          position: 'top-right',
          title: 'Invalid input!',
          description: 'All fields are required!',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      }

      if (Number.isNaN(area)) {
        setInFlight(false)
        return toast({
          position: 'top-right',
          title: 'Invalid area!',
          description: 'Area should be a numeric value!',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      }

      if (Number.isNaN(population)) {
        setInFlight(false)
        return toast({
          position: 'top-right',
          title: 'Invalid population!',
          description: 'Population should be a numeric value!',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      }

      const { error } = await supabase.from('requests').insert([
        {
          user_id: user.id,
          type: 'CITY',
          data: {
            name,
            state,
            country,
            languages,
            currency,
            description,
            population,
            area,
            isCovidFree,
            isHillStation,
            isBeachStation,
            images: images.filter((img) => img.length),
          },
        },
      ])

      if (error) {
        setInFlight(false)
        return toast({
          position: 'top-right',
          title: 'Failed to create request!',
          description: 'Please try again, later!',
          status: 'error',
          isClosable: true,
          duration: 3000,
        })
      }

      setName('')
      setState('')
      setCountry('')
      setLanguages('')
      setCurrency('')
      setArea('')
      setPopulation('')
      setDescription('')
      setImages([''])
      setIsHillStation(false)
      setIsCovidFree(false)
      setIsBeachStation(false)
      setInFlight(false)
      onClose()
      toast({
        position: 'top-right',
        title: 'Request created!',
        description: 'Thank you! Please check back later.',
        status: 'success',
        isClosable: true,
        duration: 3000,
      })
    } catch (err) {
      setInFlight(false)
      return toast({
        position: 'top-right',
        title: 'Something went wrong!',
        description: err.message,
        status: 'error',
        isClosable: true,
        duration: 3000,
      })
    }
  }

  React.useEffect(() => {
    dispatch(fetchCities())
  }, [dispatch])

  return (
    <Layout pt={8} pb={48}>
      <Box>
        <Flex mb={8} align="center" justify="space-between">
          <Heading size="lg">Cities</Heading>
          <Button
            variant="solid"
            colorScheme="whatsapp"
            onClick={handleAddCity}
            ref={btnRef}
          >
            Add your City
          </Button>
        </Flex>
        {isLoading ? (
          <Center>
            <Spinner color="#22c35e" size="sm" />
          </Center>
        ) : (
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
              {cities.map((city) => (
                <CityCard
                  key={city.id}
                  city={city}
                  onClick={() => navigateToCity(city.id)}
                />
              ))}
            </SimpleGrid>
          </>
        )}
      </Box>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a City</DrawerHeader>

          <DrawerBody>
            <Alert status="info" mb={16}>
              <AlertIcon />
              Your City won't be added right away. It has to be reviewed and
              approved by the admin. This process could take up to 24 hours.
            </Alert>

            <VStack spacing="4" align="start">
              <Input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <HStack spacing={4}>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </InputGroup>
              </HStack>

              {images.map((image, index) => (
                <Input
                  type="text"
                  placeholder="Enter Image URL"
                  key={index}
                  value={image}
                  onChange={(e) => {
                    const updatedImages = [...images]
                    updatedImages[index] = e.target.value
                    setImages(updatedImages)
                  }}
                />
              ))}

              <Button
                variant="ghost"
                color="gray.500"
                onClick={() => setImages([...images, ''])}
              >
                Add More
              </Button>

              <HStack spacing={4}>
                <InputGroup>
                  <Input
                    type="number"
                    placeholder="Enter Population"
                    value={population}
                    onChange={(e) => setPopulation(e.target.value)}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter Area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </InputGroup>
              </HStack>

              <HStack spacing={4}>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter Languages"
                    value={languages}
                    onChange={(e) => setLanguages(e.target.value)}
                  />
                </InputGroup>

                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter Currency"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </InputGroup>
              </HStack>

              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us something about the city"
              />

              <Checkbox
                colorScheme="whatsapp"
                isChecked={isCovidFree}
                onChange={() => setIsCovidFree(!isCovidFree)}
              >
                COVID Free
              </Checkbox>
              <Checkbox
                colorScheme="whatsapp"
                isChecked={isHillStation}
                onChange={() => setIsHillStation(!isHillStation)}
              >
                Hill Station
              </Checkbox>
              <Checkbox
                colorScheme="whatsapp"
                isChecked={isBeachStation}
                onChange={() => setIsBeachStation(!isBeachStation)}
              >
                Beach
              </Checkbox>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              onClick={onClose}
              isDisabled={inFlight}
            >
              Cancel
            </Button>
            <Button
              colorScheme="whatsapp"
              onClick={handleSubmit}
              isLoading={inFlight}
            >
              Create Request
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Layout>
  )
}

export default Cities
