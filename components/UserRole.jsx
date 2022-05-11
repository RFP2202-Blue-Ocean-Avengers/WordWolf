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
        <div>
          HELLO HELP
        </div>
        <Banner>{role?.toUpperCase()}</Banner>
      </InnerRoleContainer>
    </RoleContainer>
  );
}

export default UserRole;
