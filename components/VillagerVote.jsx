/* eslint-disable padded-blocks */
/* eslint-disable no-multiple-empty-lines */
/*
RFP2202-Blue-Ocean-Avengers BOA
Amy Kwak, Andy Chan, Anny Wang, Bogdan Gordin, Casey Eads, Danny Wong, Eunice Kim
5/8/22
Blue Ocean
modal for the villager, mayor and seer roles to vote on the werewolf if the word has been gussed
the vote is selected with a table select
needs the loppy
*/

import { useState, useContext } from 'react';
import styled from 'styled-components';
import { socket } from '../pages/api/service/socket';
import { StoreContext } from '../pages/api/contextStore';


function VillagerVote({ lobby, loginData }) {
  const [currVote, setCurrVote] = useState('---');
  const { voted, setVoted } = useContext(StoreContext);

  const clickedOnButton = (e) => {
    if (currVote === '---') {
      return null;
    }
    socket.emit('VoteWerewolf', { player: lobby.players[currVote], lobbyName: lobby?.name });
    setVoted(true);
  };

  const pickedDrop = (e) => {
    setCurrVote(e.target.value);
  };

  return (
    <Container id="VillagerVote">
      <WhoIsP>WHO IS THE WEREWOLF?</WhoIsP>

      <div>
        <ChooseW id="PlayersDrop" name="players" onChange={(e) => { pickedDrop(e); }}>
          <option value="DEFAULT" selected disabled>---</option>
          {lobby && Object.keys(lobby.players)
            .map((p) => loginData.name !== p && <option value={p}>{p}</option>)}
        </ChooseW>
      </div>

      <div>
        {voted ? null : <button id="Submit" type="button" onClick={(e) => { clickedOnButton(e); }}>SUBMIT</button> }
      </div>

    </Container>
  );
}

export default VillagerVote;

// document.getElementById(e.target.id).style.borderBottom = '8px solid LightSkyBlue';

const Container = styled.section`
width: 220px;
height: 105px;
text-align: center;
border-radius: 50px;
background-color: #F8F8F8;
`;

const WhoIsP = styled.p`
padding-top: 15px;
margin: 0px auto;
width: fit-content;
color: black;
`;

const ChooseW = styled.select`
background-color: #E0E0E0;
`;
