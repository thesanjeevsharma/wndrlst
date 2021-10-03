import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/layout";

import { Navbar, Footer } from "../";

type Props = {
  children: ReactNode;
  withNav?: boolean;
  // TODO: add BoxProps here
  [key: string]: any;
};

const Layout = ({ children, withNav = true, px = 12, ...props }: Props) => {
  return (
    <Box>
      {withNav && <Navbar />}
      <Box px={px} {...props}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
