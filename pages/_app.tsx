import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

// CONTEXT PROVIDER
import {UserProvider} from "../context/users";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <UserProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
      </UserProvider>
  )
}

export default MyApp
