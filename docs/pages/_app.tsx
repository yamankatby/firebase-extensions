import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Inter } from "@next/font/google";
import type { AppProps } from "next/app";
import DocsLayout from "../components/docs-layout";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const theme = extendTheme({
  fonts: {
    body: "var(--font-inter)",
    heading: "var(--font-inter)",
  },
});

export const githubUrl =
  "https://github.com/yamankatby/firestore-connect-document";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} font-sans`}>
      <ChakraProvider theme={theme}>
        <DocsLayout>
          <Component {...pageProps} />
        </DocsLayout>
      </ChakraProvider>
    </main>
  );
}
