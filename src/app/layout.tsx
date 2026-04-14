import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProviders } from "@/providers/AppContext";
import { CustomCursor } from "@/components/CustomCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { ProgressBar } from "@/components/ProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abubaker Abdalla | Creative Developer & Co-Founder",
  description: "Senior WordPress Developer, Project Coordinator, and scalable web solutions builder from Dubai. Co-Founder at MS Rockets.",
  keywords: ["WordPress", "Laravel", "Project Management", "Dubai", "Lead Developer", "Web Developer", "React", "Next.js", "MS Rockets", "Creative Developer"],
  authors: [{ name: "Abubaker Abdalla" }],
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://msrockets.com",
    title: "Abubaker Abdalla | Creative Developer",
    description: "Premium digital experiences from Dubai. Co-Founder @ MS Rockets.",
    siteName: "Abubaker Abdalla Portfolio",
    images: [
      {
        url: "/sequence/001.webp",
        width: 1200,
        height: 630,
        alt: "Abubaker Abdalla Portfolio Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abubaker Abdalla | Creative Developer",
    description: "Building scalable web products & award-winning layouts.",
    images: ["/sequence/001.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="dark"
      style={{ colorScheme: "dark" }}
    >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-black text-white`}>
        <SmoothScroll>
          <AppProviders>
            <ProgressBar />
            <CustomCursor />
            {children}
          </AppProviders>
        </SmoothScroll>
      </body>
    </html>
  );
}
