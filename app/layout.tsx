import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PwaRegister } from "@/components/pwa-register";

export const metadata: Metadata = {
  title: "Digital Chirkut Platform",
  description:
    "Progressive cybersecurity workflow platform with user operations, admin governance, subscriptions, and investigation continuity.",
  applicationName: "Digital Chirkut Platform",
  keywords: [
    "cybersecurity",
    "dork explorer",
    "dark web intelligence",
    "threat intelligence",
    "security operations",
    "PWA"
  ]
};

export const viewport: Viewport = {
  themeColor: "#07130f",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
