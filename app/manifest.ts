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
        src: "/covers/crystal-bloom.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/covers/rainbow-frame.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
