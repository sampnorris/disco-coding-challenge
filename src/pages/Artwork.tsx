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
import { ImageLoader } from "../Components/ImageLoader";
import { PageDetails } from "../Components/PageDetails";
import { useGetArtworkByIdQuery } from "../services/artworks";
import { getImageUrl } from "../utils";

export const Artwork: React.FC<{}> = () => {
  const { id } = useParams();
  const { state } = useLocation();

  const { isError, isLoading, isSuccess, data } = useGetArtworkByIdQuery({
    id: id || "",
  });

  useEffect(() => {
    if (data?.artwork.title) document.title = data?.artwork.title;
  }, [data?.artwork.title]);

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
          {data?.artwork.title}
        </Text>
      </PageDetails>

      <SimpleGrid columns={[1, null, 2]} gap={6}>
        {isSuccess ? (
          <>
            <GridItem>
              <ImageLoader
                src={getImageUrl(data.meta.imageUrlBase, data.artwork.image_id)}
                alt={data.artwork.description}
              />
            </GridItem>
            <GridItem>
              <Heading mb={2} as="h1">
                {data.artwork.title}
              </Heading>
              <Heading mb={3} as="h2" size="md">
                {data.artwork.artist_display}
              </Heading>
              <Wrap mb={4}>
                {data.artwork.is_public_domain && (
                  <Tag size="md" colorScheme="blue">
                    Public Domain
                  </Tag>
                )}
                {data.artwork.is_on_view && (
                  <Tag size="md" colorScheme="gray">
                    On View
                  </Tag>
                )}
                <Tag size="md" colorScheme="orange">
                  {data.artwork.artwork_type_title}
                </Tag>
                <Tag size="md" colorScheme="green">
                  {data.artwork.medium_display}
                </Tag>
              </Wrap>

              <Text>
                <strong>Period:</strong> {data.artwork.date_display}
              </Text>
              <Text>
                <strong>Origin:</strong> {data.artwork.place_of_origin}
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
