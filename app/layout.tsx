import "./globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Provider from "@/components/providers/Provider";

const outFit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Kart",
  description: "Build a simple E commerce project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outFit.variable} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
