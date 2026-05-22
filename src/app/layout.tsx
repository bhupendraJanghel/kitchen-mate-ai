import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileLayout from "@/components/layout/MobileLayout";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "KitchenMate AI",
  description: "Cook with what you already have using AI-generated recipes.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KitchenMate"
  }
};

export const viewport: Viewport = {
  themeColor: "#0f0f11",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <MobileLayout>
          {children}
        </MobileLayout>
      </body>
    </html>
  );
}
