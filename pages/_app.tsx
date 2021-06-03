import "../styles/globals.css";
import type { AppProps } from "next/app";
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

import userTheme from "../theme";

const globalStyles = {
  styles: {
    global: {
      "html, body, body > div": {
        width: "100%",
        height: "100%",
      },
    },
  },
};

const theme = extendTheme({ ...globalStyles, ...userTheme });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default MyApp;
