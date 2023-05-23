import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import camelCaseKeys from "camelcase-keys";

/* We are inferring API types based off the documentation, 
I attempted to import these automatically from swagger, but their API schema is outdated. */

// Define artwork fields here, use for type safety when inferring response types
const GET_ARTWORK_FIELDS = [
  "title",
  "id",
  "image_id",
  "artist_display",
] as const;

type GetArtworksRawResponse = {
  data: {
    [key in (typeof GET_ARTWORK_FIELDS)[number]]: string;
  }[];
  pagination: {
    total: number;
    total_pages: number;
    current_page: number;
  };
  config: {
    iiif_url: string;
  };
};

const normalizeGetArtworks = (
  artworks: GetArtworksRawResponse["data"],
  baseImageUrl: string
) =>
  artworks.map((artwork) => ({
    ...camelCaseKeys(artwork),
    imageUrl: getImageUrl(baseImageUrl, artwork.image_id),
  }));

type GetArtworksResponse = {
  artworks: ReturnType<typeof normalizeGetArtworks>;
  meta: {
    totalResults: number;
    totalPages: number;
    currentPage: number;
  };
};

const ARTWORK_BY_ID_FIELDS = [
  ...GET_ARTWORK_FIELDS,
  "date_display",
  "place_of_origin",
  "medium_display",
  "artwork_type_title",
  "is_public_domain",
  "is_on_view",
] as const;

type ArtworkByIdRawResponse = {
  data: {
    [key in (typeof ARTWORK_BY_ID_FIELDS)[number]]: string;
  };
  config: {
    iiif_url: string;
  };
};

const normalizeArtworkById = (
  artwork: ArtworkByIdRawResponse["data"],
  baseImageUrl: string
) => ({
  ...camelCaseKeys(artwork),
  imageUrl: getImageUrl(baseImageUrl, artwork.image_id),
});

type ArtworkByIdResponse = ReturnType<typeof normalizeArtworkById>;

// Refer to: https://api.artic.edu/docs/#iiif-image-api for image URL construction details.
export const getImageUrl = (baseUrl: string, imageId: string) =>
  `${baseUrl}/${imageId}/full/843,/0/default.jpg`;

export const artworksApi = createApi({
  reducerPath: "artworksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.artic.edu/api/v1/",
  }),
  endpoints: (builder) => ({
    getArtworks: builder.query<GetArtworksResponse, { page: number }>({
      query: ({ page }) => {
        const params = new URLSearchParams({
          limit: "20",
          page: String(page),
          fields: GET_ARTWORK_FIELDS.join(","),
        });
        return `artworks?${params.toString()}`;
      },
      transformResponse: (rawResult: GetArtworksRawResponse) => ({
        artworks: normalizeGetArtworks(
          rawResult.data,
          rawResult.config.iiif_url
        ),
        meta: {
          totalPages: rawResult.pagination.total_pages,
          totalResults: rawResult.pagination.total,
          currentPage: rawResult.pagination.current_page,
        },
      }),
    }),
    getArtworkById: builder.query<ArtworkByIdResponse, { id: string }>({
      query: ({ id }) => {
        const searchParams = new URLSearchParams({
          fields: ARTWORK_BY_ID_FIELDS.join(","),
        });
        return `artworks/${id}?${searchParams.toString()}`;
      },
      transformResponse: (rawResult: ArtworkByIdRawResponse) =>
        normalizeArtworkById(rawResult.data, rawResult.config.iiif_url),
    }),
  }),
});

export const { useGetArtworksQuery, useGetArtworkByIdQuery } = artworksApi;
