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
