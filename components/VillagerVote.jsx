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

import io from 'socket.io-client';
import { useState, useEffect, useContext } from 'react';
import { Button, Input, UnorderedList, ListItem } from '@chakra-ui/react';
import styled from 'styled-components';

import { socket } from '../pages/api/service/socket';



function VillagerVote({ lobby }) {

  const [currVote, setCurrVote] = useState(undefined);


  const clickedOnButton = (e) => {
    socket.emit('VoteWerewolf', { name: currVote });
  };


  return (
    <Container id="VillagerVote">
      <WhoIsP>WHO IS THE WEREWOLF?</WhoIsP>

      <div>
        <ChooseW id="PlayersDrop" name="players">
          <option value="DEFAULT" disabled>---</option>
          {/* {players.map((p) =>
            <option value={p.username}>{p.username}</option>)} */}
        </ChooseW>
      </div>

      <div>
        <button id="Submit" type="button" onClick={(e) => { clickedOnButton(e); }}>SUBMIT</button>
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