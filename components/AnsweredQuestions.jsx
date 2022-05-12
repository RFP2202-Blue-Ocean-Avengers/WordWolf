// import ReactScrollableFeed from 'react-scrollable-feed';
import {
  Box, List, ListIcon, ListItem,
} from '@chakra-ui/react';
import YesIcon from '../assets/Yes.svg';
import NoIcon from '../assets/No.svg';
import CloseIcon from '../assets/Close.svg';
import CorrectIcon from '../assets/Correct.svg';
import FarOffIcon from '../assets/FarOff.svg';
import SoCloseIcon from '../assets/SoClose.svg';

function AnsweredQuestions({ lobby }) {
  const icons = {
    yes: <ListIcon as={YesIcon} color="green.500" />,
    no: <ListIcon as={NoIcon} color="red.500" />,
    maybe: <ListIcon as={CloseIcon} color="blue.500" />,
    wayOff: <ListIcon as={FarOffIcon} color="orange.500" />,
    correct: <ListIcon as={CorrectIcon} color="yellow.500" />,
    soClose: <ListIcon as={SoCloseIcon} color="green.200" />,
  };

  return (
    <Box overflow="scroll">
      <List spacing={3}>
        {lobby.answeredQuestions
          .map((question) => (
            <ListItem key={question.id}>
              {icons[question.answer]}
              {question.message}
            </ListItem>
          ))}
      </List>
    </Box>
  );
}

export default AnsweredQuestions;
