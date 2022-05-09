import { Center, Box } from "@chakra-ui/react"

const GameTable = () => {
  return (
    <Box w='900px' h='485px' background='#3A4171' borderWidth='10px' borderColor='#D19E61' borderRadius='full' bgGradient="linear(to-r, #3A4171, #2d3664)">
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px' borderColor='#E6474E' pos='absolute' top='7' left='175'/>
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px'borderColor='#F18E35' pos='absolute' top='7' left='655'/>
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px' borderColor='#F5D74C' pos='absolute' top='490' left='175'/>
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px' borderColor='#54B877' pos='absolute' top='490' left='655'/>
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px' borderColor='#55BFDB' pos='absolute' top='490' left='415'/>
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px'borderColor='#164186' pos='absolute' top='5' left='415'/>
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px' borderColor='#582C71' pos='absolute' top='370' left='2'/>
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px' borderColor='#D564D8' pos='absolute' top='140' left='825'/>
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px' borderColor='#71362E' pos='absolute' top='370' left='825'/>
      <Box w='70px' h='70px' borderRadius='full' background='#C4C4C4' borderWidth='5px' borderColor='#333333' pos='absolute' top='140' left='2'/>
    </Box>
  );
}

export default GameTable;
