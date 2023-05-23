import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useGetArtworksQuery } from "../services/artworks";
import {
  Card,
  CardBody,
  SimpleGrid,
  GridItem,
  Button,
  Flex,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

import { getImageUrl } from "../utils";
import { ImageLoader } from "../Components/ImageLoader";
import { PageDetails } from "../Components/PageDetails";

const DOCUMENT_TITLE = "Artworks from The Art Institute of Chicago";

const ArtworkCard: React.FC<{
  id: string;
  title: string;
  artist: string;
  Image: React.ReactNode;
}> = ({ title, Image, id, artist }) => (
  <Link to={`/artwork/${id}`}>
    <Card height="100%">
      <CardBody>
        <Box mb={3}>{Image}</Box>
        <Heading mb={2} as="h2" size="sm">
          {title}
        </Heading>
        <Heading as="h3" size="xs">
          {artist}
        </Heading>
      </CardBody>
    </Card>
  </Link>
);

export const Home: React.FC<{}> = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { isError, isLoading, isSuccess, isFetching, data } =
    useGetArtworksQuery({ page });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [data?.meta.currentPage]);

  useEffect(() => {
    document.title = DOCUMENT_TITLE;
  }, []);

  const isOnFirstPage = page === 1;
  const isOnLastPage = page === data?.meta.totalPages;

  const nextPage = () => {
    setSearchParams(`page=${page + 1}`);
  };
  const prevPage = () => {
    setSearchParams(`page=${page - 1}`);
  };

  if (isError) return <div>Something went wrong</div>;

  return (
    <main>
      <Heading mb={6}>{DOCUMENT_TITLE}</Heading>

      <PageDetails showSpinner={isLoading || isFetching}>
        {isSuccess && (
          <Text align="right">
            Page <strong>{page}</strong> of {data.meta.totalPages}
          </Text>
        )}
      </PageDetails>

      {isSuccess && (
        <>
          <SimpleGrid mb={6} columns={[1, 2, 3, 4]} spacing={6}>
            {data.artworks.map((artwork) => (
              <GridItem key={artwork.id}>
                <ArtworkCard
                  title={artwork.title}
                  artist={artwork.artist_display}
                  id={artwork.id}
                  Image={
                    <ImageLoader
                      ratio={4 / 3}
                      src={getImageUrl(
                        data.meta.imageUrlBase,
                        artwork.image_id
                      )}
                      alt={artwork.alt_titles}
                    />
                  }
                />
              </GridItem>
            ))}
          </SimpleGrid>

          <Flex justifyContent="space-between">
            <Button
              loadingText="Loading Next Page"
              isLoading={isFetching && data.meta.currentPage > page}
              isDisabled={isOnFirstPage}
              onClick={prevPage}
            >
              Previous Page
            </Button>
            <Button
              loadingText="Loading Next Page"
              isLoading={isFetching && data.meta.currentPage < page}
              isDisabled={isOnLastPage}
              onClick={nextPage}
            >
              Next Page
            </Button>
          </Flex>
        </>
      )}
    </main>
  );
};