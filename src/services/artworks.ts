import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/* We are inferring API types based off the documentation, 
I attempted to import these automatically from swagger, but their API schema is outdated. */

type Artwork = {
  id: string;
  title: string;
  description: string;
  image_id: string;
  alt_titles: string;
  thumbnail: string;
  artist_display: string;
};

type DetailedArtwork = {
  id: string;
  title: string;
  description: string;
  image_id: string;
  date_display: string;
  artist_display: string;
  place_of_origin: string;
  medium_display: string;
  artwork_type_title: string;
  is_public_domain: string;
  is_on_view: string;
};

type GetArtworksRawResponse = {
  data: Artwork[];
  pagination: {
    total: number;
    total_pages: number;
    current_page: number;
  };
  config: {
    iiif_url: string;
  };
};

type GetArtworksResponse = {
  artworks: Artwork[];
  meta: {
    totalResults: number;
    totalPages: number;
    imageUrlBase: string;
    currentPage: number;
  };
};

type ArtworkByIdRawResponse = {
  data: DetailedArtwork;
  config: {
    iiif_url: string;
  };
};

type ArtworkByIdResponse = {
  artwork: DetailedArtwork;
  meta: {
    imageUrlBase: string;
  };
};

export const artworksApi = createApi({
  reducerPath: "artworksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.artic.edu/api/v1/",
  }),
  endpoints: (builder) => ({
    getArtworks: builder.query<GetArtworksResponse, { page: number }>({
      query: ({ page }) => {
        const searchParams = new URLSearchParams({
          limit: "20",
          page: String(page),
          fields: "title,id,description,image_id,alt_titles,artist_display",
        });
        return `artworks?${searchParams.toString()}`;
      },
      transformResponse: (rawResult: GetArtworksRawResponse) => ({
        artworks: rawResult.data,
        meta: {
          imageUrlBase: rawResult.config.iiif_url,
          totalPages: rawResult.pagination.total_pages,
          totalResults: rawResult.pagination.total,
          currentPage: rawResult.pagination.current_page,
        },
      }),
    }),
    getArtworkById: builder.query<ArtworkByIdResponse, { id: string }>({
      query: ({ id }) => {
        const searchParams = new URLSearchParams({
          fields:
            "id,title,description,image_id,date_display,artist_display,place_of_origin,medium_display,artwork_type_title,is_public_domain,is_on_view",
        });
        return `artworks/${id}?${searchParams.toString()}`;
      },
      transformResponse: (rawResult: ArtworkByIdRawResponse) => ({
        artwork: rawResult.data,
        meta: {
          imageUrlBase: rawResult.config.iiif_url,
        },
      }),
    }),
  }),
});

export const { useGetArtworksQuery, useGetArtworkByIdQuery } = artworksApi;
