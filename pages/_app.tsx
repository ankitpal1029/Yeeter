import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import colors from "../utils/colors";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: `${colors.bg}`,
        fontFamily: "Helvetica",
        overflowY: "scroll",
      },
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
