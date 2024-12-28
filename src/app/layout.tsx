import { ReactNode } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

import theme from '@/theme';
import type { Metadata } from "next";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// This will override some of the above, but I like some of these styles better
import '@carbon/charts-react/styles.css';

import "./globals.css";

export const metadata: Metadata = {
  title: "DGH - React Demo - Profile",
  description: "Demo React and NextJS page",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    nosnippet: true,
    googleBot: {
      index: false,
      follow: false,
      nocache: true,
      nosnippet: true,
      noimageindex: true,
      "max-image-preview": "none",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
