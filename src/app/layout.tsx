import clsx from "clsx";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import TopBar from "@/designUI/sections/TopBar/TopBar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal portfolio and blog",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={clsx(geistSans.variable, geistMono.variable, "h-full scroll-smooth antialiased")}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <TopBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
