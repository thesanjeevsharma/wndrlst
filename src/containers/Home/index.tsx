import { Box, Center, VStack } from "@chakra-ui/layout";

import { Layout } from "../";
import { CitiesSection, Search } from "../../components";
import Navbar from "../Navbar";

const mockData = [
  {
    title: "Near you",
    data: [
      {
        id: "1",
        name: "New York",
        image:
          "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80",
        description:
          "New York is a state in the Northeastern and Mid-Atlantic regions of the United States. New York is the 27th-most extensive, the third-most populous, and the seventh-most densely populated of the 50 United States. New York is bordered by New Jersey and Pennsylvania to the south, Pennsylvania to the north, Connecticut and Massachusetts to the west, and the Atlantic Ocean to the east.",
        population: 8550902,
        area: 14973.0,
        currency: "United States Dollar",
        languages: ["English"],
        flag: "https://restcountries.eu/data/usa.svg",
        createdAt: "Today",
        isCovidFree: true,
        isHillStation: false,
        isBeachStation: false,
      },
      {
        id: "2",
        name: "Los Angeles",
        image:
          "https://images.unsplash.com/photo-1444723121867-7a241cacace9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        description:
          "New York is a state in the Northeastern and Mid-Atlantic regions of the United States. New York is the 27th-most extensive, the third-most populous, and the seventh-most densely populated of the 50 United States. New York is bordered by New Jersey and Pennsylvania to the south, Pennsylvania to the north, Connecticut and Massachusetts to the west, and the Atlantic Ocean to the east.",
        population: 8550902,
        area: 14973.0,
        currency: "United States Dollar",
        languages: ["English"],
        flag: "https://restcountries.eu/data/usa.svg",
        createdAt: "Today",
        isCovidFree: true,
        isHillStation: false,
        isBeachStation: false,
      },
    ],
  },
  {
    title: "Popular",
    data: [
      {
        id: "3",
        name: "Hawaii",
        image:
          "https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1169&q=80",
        description:
          "New York is a state in the Northeastern and Mid-Atlantic regions of the United States. New York is the 27th-most extensive, the third-most populous, and the seventh-most densely populated of the 50 United States. New York is bordered by New Jersey and Pennsylvania to the south, Pennsylvania to the north, Connecticut and Massachusetts to the west, and the Atlantic Ocean to the east.",
        population: 8550902,
        area: 14973.0,
        currency: "United States Dollar",
        languages: ["English"],
        flag: "https://restcountries.eu/data/usa.svg",
        createdAt: "Today",
        isCovidFree: true,
        isHillStation: false,
        isBeachStation: false,
      },
      {
        id: "2",
        name: "Alaska",
        image:
          "https://images.unsplash.com/photo-1535025287458-e3badca98021?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YWxhc2thfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description:
          "New York is a state in the Northeastern and Mid-Atlantic regions of the United States. New York is the 27th-most extensive, the third-most populous, and the seventh-most densely populated of the 50 United States. New York is bordered by New Jersey and Pennsylvania to the south, Pennsylvania to the north, Connecticut and Massachusetts to the west, and the Atlantic Ocean to the east.",
        population: 8550902,
        area: 14973.0,
        currency: "United States Dollar",
        languages: ["English"],
        flag: "https://restcountries.eu/data/usa.svg",
        createdAt: "Today",
        isCovidFree: true,
        isHillStation: false,
        isBeachStation: false,
      },
    ],
  },
];

const Home = () => {
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
        <VStack spacing={16} align="flex-start">
          {mockData.map((section) => (
            <CitiesSection {...section} />
          ))}
        </VStack>
      </Box>
    </Layout>
  );
};

export default Home;
