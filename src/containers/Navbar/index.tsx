import React from "react";
import { Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

const Navbar = () => {
  return (
    <Flex align="center" justify="space-between" height={16} px={12}>
      <Heading size="lg">wndrlst</Heading>
      <Flex align="center">
        <Button mr={4} colorScheme="whatsapp">
          Login
        </Button>
        <Button colorScheme="whatsapp" variant="outline">
          Sign Up
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
