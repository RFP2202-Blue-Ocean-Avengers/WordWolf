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

import { useState, useContext } from 'react';
import styled from 'styled-components';
import { Button, HStack, VStack } from '@chakra-ui/react';

import { BiCheck, BiQuestionMark } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { GrStar } from 'react-icons/gr';
import { BsExclamationLg } from 'react-icons/bs';
import { MdDoDisturb } from 'react-icons/md';
import Image from 'next/image';
import YesIcon from '../assets/Yes.svg';
import NoIcon from '../assets/No.svg';
import CloseIcon from '../assets/Close.svg';
import CorrectIcon from '../assets/Correct.svg';
import FarOffIcon from '../assets/FarOff.svg';
import SoCloseIcon from '../assets/SoClose.svg';

import { socket } from '../pages/api/service/socket';
import { StoreContext } from '../pages/api/contextStore';


function MayorQModal({ lobby }) {
  const [currQuestion, setCurrQuestion] = useState(lobby?.questions[0] || '---');
  const {
    soClose, setSoClose, wayOff, setWayOff, correct, setCorrect,
  } = useContext(StoreContext);

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

    if (e.target.id === 'soClose') {
      setSoClose(true);
      // document.getElementById(e.target.id).style.display = 'none';
      // might not re-appear with new game???
    } else if (e.target.id === 'wayOff') {
      setWayOff(true);
      // document.getElementById(e.target.id).style.display = 'none';
      // might not re-appear with new game???
    } else if (e.target.id === 'correct') {
      setCorrect(true);
      // document.getElementById(e.target.id).style.display = 'none';
      // might not re-appear with new game???
    }

    setCurrQuestion(lobby?.questions[0] || '---');
  };

  return (
    <Container id="MayorQModal">

      <QuestionP id="CurrQuestion" style={{ marginBottom: '5px' }}>
        Q:
        {' '}
        {currQuestion.message || '---'}
      </QuestionP>
      <ButtonsDiv id="QuestionButtons">
        <VStack spacing="10px">
          <HStack spacing="10px">
            <Button id="yes" bg="#3C8F45" borderRadius="full" w="50px" h="50px" padding="3" _hover={{ bg: '#2b5e30' }} onClick={(e) => { clickedOnButton(e); }}><Image src={YesIcon} h={30} /></Button>
            <Button id="maybe" bg="#3A5DB6" borderRadius="full" w="50px" h="50px" padding="3" _hover={{ bg: '#29458c' }} onClick={(e) => { clickedOnButton(e); }}><Image src={CloseIcon} h={30} /></Button>
            <Button id="no" bg="#BB1F1F" borderRadius="full" w="50px" h="50px" padding="3" _hover={{ bg: '#851717' }} onClick={(e) => { clickedOnButton(e); }}><Image src={NoIcon} h={30} /></Button>
          </HStack>
          <HStack spacing="10px">
            <Button id="correct" bg="#F1CB00" borderRadius="full" w="50px" h="50px" padding="0" _hover={{ bg: '#c5af34' }} onClick={(e) => { clickedOnButton(e); }}><Image src={CorrectIcon} h={30} /></Button>
            <Button id="soClose" bg="#C3E600" borderRadius="full" w="50px" h="50px" padding="1" _hover={{ bg: '#abc903' }} onClick={(e) => { clickedOnButton(e); }}><Image src={SoCloseIcon} h={30} /></Button>
            <Button id="wayOff" bg="#714124" borderRadius="full" w="50px" h="50px" padding="2" _hover={{ bg: '#56321c' }} onClick={(e) => { clickedOnButton(e); }}><Image src={FarOffIcon} h={30} /></Button>
          </HStack>
        </VStack>
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
