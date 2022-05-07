import Link from 'next/link'
import { SocketProvider } from './api/socketContext';
import { ChakraProvider } from '@chakra-ui/react';

export default function Home() {
  return (
    <div>
      <Link href="/loginExample" as="/loginExample">
        <a>Login Page</a>
      </Link>
    </div>
  )
}
