import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import DocsLayout from "../components/docs-layout";
import "../styles/globals.css";

export const githubUrl =
  "https://github.com/yamankatby/firestore-connect-document";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DocsLayout>
        <Component {...pageProps} />
      </DocsLayout>
    </ChakraProvider>
  );
}
