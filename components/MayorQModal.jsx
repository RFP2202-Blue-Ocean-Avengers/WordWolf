/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-multiple-empty-lines */
/*
RFP2202-Blue-Ocean-Avengers BOA
Amy Kwak, Andy Chan, Anny Wang, Bogdan Gordin, Casey Eads, Danny Wong, Eunice Kim
5/8/22
Blue Ocean
this is the mayor modal that shows the oldest question asked and the buttons to answer that question
could be hidden if no questions are in the queue?
*/

import io from 'socket.io-client';
import { useState, useEffect, useContext } from 'react';
import { Button, Input, UnorderedList, ListItem } from '@chakra-ui/react';
import styled from 'styled-components';
import { BiCheck } from 'react-icons/bi';
import { BiQuestionMark } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { GrStar } from 'react-icons/gr';
import { BsExclamationLg } from 'react-icons/bs';
import { MdDoDisturb } from 'react-icons/md';

import { socket } from '../pages/api/service/socket';








function MayorQModal({ lobby, loginData }) {

  const [currQuestion, setCurrQuestion] = useState(lobby.questions[0]);


  const clickedOnButton = (e) => { // will handle the click types here through e.target.id

    socket.emit('AnsweredQuestion', { answer: e.target.id, question: currQuestion, lobby: lobby.name });

    console.log(lobby);
    console.log(currQuestion);

  };


  return (
    <Container id="MayorQModal">

      <QuestionP id="CurrQuestion">{currQuestion ? `Q: ${currQuestion}` : `Q: ---`}</QuestionP>

      <ButtonsDiv id="QuestionButtons">
        <TokenBY id="AnsYes" type="button" onClick={(e) => { clickedOnButton(e); }}><BiCheck id="AnsYes" size={30} style={{ margin: "0px auto" }} /></TokenBY>
        <TokenBM id="AnsMaybe" type="button" onClick={(e) => { clickedOnButton(e); }}><BiQuestionMark id="AnsMaybe" size={30} style={{ margin: "0px auto" }} /></TokenBM>
        <TokenBN id="AnsNo" type="button" onClick={(e) => { clickedOnButton(e); }}><ImCross id="AnsNo" size={30} style={{ margin: "0px auto" }} /></TokenBN>
        <TokenBC id="AnsCorrect" type="button" onClick={(e) => { clickedOnButton(e); }}><GrStar id="AnsCorrect" size={30} style={{ margin: "0px auto" }} /></TokenBC>
        <TokenBCO id="AnsClose" type="button" onClick={(e) => { clickedOnButton(e); }}><BsExclamationLg id="AnsClose" size={30} style={{ margin: "0px auto" }} /></TokenBCO>
        <TokenBW id="AnsWrong" type="button" onClick={(e) => { clickedOnButton(e); }}><MdDoDisturb id="AnsWrong" size={30} style={{ margin: "0px auto" }} /></TokenBW>
      </ButtonsDiv>

    </Container>
  );
}

export default MayorQModal;


// document.getElementById(e.target.id).style.borderBottom = '8px solid LightSkyBlue';

const Container = styled.section`
width: 220px;
height: 175px;
text-align: center;
border-radius: 50px;
background-color: #F8F8F8;
`;

const ButtonsDiv = styled.div`
margin: 0px auto;
width: fit-content;
color: white;
`;


const QuestionP = styled.p`
padding-top: 15px;
margin: 0px auto;
width: fit-content;
top: 55px;
color: black;
`;


const TokenBY = styled.button`
width: 45px;
height: 45px;
border-radius: 45px;
background-color: #3C8F45;
margin: 10px;
`;

const TokenBM = styled.button`
width: 45px;
height: 45px;
background-color: #3A5DB6;
border-radius: 45px;
margin: 10px;
`;

const TokenBN = styled.button`
width: 45px;
height: 45px;
background-color: #BB1F1F;
border-radius: 45px;
margin: 10px;
`;


const TokenBC = styled.button`
width: 45px;
height: 45px;
background-color: #F1CB00;
border-radius: 45px;
margin: 10px;
`;

const TokenBCO = styled.button`
width: 45px;
height: 45px;
background-color: #C3E600;
border-radius: 45px;
margin: 10px;
`;

const TokenBW = styled.button`
width: 45px;
height: 45px;
background-color: #714124;
border-radius: 45px;
margin: 10px;
`;

// {lobby.players[loginData.name].mayor === true && <MayorQModal />}
