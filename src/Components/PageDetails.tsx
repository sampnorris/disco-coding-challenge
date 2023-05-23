import React from "react";
import { Card, Spinner } from "@chakra-ui/react";

export const PageDetails: React.FC<{
  showSpinner: boolean;
  children: React.ReactNode;
}> = ({ showSpinner, children }) => (
  <Card p={6} mb={4}>
    {showSpinner ? <Spinner size="md" /> : children}
  </Card>
);
