import Link from 'next/link'
import { ChakraProvider } from '@chakra-ui/react';
import ExampleComponent from '../components/exampleComponent';

export default function Home() {
  return (
    <div>
      <ExampleComponent />
      <Link href="/login" as="/login">
        <a>Click to play!!</a>
      </Link>
    </div>
  )
}
