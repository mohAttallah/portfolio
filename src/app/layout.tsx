
import { Metadata } from "next";
import "./globals.css";
import { Sora } from 'next/font/google';
import NavBar from '../components/NavBar';
import { Footer } from '../components/navBar';
import ClientWrapper from 'src/app/ClientWrapper';
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  title: "Mohammad Attallah | Full Stack Developer Portfolio",
  
  description: "Showcasing the work of Mohammad Attallah, a skilled Software Engineer and Full Stack JavaScript Developer with a BS in Computer Information Systems. Expertise in React, Next.js, and modern web development.",
  
  keywords: [
    "software engineer",
    "full stack developer",
    "JavaScript",
    "React",
    "Next.js",
    "web development",
    "frontend development",
    "backend development",
    "portfolio",
    "Mohammad Attallah",
    "creative developer",
    "team player"
  ].join(", "),
  
  authors: [{ name: "Mohammad Attallah", url: "https://mohammadattallah.live" }],
  
  openGraph: {
    title: "Mohammad Attallah | Full Stack Developer Portfolio",
    description: "Explore the portfolio of Mohammad Attallah, a passionate Software Engineer specializing in Full Stack JavaScript development with React and Next.js.",
    url: "https://mohammadattallah.live",
    locale: "en_US",
    siteName: "Mohammad Attallah Portfolio",
    type: "website",
    images: [
      {
        url: `${baseUrl}/Images/icons/footer-logo.png`, 
        width: 1200,
        height: 630,
        alt: "Mohammad Attallah Portfolio Logo",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Attallah | Full Stack Developer Portfolio",
    description: "Full Stack JavaScript Developer and Software Engineer specializing in React, Next.js, and modern web solutions.",
    images: [`${baseUrl}/Images/icons/footer-logo.png`],
    creator: "@MohammadAttal13",
  },
  
  verification: {
    google: googleSiteVerification,
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1, 
      "max-video-preview": -1, 
    },
  },
  
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  
  alternates: {
    canonical: baseUrl,
  },
  
  category: "Portfolio",
  creator: "Mohammad Attallah",
  publisher: "Mohammad Attallah",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <ClientWrapper>
          <NavBar />
          {children}
          <Footer />
        </ClientWrapper>
      </body>
    </html>
  );
}
