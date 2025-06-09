import type { Metadata } from "next";
import { Inter, Saira, Roboto, Roboto_Slab } from "next/font/google";
import "./globals.css";
import tailwind from "tailwindcss";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "xFlair Demo",
  description: "A demo for xFlair",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
