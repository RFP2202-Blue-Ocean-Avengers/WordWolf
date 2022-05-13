/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/*
RFP2202-Blue-Ocean-Avengers BOA
Amy Kwak, Andy Chan, Anny Wang, Bogdan Gordin, Casey Eads, Danny Wong, Eunice Kim
5/8/22
Blue Ocean
modal for the villager, mayor and seer roles to vote on the werewolf if the word has been gussed
the vote is selected with a table select
needs the lobby
the key={`key-${p}`} inside of the <option> is so to remove the warning errors in the chrome dev log
*/

import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalBody,
  Box,
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import styled from 'styled-components';
import { socket } from '../pages/api/service/socket';
import { StoreContext } from '../pages/api/contextStore';


function VillagerVote({ lobby, loginData }) {
  const [currVote, setCurrVote] = useState('---');
  const { voted, setVoted } = useContext(StoreContext);

  const clickedOnButton = (e) => {
    e.preventDefault();
    if (currVote === '---') {
      return;
    }
    socket.emit('VoteWerewolf', { player: lobby?.players[currVote], lobbyName: lobby?.name });
    setVoted(true);
  };

  const pickedDrop = (e) => {
    setCurrVote(e.target.value);
  };

  return (
    <Modal isOpen={lobby?.gameState === 'outOfTokens' || lobby?.gameState === 'outOfTime'}>
      <ModalOverlay />
      <ModalContent display="flex" justifyContent="center" alignItems="center" textAlign="center">
        <ModalHeader>
          {lobby?.players[loginData.name].role !== 'werewolf'
            ? <h1>WHO IS THE WOLF?</h1> : <h1>VOTING ROUND</h1>}
        </ModalHeader>
        <ModalBody>
          {lobby?.players[loginData.name].role !== 'werewolf'
            ? (
              <Box display="flex" flexDirection="column">
                <ChooseW id="PlayersDrop" name="players" onChange={(e) => { pickedDrop(e); }}>
                  <option value="DEFAULT" selected disabled>---</option>
                  {lobby && Object.keys(lobby?.players)
                    .map((p) => ((loginData.name !== p) && (lobby.players[p].spectator === false))
                      && <option value={p}>{p}</option>)}
                </ChooseW>
                {voted ? null : <Box as="button" marginTop="10" backgroundColor="#C4C4C4" id="Submit" type="button" onClick={(e) => { clickedOnButton(e); }}>SUBMIT</Box>}
              </Box>
            ) : <h3>The villagers are currently voting...</h3>}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default VillagerVote;

const ChooseW = styled.select`
  text-align: center;
`;
