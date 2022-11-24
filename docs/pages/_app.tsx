import { createTheme, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import DocsLayout from "../components/docs-layout";
import "../styles/globals.css";

const theme = createTheme();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <DocsLayout>
        <Component {...pageProps} />
      </DocsLayout>
    </ThemeProvider>
  );
}
