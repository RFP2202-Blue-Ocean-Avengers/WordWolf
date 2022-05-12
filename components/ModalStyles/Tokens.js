import styled from 'styled-components';

export const TokenModalContainer = styled.div`
  position: absolute;
  width: 276px;
  height: 440px;
  left: 954px;
  top: 140px;
`;

export const CloseButton = styled.button`
  color: white;
  width: 10%;
  float: right;
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

export const TokenList = styled.div`
  background-color: white;
  border-width: 2px;
  border-color: rgb(196, 196, 196);
  box-sizing: border-box;
  height: 89%;
  overflow: scroll;
`;

export const Question = styled.div`
`;
