import Image from 'next/image';
import Wolf from '../assets/wolf.jpeg';
import Mayor from '../assets/mayor.jpeg';
import Seer from '../assets/seer.jpeg';
import Villager from '../assets/villager.jpeg';

import {
  RoleContainer,
  InnerRoleContainer,
  UserRolePhotoContainer,
  Img,
  Banner,
} from './ModalStyles/UserRoleCard';

function UserRole({ role }) {
  return (
    role
      ? (
        <RoleContainer>
          <InnerRoleContainer>
            {role === 'mayor'
              ? (
                <UserRolePhotoContainer>
                  <Img>
                    <Image src={Mayor} />
                  </Img>
                  <Banner>MAYOR</Banner>
                </UserRolePhotoContainer>
              ) : null}
            {role === 'seer'
              ? (
                <UserRolePhotoContainer>
                  <Img>
                    <Image src={Seer} />
                  </Img>
                  <Banner>SEER</Banner>
                </UserRolePhotoContainer>
              ) : null}
            {role === 'villager'
              ? (
                <UserRolePhotoContainer>
                  <Img>
                    <Image src={Villager} />
                  </Img>
                  <Banner>VILLAGER</Banner>
                </UserRolePhotoContainer>
              ) : null}
            {role === 'werewolf'
              ? (
                <UserRolePhotoContainer>
                  <Img>
                    <Image src={Wolf} />
                  </Img>
                  <Banner>WOLF</Banner>
                </UserRolePhotoContainer>
              ) : null}
          </InnerRoleContainer>
        </RoleContainer>
      ) : null
  );
}

export default UserRole;
