import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Digital Chirkut Platform",
    short_name: "DCP",
    description:
      "Cybersecurity workflow platform with guided intelligence, saved reports, subscriptions, and admin governance.",
    start_url: "/",
    display: "standalone",
    background_color: "#07130f",
    theme_color: "#07130f",
    icons: [
      {
        src: "/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml"
      },
      {
        src: "/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml"
      }
    ]
  };
}
