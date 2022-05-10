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
*/

import io from 'socket.io-client';
import { useState, useEffect, useContext } from 'react';
import { Button, Input, UnorderedList, ListItem } from '@chakra-ui/react';



function MayorQModal(props) {

  const [currQuestion, setCurrQuestion] = useState(undefined);


  const clickedOnButton = (e) => {
    // will handle the click types here through e.target.id
  };


  return (
    <section id="MayorQModal">

      <div id="CurrQuestion">
        {currQuestion ? `Q: ${currQuestion}` : `Q: ---`}
      </div>

      <div id="QuestionButtons">
        <button id="AnsYes" type="button" onClick={(e) => { clickedOnButton(e); }}>Yes</button>
        <button id="AnsMaybe" type="button" onClick={(e) => { clickedOnButton(e); }}>No</button>
        <button id="AnsNo" type="button" onClick={(e) => { clickedOnButton(e); }}>Maybe</button>
        <button id="AnsCorrect" type="button" onClick={(e) => { clickedOnButton(e); }}>Close</button>
        <button id="AnsClose" type="button" onClick={(e) => { clickedOnButton(e); }}>Correct</button>
        <button id="AnsWrong" type="button" onClick={(e) => { clickedOnButton(e); }}>Wrong</button>
      </div>

    </section>
  );
}

export default MayorQModal;


// document.getElementById(e.target.id).style.borderBottom = '8px solid LightSkyBlue';
