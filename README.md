# WordWolf #

## Technologies ##

**- Front-end:** &emsp;&nbsp;&nbsp;
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
  ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)

**- Back-end:** &emsp;&nbsp; &nbsp;
  ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
  
**- Design:** &emsp;&emsp; &nbsp; &nbsp;
  ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

**- Deployment:** &nbsp; &nbsp;
  ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
  
## Overview ##

&emsp; WordWolf is a multiplayer browser game formatted after Werewords. It allows up to 10 players/spectators and a minimum of four players to start. A player can be assigned one of 3 roles - Wolf, Seer, or Villager. One player will also be assigned the role of Mayor. A word is chosen and the players have to attempt to guess the word by only asking "yes" or "no" questions before the time or their tokens run out. But *watch out, not everyone's on your side...* There's a wolf or two in the mix that know the word and are trying to lead you in the wrong direction. Luckily you have your seer(s) in your corner to helpg et you back on track! Watchout wolves, make yourself to obvious and even if the players don't guess the word they can still win by finding out who you are. Seers don't be too helpful, if the word is guessed the wolves still have an opputunity to win if they discover your true identity.

**The four roles:**

  **Mayor**
    - Chooses the word to start
    - Answers whether or not the questions are true
    - Always has another role
    
  **Wolf**
    - Knows the word
    - Tries to keep players from guessing the correct word
    - Can guess who the seers are
    
   **Seer**
     - Knows the word
     - Tries to get the players to guess the correct word
     - Can throw a winning game if the wolves find out who they are
  
  **Villager**
    - Cannot see the word
    - Ask questions to get closer to discovery
    - Votes at the end who they think the wolf is
###

## Game Play ##

### Login ###

- Allows player to join of create a lobby
- Can't joing lobbies not createdd
- Can't create duplicate lobbies
- Confirms unique username for lobby being joined
- How to play modal allows access rules, tips, and roles
- Uses Socket.io and object oriented programming to support multiple games/lobbies 

## Lobby ##

- Utilizes Socket.io to serve a unified game state w/low latency
- Differentiates between host and other players
- Only host can start game and change settings
- Can choose up to 4 starting words to choose from
- Can set game duration 1-30 minutes
- Allows up to 10 players or spectators
- Players can choose color/placement on table or spectate
- Requires a minimum of 4 players to begin a game
- Chat dynamically reflects player colors
- Chat lets newly joined users see prior chats
- Chat has auto-scroll
- Access to how to play modal

## Game Table ##

- Real time game progression/state
- Allows players to check the questions/tokens for each player with interactive feature of the token modal
- Renders players tokens dynamically for indivuals and the group
- Renders proper view and modals based on game state and player role assigned
- Real time rendering of # of tokens remaining (maybe/ yes or no)
- Ensures proper connectivity of all components for seamless game play
- Individual player roles reflected by player card
- Universal mayor roll display
- Timer displays amount of time left - changes red in last 10s
- Access to how to play modal
- Only table players can chat
- All table players except mayor can ask questions

```npm install```

```npm run dev```

go wild

# Instructions for development

---

## Working on your branch

The [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) assumes *one central repository* and the `main` branch represents the official project history.

Instead of committing directly to your local `main` branch, create a **new** branch to work on a **particular feature**. Feature branches should have *descriptive names* (e.g., "animated-menu-items").

Feature branches can (and *should*) be pushed to the central repository (on GitHub). The only *special* branch is `main`. **Don't ever push anything to** `main`! The following is a brief overview of how to do your work:

### 1. Start with the main branch

All feature branches are created off the latest code state of a project. Assume that the `main` branch on GitHub is always up-to-date. First, check out the `main` branch on your machine, pull the latest updates, and reset the repo's local copy of `main` to match the latest version:
```
git checkout main
git fetch origin
git reset --hard origin/main
```

### 2. Create a new feature branch

Use a **separate branch for each feature/issue you work on**. You can create a branch and check it out in one command as follows:
```
git checkout -b new-branch-name
```

### 3. Update, add, and commit changes

**On your feature branch**, you can edit, stage, and commit changes as usual.
```
git status
git add some_file
git commit -m "Some descriptive message--better messages help when we need to undo changes"
```

### 4. Push feature branch to remote (GitHub)

When ready, push your commits, updating the feature branch on GitHub. It's a good idea to push the feature branch up to the central repository so we can see what you're doing. To push `new-branch-name` to the central repository (GitHub), issue:
```
git push -u origin new-branch-name
```

**NOTE**: The `-u` flag adds the local branch you created in step 2 as a remote tracking branch. After setting up the tracking branch, `git push` can be invoked without any parameters to automatically push the `new-branch-name` branch to the central repo (GitHub).

### 5. Done implementing the feature? Create a pull request!

When you've finished implementing and testing the feature your branch was created to work on, create a pull request through GitHub.

## Running your code

1. Make sure you're working on the correct branch!

2. Create a .env file and enter in the correct information

3. Run `npm run dev` to start.

4. Navigate to `localhost:3001` in your browser.
