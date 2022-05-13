import Image from 'next/image';
import Mayor from '../assets/mayor.jpeg';
import {
  BannerContainer,
  MayorBanner,
  UserBanner,
  UserRolePhotoContainer,
  Img,
} from './ModalStyles/UserRoleCard';

function MayorDisplay({ mayor }) {
  return (
    <UserRolePhotoContainer>
      <Img>
        <Image src={Mayor} />
      </Img>
      <BannerContainer>
        <MayorBanner>MAYOR</MayorBanner>
        <UserBanner>{mayor}</UserBanner>
      </BannerContainer>
    </UserRolePhotoContainer>
  );
}

export default MayorDisplay;
