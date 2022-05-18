import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Box,
  Button,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import GameLogo from '../assets/GameLogo.svg';

function Credits() {
  const [credits, setCredits] = useState(false);

  function onClick() {
    setCredits(!credits);
  }

  return (
    <div>
      <Box className="credits" as="button" onClick={() => onClick()}>
        CREDITS
      </Box>
      <Modal isOpen={credits} onClose={() => setCredits(false)}>
        <ModalOverlay />
        <ModalContent
          background="white"
        >
          <ModalHeader display="flex" flexDirection="column" justifyContent="center" alignItems="center" fontSize="20px">
            <Box backgroundColor="#211E32" display="flex" alignItems="center" borderRadius="20px" transform="scale(0.7)" justifyContent="center">
              <Image src="/CreditLogo.png" width="710px" height="200px" style={{ borderRadius: '20px' }} />
            </Box>
            <Box fontSize="30px">was brought to you by</Box>
          </ModalHeader>
          <ModalBody>
            <Box display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center" h="100vh">
              <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" fontSize="20px">
                Eunice Kim
                <Box fontSize="15px">
                  Product Manager & Software Engineer
                </Box>
                <Flex flexDirection="row" h="fit-content" w="100%" justifyContent="space-evenly" transform="scale(0.55)">
                  <Link href="https://www.linkedin.com/in/euniceyunjkim/">
                    <Image src="/Linkedin.png" width="624px" height="154px" />
                  </Link>
                  &nbsp;&nbsp;&nbsp;
                  <Link href="https://github.com/euniceyunjkim">
                    <Image src="/Github.png" width="532px" height="154px" />
                  </Link>
                </Flex>
              </Box>
              <Box fontSize="20px">
                Amy Kwak
              </Box>
              <Box fontSize="15px">
                UI Engineer & Software Engineer
              </Box>
              <Flex flexDirection="row" h="fit-content" w="100%" justifyContent="space-evenly" transform="scale(0.55)">
                <Link href="https://www.linkedin.com/in/amykwak/">
                  <Image src="/Linkedin.png" width="624px" height="154px" />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="https://github.com/amyKwak">
                  <Image src="/Github.png" width="532px" height="154px" />
                </Link>
              </Flex>
              <Box fontSize="20px">
                Danny Wong
              </Box>
              <Box fontSize="15px">
                Backend Architect & Software Engineer
              </Box>
              <Flex flexDirection="row" h="fit-content" w="100%" justifyContent="space-evenly" transform="scale(0.55)">
                <Link href="https://www.linkedin.com/in/danny96wong/">
                  <Image src="/Linkedin.png" width="624px" height="154px" />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="https://github.com/SoymilkSky">
                  <Image src="/Github.png" width="532px" height="154px" />
                </Link>
              </Flex>
              <Box fontSize="20px">
                Andy Chan
              </Box>
              <Box fontSize="15px">
                Software Engineer
              </Box>
              <Flex flexDirection="row" h="fit-content" w="100%" justifyContent="space-evenly" transform="scale(0.55)">
                <Link href="https://www.linkedin.com/in/andychan727/">
                  <Image src="/Linkedin.png" width="624px" height="154px" />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="https://github.com/ChanAndy727">
                  <Image src="/Github.png" width="532px" height="154px" />
                </Link>
              </Flex>
              <Box fontSize="20px">
                Anny Wang
              </Box>
              <Box fontSize="15px">
                Software Engineer
              </Box>
              <Flex flexDirection="row" h="fit-content" w="100%" justifyContent="space-evenly" transform="scale(0.55)">
                <Link href="https://www.linkedin.com/in/hsinanwang/">
                  <Image src="/Linkedin.png" width="624px" height="154px" />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="https://github.com/astrjc0326">
                  <Image src="/Github.png" width="532px" height="154px" />
                </Link>
              </Flex>
              <Box fontSize="20px">
                Bogdan Gordin
              </Box>
              <Box fontSize="15px">
                Software Engineer
              </Box>
              <Flex flexDirection="row" h="fit-content" w="100%" justifyContent="space-evenly" transform="scale(0.55)">
                <Link href="https://www.linkedin.com/in/bogdangordin/">
                  <Image src="/Linkedin.png" width="624px" height="154px" />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="https://github.com/bogdangordin">
                  <Image src="/Github.png" width="532px" height="154px" />
                </Link>
              </Flex>
              <Box fontSize="20px">
                Casey Eads
              </Box>
              <Box fontSize="15px">
                Software Engineer
              </Box>
              <Flex flexDirection="row" h="fit-content" w="100%" justifyContent="space-evenly" transform="scale(0.55)">
                <Link href="https://www.linkedin.com/in/casey-eads-1d618/">
                  <Image src="/Linkedin.png" width="624px" height="154px" />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="https://github.com/ceads1618">
                  <Image src="/Github.png" width="532px" height="154px" />
                </Link>
              </Flex>
              <Button marginTop="25px" marginBottom="15px" w="fit-content" colorScheme="blue" as="button" onClick={() => onClick()}>
                CLOSE
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Credits;
