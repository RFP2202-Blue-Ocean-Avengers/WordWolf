&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; [![alt text](wereWordsTitle.png)](http://www.wordwolf.xyz/)

## Technologies ## 

**Front-end:** &emsp;&nbsp;&nbsp;
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)

**Back-end:** &emsp;&nbsp; &nbsp;
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
  
**Design:** &emsp;&emsp; &nbsp; &nbsp;
  ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

**Deployment:** &nbsp;&nbsp;
  ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

&emsp;
  
## Overview ##

WordWolf is a multiplayer browser game formatted after Werewords. It allows up to 10 players/spectators and a minimum of four players to start. A player can be assigned one of 3 roles - Wolf, Seer, or Villager. One player will also be assigned the role of Mayor. A word is chosen and the players have to attempt to guess the word by only asking "yes" or "no" questions before the time or their tokens run out. But *watch out, not everyone's on your side...* There's a wolf or two in the mix that know the word and are trying to lead you in the wrong direction. Luckily you have your seer(s) in your corner to help get you back on track! Watchout wolves, make yourself too obvious and, even if the players don't guess the word, they can still win by finding out who you are. Seers don't be too helpful, if the word is guessed, the wolves still have an opputunity to win if they discover your true identity.

&emsp;

## Roles ##

|**Mayor**                      |**Wolf**                        |**Seer**                               |**Villager**                    |
|-------------------------------|--------------------------------|---------------------------------------|--------------------------------|
|1 player                       |1-2 players                     |1-2 players                            |2-6 players                     |
|Always has another role        |Knows the word                  |Knows the word                         |Cannot see the word             |
|Choose/know word to start      |Can guess who the seers are     |Directs players to correct word        |Asks narrowing questions        |     
|Answers questions appropriately|Steers players from correct word|Winning game becomes lost if discovered|Votes who they think the wolf is|

&emsp;

### [Play Here](http://www.wordwolf.xyz/) ###
---
## Features ##

### Login ###

&emsp;  &emsp;  &emsp; &emsp; &emsp;  &emsp; &emsp; ![alt text](join.gif)

&emsp;

<table>
 <tr>
    <td>Allows player to join or create a lobby</td>
    <td>Can't join lobbies not yet created</td>
 </tr>
 <tr>
    <td>Can't create duplicate lobbies</td>
    <td>Confirms unique username for lobby being joined</td>
 </tr>
   <tr>
    <td>How to play modal allows access to rules, tips, and roles</td>
    <td>Uses Socket.io and object oriented programming to support multiple games/lobbies</td>
 </tr>
</table>

&emsp;

### Lobby ###

&emsp;  &emsp;  &emsp; &emsp; &emsp;  &emsp; &emsp; ![alt text](lobby.gif)

&emsp;

<table>
 <tr>
    <td>Utilizes Socket.io to serve a unified game state w/low latency</td>
    <td>Differentiates between host and other players</td>
 </tr>
 <tr>
    <td>Only host can start game and change settings</td>
    <td>Can choose up to 4 starting words to choose from</td>
 </tr>
   <tr>
    <td>Can set game duration between 1 and 30 minutes</td>
    <td>Allows up to 10 players or spectators</td>
 </tr>
 <tr>
    <td>Players can choose color/placement on table or spectate</td>
    <td>Requires a minimum of 4 players to begin a game</td>
 </tr>
 <tr>
    <td>Chat dynamically reflects player colors</td>
    <td>Chat lets newly joined users see prior chats</td>
 </tr>
   <tr>
    <td>Chat has auto-scroll</td>
    <td>Access to how to play modal</td>
 </tr>
</table>

&emsp;

### Game Table ###

&emsp;  &emsp;  &emsp; &emsp; &emsp;  &emsp; &emsp; ![alt text](game.gif)

&emsp;

<table>
 <tr>
    <td>Real time game progression/state</td>
    <td>Allows players to check the questions/tokens for each player with interactive token modal</td>
 </tr>
 <tr>
    <td>Renders players' tokens dynamically for individuals and the group</td>
    <td>Renders proper view and modals based on game state and player role assignment</td>
 </tr>
   <tr>
    <td>Real time rendering of amount of tokens remaining (maybe, yes, or no)</td>
    <td>Ensures proper connectivity of all components for seamless game play</td>
 </tr>
 <tr>
    <td>Individual player roles reflected by player card</td>
    <td>Universal mayor role display</td>
 </tr>
   <tr>
    <td>Mayor has access to modal for answering questions</td>
    <td>Timer displays amount of time left and changes red in the last 10s</td>
 </tr>
  <tr>
    <td>Access to how to play modal</td>
    <td>Only table players can chat</td>
 </tr>
   <tr>
    <td>All table players except mayor can ask questions</td>
    <td>Voting modal displays at end of game to all applicable players based on their role</td>
 </tr>
</table>

&emsp;

### [Play Here](http://www.wordwolf.xyz/) ###
---

## Contributers ##

Product Manager: &emsp;**Eunice Kim**
&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; UI Engineer: &emsp;**Amy Kwak**

&emsp;&emsp; [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/euniceyunjkim/) &emsp; [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/euniceyunjkim)
&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/amykwak/) &emsp; [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/amyKwak)

&emsp;

Backend Architect: &emsp;**Danny Wong**
&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp;&nbsp; Software Engineer: &emsp;**Andy Chan**

&emsp;&emsp; [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/danny96wong/) &emsp; [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/SoymilkSky)
&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/andychan727/) &emsp; [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/ChanAndy727)

&emsp;

Software Engineer: &emsp;**Annie Wang**
&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &nbsp;&nbsp; &emsp;&emsp; Software Engineer: &emsp;**Bogdan Gordin**

&emsp;&emsp; [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/hsinanwang) &emsp; [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/astrjc0326)
&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/bogdangordin/) &emsp; [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/bogdangordin)

&emsp;

Software Engineer: &emsp;**Casey Eads**

&emsp;&emsp; [![Linkedin: LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/caleb-kim0510/)](https://www.linkedin.com/in/casey-eads-1d618/) &emsp; [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white&link=https://github.com/cariboukim)](https://github.com/ceads1618)

&emsp;

## Installation ##

To run this application off your local computer, please clone this repo and perform the following:

- Make a .env file with contents PORT=3000

- Install necessary libraries

  - `npm i --production`

- Build

  - `npm run build`

- Start the server

  - `npm start`

- Go to localhost:3000 for access to WordWolf
