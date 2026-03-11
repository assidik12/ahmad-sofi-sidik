import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portofolio - Software Engineer',
  description: 'Halo, perkenalkan! Saya adalah seorang Software Engineer yang suka mengeksplorasi teknologi dan menciptakan pengalaman digital yang menarik.',
  keywords: ['Software Engineer', 'Web Development', 'Portfolio', 'Next.js', 'React', 'Tailwind CSS'],
  authors: [{ name: 'Nama Anda', url: 'https://github.com/username' }],
  openGraph: {
    title: 'Portofolio - Software Engineer',
    description: 'Halo, perkenalkan! Saya adalah seorang Software Engineer yang suka mengeksplorasi teknologi dan menciptakan pengalaman digital yang menarik.',
    url: 'https://your-portfolio-url.com',
    siteName: 'Portofolio',
    images: [
      {
        url: 'https://your-portfolio-url.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portofolio - Software Engineer',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@username',
    title: 'Portofolio - Software Engineer',
    description: 'Halo, perkenalkan! Saya adalah seorang Software Engineer yang suka mengeksplorasi teknologi dan menciptakan pengalaman digital yang menarik.',
    images: ['https://your-portfolio-url.com/og-image.png'],
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