import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

function Settings() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showRoles, setShowRoles] = useState(false);
  const onClick = () => {
    setShowRoles(!showRoles);
  };

  return (
    <div>
      <Button size="sm" onClick={onOpen}> How To Play </Button>
      <Modal isOpen={isOpen} onClose={() => { onClose(); setShowRoles(false); }}>
        <ModalOverlay />
        <ModalContent maxW="75rem">
          <ModalHeader align="center">
            {!showRoles && <Button size="lg" variant="solid" onClick={onClick}>How To Play</Button>}
            {showRoles && <Button size="lg" variant="outline" onClick={onClick}>How To Play</Button>}
            {!showRoles && <Button size="lg" variant="outline" onClick={onClick}>Roles</Button>}
            {showRoles && <Button size="lg" variant="solid" onClick={onClick}>Roles</Button>}
          </ModalHeader>
          <ModalCloseButton onClick={() => setShowRoles(false)} />
          <ModalBody>
            {showRoles
              && (
              <div>
                <strong style={{ 'font-size': '30px' }}>Role Explanation</strong>
                <ul style={{ 'list-style-position': 'inside' }}>
                  <li>
                    <strong>Villager:</strong>
                    {' '} All villagers play on the Village team. They do not know the magic word. They do not know each other.
                  </li>
                  <li>
                    <strong>Seer:</strong>
                    {' '} The Seer plays on the village team. They know the magic word. They do not know each other. If the magic word is guessed and the werewolves guess one of the seers, the village team loses.
                  </li>
                  <li>
                    <strong>Werewolf:</strong>
                    {' '} Werewolves play on the werewolf team. They know the magic word. They also know each other. If the magic word is not guessed and the villagers guess one of the werewolves, the werewolf team loses.
                  </li>
                </ul>
              </div>
              )}

            {!showRoles
              && (
              <div>
                <strong style={{ 'font-size': '30px' }}>How To Play WordWolf</strong>
                <br />
                The original game rules are available on
                <a rel="noreferrer" target="_blank" href="https://werewords.com/rules.php?ver=3">
                  <u> the publisher site. </u>
                </a>
                <br />
                <strong> Summary: </strong>
                <p>  In WordWolf, players are asking yes/no questions to guess a magic word before the time is up. Seer and Werewolves know the magic words and are trying to help or hinder the Villagers from guessing the word by asking helpful or misleading questions while keeping their identity concealed. </p>

                <strong> Required players: </strong>
                <p>  To play wordwolf, you need at least 3 players, although we recommend playing with no less than 5 players. With an upper limit of 10 players in a game. (You can always play in multiple lobbies.)</p>

                <strong> Gameplay: </strong>
                <p>  The game starts by one player becoming the mayor or chosing a mayor at random. The mayor then choses a magic word and all players (including the mayor) are assigned a hidden role. The default roles are Villager, Seer and Werewolf with the Villagers and the Seer being on the Village team and the Werewolves being on the Werewolf team. For more advanced roles, see the Role overview. The Villagers and the Seer know nothing about other players' roles, while the Werewolves know each other. The Seer and the Werewolves know the magic word.</p>

                <p>  Once the mayor has chosen the magic word, all players ask yes/no questions about the magic word, which the mayor answers with "yes", "no", "maybe" or "so close". This continues untill either the magic word is guessed, the timer runs out or all tokens are used up.</p>

                <p>  If the magic word was guessed, a vote for the Werewolf team is started, in which they can try to guess and vote for the Seer. If they guess correctly, the Werewolf team wins. If they do not guess correctly, the Village team wins.</p>

                <p>  If the magic word was not guessed, a vote for the Village team is started, in which all players can try to guess and vote for one of the werewolves. If they guess correctly, the Village team wins. If they do not guess correctly, the Werewolf team wins.</p>

                <strong> Tips & Tricks: </strong>
                <ul style={{ 'list-style-position': 'inside' }}>
                  <li>Try to start with general questions like "Does it live?" or "Can you touch it?" narrowing down what category the word is in for everyone.</li>
                  <li>As a Villager, try to not only ask helpful questions, but also keep track of who asked what, so you have an idea on who may be a Werewolf later on.</li>
                  <li>As a Seer, try to help your team by asking helpful questions, but do not make it too obvious that you are the Seer, so the Werewolves will not vote for you later on. Since you know the magic word, you can also more easily recognize who is un-helpful, leading to a better guess on the Werewolves.</li>
                  <li>As a Werewolf, try to ask misleading questions, but do not make it too obvious that you are a Werewolf, so you do not get voted for later on. Another good set of questions are questions, where the helpful answer to the question is not technically correct. Since you know the magic word, you can also more easily recognize who is especially helpful, leading to a better guess on the Seer.</li>
                  <li>If you know the magic word because of your role, try to keep track of who asked particularly (un-)helpful, leading to a better guess at the voting at the end of the game.</li>
                  <li>Before voting, you may discuss your vote with the other players, potentially influencing their vote in your favor. </li>
                </ul>

                <strong> Special cases: </strong>
                <ul style={{ 'list-style-position': 'inside' }}>
                <li>The mayor can have any role other players can have as well. If the mayor is a Werewolf, he may lie when answering questions. If the mayor is a Seer, he may chose an easy word to guess.</li>
                <li>In a vote for the village team, all players (including the Werewolves) get to vote.</li>
                <li>The vote at the end of the game does not need to result in a majority. If any of the players with the most votes are werewolf/seer, the voting will succeed.</li>
                </ul>
              </div>
              )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => { onClose(); setShowRoles(false); }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Settings;
