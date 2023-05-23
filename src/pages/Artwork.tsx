import React, { useEffect } from "react";
import {
  useParams,
  Link as RRLink,
  Navigate,
  useLocation,
} from "react-router-dom";

import {
  SimpleGrid,
  GridItem,
  Heading,
  Link,
  Wrap,
  Text,
  Tag,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { ImageLoader } from "../components/ImageLoader";
import { PageDetails } from "../components/PageDetails";
import { useGetArtworkByIdQuery } from "../services/artworks";

export const Artwork: React.FC<{}> = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const {
    isError,
    isLoading,
    isSuccess,
    data: artwork,
  } = useGetArtworkByIdQuery({
    id: id || "",
  });

  useEffect(() => {
    if (artwork?.title) document.title = artwork?.title;
  }, [artwork?.title]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div>
      <PageDetails showSpinner={isLoading}>
        <Text>
          <Link as={RRLink} to={"/"}>
            {`Home / `}
          </Link>
          {state.page && (
            <Link as={RRLink} to={`/?page=${state.page}`}>
              {`Page ${state.page} / `}
            </Link>
          )}
          {artwork?.title}
        </Text>
      </PageDetails>

      <SimpleGrid columns={[1, null, 2]} gap={6}>
        {isSuccess ? (
          <>
            <GridItem>
              <ImageLoader src={artwork.imageUrl} alt={artwork.title} />
            </GridItem>
            <GridItem>
              <Heading mb={2} as="h1">
                {artwork.title}
              </Heading>
              <Heading mb={3} as="h2" size="md">
                {artwork.artistDisplay}
              </Heading>
              <Wrap mb={4}>
                {artwork.isPublicDomain && (
                  <Tag size="md" colorScheme="blue">
                    Public Domain
                  </Tag>
                )}
                {artwork.isOnView && (
                  <Tag size="md" colorScheme="gray">
                    On View
                  </Tag>
                )}
                <Tag size="md" colorScheme="orange">
                  {artwork.artworkTypeTitle}
                </Tag>
                <Tag size="md" colorScheme="green">
                  {artwork.mediumDisplay}
                </Tag>
              </Wrap>

              <Text>
                <strong>Period:</strong> {artwork.dateDisplay}
              </Text>
              <Text>
                <strong>Origin:</strong> {artwork.placeOfOrigin}
              </Text>
            </GridItem>
          </>
        ) : (
          <>
            <GridItem>
              <Skeleton height={"200px"} />
            </GridItem>
            <GridItem>
              <Skeleton mb={2} height={"20px"} />
              <Skeleton mb={3} height={"15px"} />
              <SkeletonText noOfLines={10} />
            </GridItem>
          </>
        )}
      </SimpleGrid>
    </div>
  );
};
