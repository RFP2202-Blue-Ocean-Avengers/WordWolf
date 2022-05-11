import {
  RoleContainer,
  InnerRoleContainer,
  Img,
  Banner,
} from './ModalStyles/UserRoleCard';

function UserRole({ player }) {
  return (
    <RoleContainer>
      <InnerRoleContainer>
        <Img src="" />
        <Banner>{player.role}</Banner>
      </InnerRoleContainer>
    </RoleContainer>
  );
}

export default UserRole;
