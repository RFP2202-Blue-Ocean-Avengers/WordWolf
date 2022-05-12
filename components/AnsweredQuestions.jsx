// import ReactScrollableFeed from 'react-scrollable-feed';
import {
  Box, List, ListIcon, ListItem,
} from '@chakra-ui/react';
import { BiCheck, BiQuestionMark } from 'react-icons/bi';
import { ImCross } from 'react-icons/im';
import { GrStar } from 'react-icons/gr';
import { BsExclamationLg } from 'react-icons/bs';
import { MdDoDisturb } from 'react-icons/md';

function AnsweredQuestions({ lobby }) {
  const icons = {
    yes: <ListIcon as={BiCheck} color="green.500" />,
    no: <ListIcon as={ImCross} color="red.500" />,
    maybe: <ListIcon as={BiQuestionMark} color="blue.500" />,
    wayOff: <ListIcon as={MdDoDisturb} color="orange.500" />,
    correct: <ListIcon as={GrStar} color="yellow.500" />,
    soClose: <ListIcon as={BsExclamationLg} color="green.200" />,
  };

  return (
    <Box>
      <List spacing={1} width="250px" style={{ 'background-color': 'white', height: '300px', overflow: 'scroll' }}>
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
