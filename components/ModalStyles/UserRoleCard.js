import styled from 'styled-components';
import { Mayor } from '../../assets/mayor.jpeg';
import { Seer } from '../../assets/seer.jpeg';
import { Villager } from '../../assets/villager.jpeg';
import { Wolf } from '../../assets/wolf.jpeg';

export const RoleContainer = styled.div`
  background-color: #D19E61;
  border-radius: 5%;
  width: 220px;
  height: 250px;
`;

export const InnerRoleContainer = styled.div`
  background-color: #3A4171;
  margin: 5%;
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  font-size: 30px;
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
  border-width: 5px;
  border-color: rgb(36, 16, 56);
`;

export const Banner = styled.div`
  font-size: 23px;
  color: black;
  margin-top: 5px;
  width: 90px;
  text-align: center;
  background-color: white;
`;
