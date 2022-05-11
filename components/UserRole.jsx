import {
  RoleContainer,
  InnerRoleContainer,
  Img,
  Banner,
} from './ModalStyles/UserRoleCard';

function UserRole({ role }) {
  return (
    <RoleContainer>
      <InnerRoleContainer>
        <Img src="" />
        <Banner>{role.toUpperCase()}</Banner>
      </InnerRoleContainer>
    </RoleContainer>
  );
}

export default UserRole;
