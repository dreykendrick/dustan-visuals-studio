import { queryOptions } from "@tanstack/react-query";
import { getSiteImages } from "@/lib/site-images.functions";

export const siteImagesQuery = queryOptions({
  queryKey: ["site-images"],
  queryFn: () => getSiteImages(),
});