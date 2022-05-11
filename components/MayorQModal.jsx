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
i needed to too id twice to both the button and the react icon cause during the clicking
the event reader would read either the id from button or the id from react icon
needs the lobby object's questions array
also to visually function some questions are already needed inside of the lobby.lobby.questions
*/

import { useState } from 'react';
import styled from 'styled-components';

import { BiCheck, BiQuestionMark } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { GrStar } from 'react-icons/gr';
import { BsExclamationLg } from 'react-icons/bs';
import { MdDoDisturb } from 'react-icons/md';

import { socket } from '../pages/api/service/socket';


function MayorQModal({ lobby }) {

  const [currQuestion, setCurrQuestion] = useState(lobby?.questions[0] || '---');

  const clickedOnButton = (e) => {
    if (currQuestion === '---' || currQuestion === undefined) {
      return null;
    }

    if (e.target.id) {
      // the gosh dangit react icon's <path> thingy has passed the id
      // instead of the <button> or the icon's <svg> id
      socket.emit('AnsweredQuestion', { answer: e.target.id, question: currQuestion, lobbyName: lobby?.name });
      lobby?.questions.shift();
    } else {
      return null;
    }

    setCurrQuestion(lobby?.questions[0] || '---');
  };


  return (
    <Container id="MayorQModal">

      <QuestionP id="CurrQuestion">
        Q:
        {' '}
        {currQuestion.message || '---'}
      </QuestionP>

      <ButtonsDiv id="QuestionButtons">
        <TokenBY id="yes" type="button" onClick={(e) => { clickedOnButton(e); }}><BiCheck id="yes" size={30} style={{ margin: '0px auto' }} /></TokenBY>
        <TokenBM id="maybe" type="button" onClick={(e) => { clickedOnButton(e); }}><BiQuestionMark id="maybe" size={30} style={{ margin: '0px auto' }} /></TokenBM>
        <TokenBN id="no" type="button" onClick={(e) => { clickedOnButton(e); }}><ImCross id="no" size={30} style={{ margin: '0px auto' }} /></TokenBN>
        <TokenBC id="correct" type="button" onClick={(e) => { clickedOnButton(e); }}><GrStar id="correct" size={30} style={{ margin: '0px auto' }} /></TokenBC>
        <TokenBCO id="soClone" type="button" onClick={(e) => { clickedOnButton(e); }}><BsExclamationLg id="soClone" size={30} style={{ margin: '0px auto' }} /></TokenBCO>
        <TokenBW id="wayOff" type="button" onClick={(e) => { clickedOnButton(e); }}><MdDoDisturb id="wayOff" size={30} style={{ margin: '0px auto' }} /></TokenBW>
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

// [{
//   id: '98g9d-54gfd83-dsfds',
//   name: 'Bogdan',
//   lobby: 'lobby1',
//   message: 'is it an animal?',
//   question: true
// },
// {
//   id: '0gnd-54tr2r-ds9g91s',
//   name: 'Bogdan',
//   lobby: 'lobby1',
//   message: 'is it a cat?',
//   question: true
// },
// {
//   id: '98g21j-543283-9g9dfds',
//   name: 'bogdan2',
//   lobby: 'lobby1',
//   message: 'is it a dog?',
//   question: true
// }]

// import MayorQModal from './MayorQModal';
// import VillagerVote from './VillagerVote';
// import WerewolfVote from './WerewolfVote';


// <MayorQModal lobby={lobby}/>
//       <VillagerVote lobby={lobby}/>
//       <WerewolfVote lobby={lobby}/>
