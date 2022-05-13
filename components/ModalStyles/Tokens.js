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
  background-color: #3C8F45;
  color: white;
  width: 33.33%;
  border-radius: 40% 40% 0 0;
`;

export const NoButton = styled.button`
  background-color: #BB1F1F;
  color: white;
  width: 33.33%;
  border-radius: 40% 40% 0 0;
`;

export const MaybeButton = styled.button`
  background-color: #3A5DB6;
  color: white;
  width: 33.33%;
  border-radius: 40% 40% 0 0;
`;

export const TokenListYes = styled.div`
  background-color: #3C8F45;
  color: white;
  box-sizing: border-box;
  height: 89%;
  overflow: scroll;
`;

export const TokenListNo = styled.div`
  background-color: #BB1F1F;
  color: white;
  box-sizing: border-box;
  height: 89%;
  overflow: scroll;
`;

export const TokenListMaybe = styled.div`
  background-color: #3A5DB6;
  color: white;s
  box-sizing: border-box;
  height: 89%;
  overflow: scroll;
`;

export const Question = styled.div`
  padding: 15px;
`;
