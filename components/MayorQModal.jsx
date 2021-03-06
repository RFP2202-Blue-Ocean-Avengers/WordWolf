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

import { useContext } from 'react';
import styled from 'styled-components';
import { Button, HStack, VStack } from '@chakra-ui/react';

import Image from 'next/image';
import YesIcon from '../assets/Yes.svg';
import NoIcon from '../assets/No.svg';
import CloseIcon from '../assets/Close.svg';
import CorrectIcon from '../assets/Correct.svg';
import FarOffIcon from '../assets/FarOff.svg';
import SoCloseIcon from '../assets/SoClose.svg';
import Exit from '../assets/Exit.svg';

import { socket } from '../pages/api/service/socket';
import { StoreContext } from '../pages/api/contextStore';


function MayorQModal({ lobby }) {
  const {
    soClose, setSoClose, wayOff, setWayOff, correct, setCorrect,
  } = useContext(StoreContext);

  const clickedOnButton = (e) => {
    if (e.target.id) {
      socket.emit('AnsweredQuestion', { answer: e.target.id, question: lobby.questions[0], lobbyName: lobby?.name });
    } else { // in case undefined gets passed to the server
      return;
    }

    if (e.target.id === 'soClose') {
      setSoClose(true);
    } else if (e.target.id === 'wayOff') {
      setWayOff(true);
    } else if (e.target.id === 'correct') {
      setCorrect(true);
    }
  };

  const clickedOnButtonDiscard = (e) => {
    socket.emit('AnsweredQuestion', { answer: e.target.id, question: lobby.questions[0], lobbyName: lobby?.name });
    console.log(e.target.id);
  };

  return (
    <Container id="MayorQModal">
      <button
        id="discard"
        type="button"
        onClick={(e) => { clickedOnButtonDiscard(e); }}
        style={{
          position: 'absolute', top: '15px', right: '40px', width: '15px', zIndex: '99',
        }}
      >
        <Image id="discard" src={Exit} />
      </button>

      <QuestionP id="CurrQuestion" style={{ marginBottom: '5px', fontSize: '24px', zIndex: '1' }}>
        {' '}
        Q:
        {' '}
        {lobby.questions[0]?.message || '---'}
      </QuestionP>

      <ButtonsDiv id="QuestionButtons">
        <VStack spacing="10px">
          <HStack spacing="10px">
            <Button id="yes" bg="#3C8F45" borderRadius="full" w="50px" h="50px" padding="3" _hover={{ bg: '#2b5e30' }} onClick={(e) => { clickedOnButton(e); }}><Image id="yes" src={YesIcon} /></Button>
            {lobby?.maybeTokens ? <Button id="maybe" bg="#3A5DB6" borderRadius="full" w="50px" h="50px" padding="3" _hover={{ bg: '#29458c' }} onClick={(e) => { clickedOnButton(e); }}><Image id="maybe" src={CloseIcon} /></Button> : null}
            <Button id="no" bg="#BB1F1F" borderRadius="full" w="50px" h="50px" padding="3" _hover={{ bg: '#851717' }} onClick={(e) => { clickedOnButton(e); }}><Image id="no" src={NoIcon} /></Button>
          </HStack>
          <HStack spacing="10px">
            {correct ? null : <Button id="correct" bg="#F1CB00" borderRadius="full" w="50px" h="50px" padding="0" _hover={{ bg: '#c5af34' }} onClick={(e) => { clickedOnButton(e); }}><Image id="correct" src={CorrectIcon} /></Button>}
            {soClose ? null : <Button id="soClose" bg="#C3E600" borderRadius="full" w="50px" h="50px" padding="1" _hover={{ bg: '#abc903' }} onClick={(e) => { clickedOnButton(e); }}><Image id="soClose" src={SoCloseIcon} /></Button>}
            {wayOff ? null : <Button id="wayOff" bg="#714124" borderRadius="full" w="50px" h="50px" padding="2" _hover={{ bg: '#56321c' }} onClick={(e) => { clickedOnButton(e); }}><Image id="wayOff" src={FarOffIcon} /></Button>}
          </HStack>
        </VStack>
      </ButtonsDiv>

    </Container>
  );
}

export default MayorQModal;

const Container = styled.section`
width: 220px;
height: auto;
text-align: center;
border-radius: 50px;
background-color: #F8F8F8;
padding-top: 15px;
padding-bottom: 15px;
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
