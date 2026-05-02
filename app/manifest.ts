import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Educrystal",
    short_name: "Educrystal",
    description: "Học nuôi tinh thể bằng các bước chi tiết, an toàn và dễ theo dõi.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff9eb",
    theme_color: "#fff6d8",
    lang: "vi",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
