/*
RFP2202-Blue-Ocean-Avengers BOA
Amy Kwak, Andy Chan, Anny Wang, Bogdan Gordin, Casey Eads, Danny Wong, Eunice Kim
5/8/22
Blue Ocean
this is the modal for the villager, mayor and seer roles to vote on the werewolf if the word has been gussed
*/

import io from 'socket.io-client';
import { useState, useEffect, useContext } from 'react';
import { Button, Input, UnorderedList, ListItem } from '@chakra-ui/react';



function VillagerVote(props) {

  const [currVote, setCurrVote] = useState(undefined);


  const clickedOnButton = (e) => {
    // will handle the click here setCurrVote
  }


  return (
    <section id='VillagerVote'>
      <p>WHO IS THE WEREWOLF?</p>

      <div>
        <select id="PlayersDrop" name="players">
          <option value="" disabled selected>-</option>
          {/* {players.map((p) =>
            <option value={p.username}>{p.username}</option>)} */}
        </select>

        <button id='Submit' onClick={(e) => { clickedOnButton(e); }}>SUBMIT</button>

      </div>

    </section>
  );
}

export default VillagerVote;


// document.getElementById(e.target.id).style.borderBottom = '8px solid LightSkyBlue';
