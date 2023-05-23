Front End Coding Challenge

## What are we optimising for?

### State Management

To show an understanding of Redux, I've implemented state management, to call the artwork API, and save the responses to a store. This approach will take care of refetching, and caching, to improved percieved performance.

## Routing

We've implemented `react-router-dom` to manage routing of this application, query params are use to manage pagination, and the ID of each artwork is used in the individual artwork route.
I've also implemented the router state, to allow the user to breadcrumb back to the page they were up to on the Home route.

### API payload

The endpoints we are referencing, allow us to specify the fields we need, this allows us to optimize the response from the server, and reduce the response payload.

### Typescript

This app in built in typescript, we are inferring the API types in `./src/services/artworks.ts` so that benifit from type safety throughout the app.

## What are we not optimising for?

### Styling

For this exercise, I've implemented styling via the Chakra UI library.

### Compatibility

For this excercise, we'll assume the user is using an up to date browser, this has been set up to compile using typescript, with no polyfills.

### Testing

I've kept the development of this quite functional, however I have not included any unit testing, to give more time to focus on other aspects of the requirements.

### Error Handling

API errors will return a 404 page at this stage, If this were to be fleshed out, we would show the user some more meaningful error messages.

## Features

### Image Loading

To avoid a jumpy UI, I've built an image loading component, that shows a loading skeleton in place of the image while it's fetched. This also allows us to set a fallback image when the image source URL doesn't load correctly which is the case for some of these artworks.

### Pagination

We can paginate through pages of results on the home page, after the first visit, these results are cached in the Redux store, so that they load instantaneously on the next visit.

_Note: The store is cleared on refresh, I did not set up local store persistence._

### Loading Skeletons

The user is presented with some rudimentary loading skeletons while the API is being called for the first time.

## Running this App

### Prerequisites

NodeJS - Tested on 18.12.0
PNPM - Package manager - should work on `yarn` or `npm`

### Setup

Run `pnpm install` to install dependencies.

Run `pnpm start` to start the development server.

Run `pnpm build` to build for production.

Navigate to `http://localhost:3000`
