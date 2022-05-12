import {
  RoleContainer,
  InnerRoleContainer,
  UserRolePhotoContainer,
  Img,
  Banner,
} from './ModalStyles/UserRoleCard';

function UserRole({ roles }) {
  return (
    <RoleContainer>
      <InnerRoleContainer>
        <UserRolePhotoContainer>
          <Img src="" />
        </UserRolePhotoContainer>
        <Banner>
          {roles?.toUpperCase()}
        </Banner>
      </InnerRoleContainer>
    </RoleContainer>
  );
}

export default UserRole;
