import {
  RoleContainer,
  InnerRoleContainer,
  UserRolePhotoContainer,
  Img,
  Banner,
} from './ModalStyles/UserRoleCard';

function UserRole({ role }) {
  return (
    <RoleContainer>
      <InnerRoleContainer>
        <UserRolePhotoContainer>
          <Img src="" />
          <Banner>{role?.toUpperCase()}</Banner>
        </UserRolePhotoContainer>
      </InnerRoleContainer>
    </RoleContainer>
  );
}

export default UserRole;
