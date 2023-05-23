import React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import store from "./store";

// Layout
import { Layout } from "./Layout";

// Pages
import { Home } from "./pages/Home";
import { Artwork } from "./pages/Artwork";
import { NotFound } from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/artwork/:id",
        element: <Artwork />,
      },
    ],
  },
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <Navigate to={"/404"} /> },
]);

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
