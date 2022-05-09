import { ChakraProvider } from '@chakra-ui/react';
import { StoreProvider } from './api/contextStore';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
