import type { Metadata } from "next";
import { Quicksand, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ahmad Sofi Sidik | Software Engineer",
  description: "Portfolio Ahmad Sofi Sidik — Software Engineer dari Universitas Bina Sarana Informatika Kota Tegal, Jurusan Teknologi Informasi. Suka ngulik Web3, IoT, dan Computer Vision.",
  keywords: [
    "Ahmad Sofi Sidik",
    "Software Engineer",
    "IoT Engineer",
    "AI Engineer",
    "Web Developer",
    "Blockchain Developer",
    "Portfolio",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Ahmad Sofi Sidik", url: "https://github.com/assidik12" }],
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Ahmad Sofi Sidik | Software Engineer",
    description: "Portfolio Ahmad Sofi Sidik — Software Engineer dari Universitas Bina Sarana Informatika Kota Tegal, Jurusan Teknologi Informasi.",
    url: "https://ahmad-sofi-sidik.vercel.app",
    siteName: "ahmad-sofi-sidik.vercel.app",
    images: [
      {
        url: "https://ahmad-sofi-sidik.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahmad Sofi Sidik - Software Engineer Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmad Sofi Sidik | Software Engineer",
    description: "Portfolio Ahmad Sofi Sidik — Software Engineer dari Universitas Bina Sarana Informatika Kota Tegal.",
    images: ["https://ahmad-sofi-sidik.vercel.app/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${quicksand.variable} ${inter.variable} font-inter antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
