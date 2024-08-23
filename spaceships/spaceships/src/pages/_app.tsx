import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import "@/styles/global.css";
import theme from "@/styles/theme";
import { MainContainer } from "@/styles/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </ThemeProvider>
  );
}
