import { ChakraProvider } from '@chakra-ui/react';
import { SocketProvider } from './api/socketContext';
import { StoreProvider } from './api/contextStore';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <StoreProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </StoreProvider>
    </ChakraProvider>
  )
}

export default MyApp