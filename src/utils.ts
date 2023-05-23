// Refer to: https://api.artic.edu/docs/#iiif-image-api for image URL construction details.
export const getImageUrl = (baseUrl: string, imageId: string) =>
  `${baseUrl}/${imageId}/full/843,/0/default.jpg`;
