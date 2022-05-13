import styled from 'styled-components';

export const TokenModalContainer = styled.div`
  width: 276px;
  height: 440px;
`;

export const CloseButton = styled.button`
  color: white;
  width: 10%;
  float: right;
  font-size: 20px;
`;

export const ResponseContainer = styled.div`
  clear: both;
`;

export const YesButton = styled.button`
  background-color: green;
  color: white;
  width: 33.33%;
  border-radius: 40% 40% 0 0;
`;

export const NoButton = styled.button`
  background-color: red;
  color: white;
  width: 33.33%;
  border-radius: 40% 40% 0 0;
`;

export const MaybeButton = styled.button`
  background-color:blue;
  color: white;
  width: 33.33%;
  border-radius: 40% 40% 0 0;
`;

export const TokenListYes = styled.div`
  background-color: #9DBCA0;
  box-sizing: border-box;
  height: 89%;
  overflow: scroll;
`;

export const TokenListNo = styled.div`
  background-color: #D88989;
  box-sizing: border-box;
  height: 89%;
  overflow: scroll;
`;

export const TokenListMaybe = styled.div`
  background-color: #A5C2D7;
  box-sizing: border-box;
  height: 89%;
  overflow: scroll;
`;

export const Question = styled.div`
  padding-left: 15px;
  padding-top: 15px;
`;
