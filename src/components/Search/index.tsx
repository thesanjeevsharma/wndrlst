import React from 'react'
import { Button } from '@chakra-ui/button'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Flex, Stack } from '@chakra-ui/layout'

import { SearchIcon } from 'assets/icons'

type Props = {
  onSearch: (query: string) => void
}

const Search = ({ onSearch }: Props) => {
  const [query, setQuery] = React.useState('')

  const handleSearch = () => {
    onSearch(query)
  }

  return (
    <Flex align="center">
      <Stack spacing={4} minWidth={96} mr={4}>
        <InputGroup bg="white" borderRadius={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon size={5} color="gray.300" />}
          />
          <Input
            type="text"
            placeholder="Try searching for 'Hisar'"
            textColor="gray.600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>
      </Stack>
      <Button colorScheme="whatsapp" type="submit" onClick={handleSearch}>
        Search
      </Button>
    </Flex>
  )
}

export default Search
