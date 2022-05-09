/*
RFP2202-Blue-Ocean-Avengers BOA
Amy Kwak, Andy Chan, Anny Wang, Bogdan Gordin, Casey Eads, Danny Wong, Eunice Kim
5/8/22
Blue Ocean
this is the modal for the werewolf and any other special role to vote on the seer if the time has ran out
*/

import io from 'socket.io-client';
import { useState, useEffect, useContext } from 'react';
import { Button, Input, UnorderedList, ListItem } from '@chakra-ui/react';



function WerewolfVote(props) {

  const [currVote, setCurrVote] = useState(undefined);


  const clickedOnButton = (e) => {
    // will handle the click types here through e.target.id
  }


  return (
    <section id='WerewolfVote'>
      <p>WHO IS THE SEER?</p>

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

export default WerewolfVote;


// document.getElementById(e.target.id).style.borderBottom = '8px solid LightSkyBlue';
