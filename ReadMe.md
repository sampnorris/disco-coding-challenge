# Frontend Coding Challenge

The excercise is to create a Redux app for The Art Institute of Chicago, this app displays a gallary of artworks from (their api)[https://api.artic.edu/docs/#collections].

As the purpose pf this exercise is to test frontend proficiency, particularly in the areas of state management, routing, and API integration. Below I've outlined my approach.

## What are we optimizing for?

### State Management

To demonstrate an understanding of Redux, I have implemented state management to call the artwork API and save the responses to a store. This approach takes care of refetching and caching, improving perceived performance.

### Routing

I have implemented react-router-dom to manage the routing of this application. Query parameters are used to handle pagination, and the ID of each artwork is utilised in the individual artwork route. Additionally, I have implemented the router state to allow the user to breadcrumb back to the page they were on in the Home route.

### API Payload

The endpoints we are referencing allow us to specify the fields we need. This optimisation reduces the response payload from the server to improve performance.

### TypeScript

This app is built in TypeScript. We infer the API types in `./src/services/artworks.ts` to benefit from type safety throughout the app.

## What are we not optimizing for?

### Styling

For this exercise, I have implemented styling using the Chakra UI library, I've chosen no to focus on stlying or HTML markup.

### Compatibility

For this exercise, we assume that the user is using an up-to-date browser. The project is set up to compile using TypeScript without any polyfills to support legacy browsers.

### Testing

I have not included any unit testing. This decision was made to allocate more time to other aspects of the requirements.

### Error Handling

API errors will currently result in a 404 page. If further development were to be done, we would provide more meaningful error messages to the user.

## Features

### Image Loading

To prevent a jumpy UI, I have created an image loading component that displays a loading skeleton while the image is being fetched. This component also allows us to set a fallback image when the image source URL fails to load correctly, as is the case with some artworks retrieved from the API.

### Pagination

On the home page, we can paginate through multiple result pages. After the first visit, these results are cached in the Redux store, ensuring instantaneous loading on subsequent visits.

_Note: The store is cleared upon refresh. Local store persistence has not been set up._

### Loading Skeletons

While the API is being called for the first time, the user is presented with rudimentary loading skeletons

## Running this App

### Prerequisites

NodeJS - Tested on version 18.12.0
PNPM - Package manager (should work with yarn or npm as well)

### Setup

Run `pnpm install` to install the dependencies.

Run `pnpm start` to start the development server.

Run `pnpm build` to build for production.

Navigate to `http://localhost:3000`
