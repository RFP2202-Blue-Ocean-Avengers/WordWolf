import styled from 'styled-components';

export const RoleContainer = styled.div`
  background-color: #D19E61;
  width: 220px;
  height: 250px;
`;

export const InnerRoleContainer = styled.div`
  background-color: white;
  display: flex;
  margin: 5%;
  padding-top: 23px;
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  border-width: 1px;
  border-color: black;
`;

export const UserRolePhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Img = styled.div`
  display: inline-block;
  height: 90px;
  width: 90px;
  border-radius: 50%;
  overflow: hidden;
`;

export const Banner = styled.div`
  font-size: 23px;
  color: white;
  margin-top: 8px;
  width: 90px;
  text-align: center;
  background-color: black;
  border-radius: 5px;
`;

export const BannerContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  margin-top: 10px;
  max-height: 100px;
  max-width: 110px;
  min-width: 100%;
  overflow: scroll;
`;

export const MayorBanner = styled.div`
  text-align: center;
`;

export const UserBanner = styled.div`
  text-align: center;
`;
