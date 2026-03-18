import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio - Software Engineer",
  description: "Halo, perkenalkan! Saya adalah seorang Software Engineer yang suka mengeksplorasi teknologi dan menciptakan pengalaman digital yang menarik.",
  keywords: ["Software Engineer", "Web Development", "Portfolio", "Next.js", "React", "Tailwind CSS"],
  authors: [{ name: "Ahmad Sofi Sidik", url: "https://github.com/assidik12" }],
  openGraph: {
    title: "Portofolio - Software Engineer",
    description: "Halo, perkenalkan! Saya adalah seorang Software Engineer yang suka mengeksplorasi teknologi dan menciptakan pengalaman digital yang menarik.",
    url: "https://ahmad-sofi-sidik.vercel.app/",
    siteName: "Portofolio",
    images: [
      {
        url: "https://ahmad-sofi-sidik.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portofolio - Software Engineer",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@username",
    title: "Portofolio - Software Engineer",
    description: "Halo, perkenalkan! Saya adalah seorang Software Engineer yang suka mengeksplorasi teknologi dan menciptakan pengalaman digital yang menarik.",
    images: ["https://ahmad-sofi-sidik.vercel.app/og-image.png"],
  },
};

export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
