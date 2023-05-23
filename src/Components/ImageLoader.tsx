import React, { useState } from "react";

import { Skeleton, Center, Image, Box } from "@chakra-ui/react";
import { ViewOffIcon } from "@chakra-ui/icons";

export const ImageLoader: React.FC<{
  src: string;
  alt: string;
  ratio?: number;
}> = ({ src, alt, ratio }) => {
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  return (
    <Box width="100%" aspectRatio={ratio} bg={"gray.100"}>
      {loadState === "loading" && <Skeleton />}
      {loadState === "error" && (
        <Center width="100%" py={20} height="100%">
          <ViewOffIcon />
        </Center>
      )}
      {loadState !== "error" && (
        <Image
          src={src}
          alt={alt}
          width={"100%"}
          height={"100%"}
          objectFit={"contain"}
          onLoad={() => setLoadState("loaded")}
          onError={() => setLoadState("error")}
        />
      )}
    </Box>
  );
};
