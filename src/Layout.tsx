import React from "react";
import { Outlet } from "react-router-dom";

import { Container } from "@chakra-ui/react";

export const Layout = () => {
  return (
    <Container p={8} maxW="container.xl">
      <Outlet />
    </Container>
  );
};
