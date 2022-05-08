import Link from 'next/link'
import { SocketProvider } from './api/socketContext';
import { ChakraProvider } from '@chakra-ui/react';
import ExampleComponent from '../components/exampleComponent';
import LobbyTable from './../components/LobbyTable.jsx'

export default function Home() {
  return (
    <div>
      <ExampleComponent />
      <Link href="/loginExample" as="/loginExample">
        <a>Click to play!!</a>
      </Link>
    </div>
  )
}
