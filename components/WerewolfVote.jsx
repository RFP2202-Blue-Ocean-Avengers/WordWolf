/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/*
RFP2202-Blue-Ocean-Avengers BOA
Amy Kwak, Andy Chan, Anny Wang, Bogdan Gordin, Casey Eads, Danny Wong, Eunice Kim
5/8/22
Blue Ocean
modal for the werewolf and any other special role to vote on the seer if the time has ran out
the choice for vote is done with the table select
the key={`key-${p}`} inside of the <option> is so to remove the warning errors in the chrome dev log
*/
import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  Box,
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import { socket } from '../pages/api/service/socket';
import { StoreContext } from '../pages/api/contextStore';


function WerewolfVote({ lobby, loginData }) {
  const [currVote, setCurrVote] = useState('---');
  const { voted, setVoted } = useContext(StoreContext);

  const clickedOnButton = (e) => {
    e.preventDefault();
    if (currVote === '---') {
      return;
    }
    socket.emit('VoteSeer', { player: lobby.players[currVote], lobbyName: lobby?.name });
    setVoted(true);
  };

  const pickedDrop = (e) => {
    setCurrVote(e.target.value);
  };

  return (
    <Modal isOpen={lobby.gameState === 'wordGuessed'}>
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center" textAlign="center">
        <ModalHeader>
          {lobby?.players[loginData.name].role !== 'werewolf'
            ? <h1>VOTING ROUND</h1> : <h1>WHO IS THE SEER?</h1>}
        </ModalHeader>
        <ModalBody>
          {lobby?.players[loginData.name].role !== 'werewolf'
            ? (
              <h3>The wolves are currently voting...</h3>
            )
            : (
              <Box display="flex" flexDirection="column">
                <ChooseS id="PlayersDrop" name="players" onChange={(e) => { pickedDrop(e); }}>
                  <option value="DEFAULT" selected disabled>---</option>
                  {lobby && Object.keys(lobby?.players)
                    .map((p) => loginData.name !== p && <option value={p}>{p}</option>)}
                </ChooseS>
                {voted ? null : <Box as="button" backgroundColor="#C4C4C4" marginTop="10" id="SubmitWeVote" onClick={(e) => { clickedOnButton(e); }}>SUBMIT</Box>}
              </Box>
            )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WerewolfVote;


// document.getElementById(e.target.id).style.borderBottom = '8px solid LightSkyBlue';

const ChooseS = styled.select`
`;
