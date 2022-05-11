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

import io from 'socket.io-client';
import { useState, useEffect, useContext } from 'react';
import { Button, Input, UnorderedList, ListItem } from '@chakra-ui/react';
import styled from 'styled-components';

import { socket } from '../pages/api/service/socket';



function WerewolfVote({ lobby }) {

  const [currVote, setCurrVote] = useState(undefined);


  const clickedOnButton = (e) => {
    socket.emit('VoteSeer', { name: currVote });
  };


  return (
    <Container id="WerewolfVote">
      <WhoIsP>WHO IS THE SEER?</WhoIsP>

      <div>
        <ChooseS id="PlayersDrop" name="players">
          <option value="DEFAULT" disabled>---</option>
          {/* {players.map((p) =>
            <option value={p.username}>{p.username}</option>)} */}
        </ChooseS>
      </div>

      <div>
        <button id="Submit" type="button" onClick={(e) => { clickedOnButton(e); }}>SUBMIT</button>
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