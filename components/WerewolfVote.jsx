/* eslint-disable no-multiple-empty-lines */
/* eslint-disable padded-blocks */
/*
RFP2202-Blue-Ocean-Avengers BOA
Amy Kwak, Andy Chan, Anny Wang, Bogdan Gordin, Casey Eads, Danny Wong, Eunice Kim
5/8/22
Blue Ocean
modal for the werewolf and any other special role to vote on the seer if the time has ran out
the choice for vote is done with the table select
*/

import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { socket } from '../pages/api/service/socket';



function WerewolfVote({ lobby, loginData }) {

  const [currVote, setCurrVote] = useState('---');

  const clickedOnButton = (e) => {
    if (currVote === '---') {
      return null;
    }
    socket.emit('VoteSeer', { player: lobby.players[currVote], lobbyName: lobby?.name });
    document.getElementById(e.target.id).style.display = 'none'; // might not re-appear with new game???
  };

  const pickedDrop = (e) => {
    setCurrVote(e.target.value);
  };

  console.log(lobby);

  return (
    <Container id="WerewolfVote">
      <WhoIsP>WHO IS THE SEER?</WhoIsP>

      <div>
        <ChooseS id="PlayersDrop" name="players" onChange={(e) => { pickedDrop(e); }}>
          <option value="DEFAULT" selected disabled>---</option>
          {Object.keys(lobby.players).map((p) =>
            loginData.name !== p && <option value={p}>{p}</option>)}
        </ChooseS>
      </div>

      <div>
        <button id="SubmitWeVote" type="button" onClick={(e) => { clickedOnButton(e); }}>SUBMIT</button>
      </div>

    </Container>
  );
}

export default WerewolfVote;


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

const ChooseS = styled.select`
background-color: #E0E0E0;
`;