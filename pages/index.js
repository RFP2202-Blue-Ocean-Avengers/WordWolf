import Link from 'next/link'
import { ChakraProvider } from '@chakra-ui/react';

export default function Home() {
  return (
    <div>
      <Link href="/login" as="/login">
        <a>Click to play!!</a>
      </Link>
    </div>
  )
}
