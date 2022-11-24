import type { AppProps } from "next/app";
import DocsLayout from "../components/docs-layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DocsLayout>
      <Component {...pageProps} />
    </DocsLayout>
  );
}
