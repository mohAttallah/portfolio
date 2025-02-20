'use client';

import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Sora } from 'next/font/google';
import theme from '../components/theme';
import NavBar from '../components/NavBar';
import {Footer} from '../components/navBar';
const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={sora.className}>
        <AppRouterCacheProvider
          options={{ key: 'css' }}
        >
          <ThemeProvider theme={theme}>
            <NavBar />
            {children}
          </ThemeProvider>
          <Footer />


        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
