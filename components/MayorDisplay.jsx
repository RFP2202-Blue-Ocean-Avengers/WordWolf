import Image from 'next/image';
import { Box } from '@chakra-ui/react';
import Mayor from '../assets/mayor.jpeg';
import {
  BannerContainer,
  MayorBanner,
  UserBanner,
  UserRolePhotoContainer,
  Img,
} from './ModalStyles/UserRoleCard';

// mayor is expected to be a string of the player's name

function MayorDisplay({ mayor, lobby }) {
  return (
    <UserRolePhotoContainer>
      <Img>
        <Image src={Mayor} />
      </Img>
      <BannerContainer>
        <MayorBanner>MAYOR</MayorBanner>
        <Box color={lobby?.mayor.color}>
          <UserBanner>{mayor?.toUpperCase()}</UserBanner>
        </Box>
      </BannerContainer>
    </UserRolePhotoContainer>
  );
}

export default MayorDisplay;
