
import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Sora } from 'next/font/google';
import theme from '../components/theme';
import NavBar from '../components/NavBar';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});


export const metadata: Metadata = {
  title: "Portofolio Mohammad Attallah",
  description: "Portofolio for Mohammad Attallah is a Full stack  developer at csc byond",
};

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

        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
