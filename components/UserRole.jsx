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

function UserRole({ roles }) {
  return (
    roles
      ? (
        <RoleContainer>
          <InnerRoleContainer>
            {roles === 'mayor'
              ? (
                <UserRolePhotoContainer>
                  <Img>
                    <Image src={Mayor} />
                  </Img>
                  <Banner>MAYOR</Banner>
                </UserRolePhotoContainer>
              ) : null}
            {roles === 'seer'
              ? (
                <UserRolePhotoContainer>
                  <Img>
                    <Image src={Seer} />
                  </Img>
                  <Banner>SEER</Banner>
                </UserRolePhotoContainer>
              ) : null}
            {roles === 'villager'
              ? (
                <UserRolePhotoContainer>
                  <Img>
                    <Image src={Villager} />
                  </Img>
                  <Banner>VILLAGER</Banner>
                </UserRolePhotoContainer>
              ) : null}
            {roles === 'werewolf'
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
