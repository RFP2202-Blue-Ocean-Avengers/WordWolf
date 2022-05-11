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
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

import { useState, useEffect } from 'react';

function Settings({ updateTimer, lobby }) {
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();
  const [minuteValue, setMinuteValue] = useState(lobby.settings.minutes < 6
    ? 5 : lobby.settings.minutes);

  useEffect(() => {
    updateTimer({ minutes: minuteValue, seconds: 0 }, lobby);
  }, [minuteValue]);

  const handleChange = (value) => {
    // const { value } = e.target;
    setMinuteValue(value);
  };

  return (
    <div>
      <Button size="sm" onClick={onSettingsOpen}> Settings </Button>
      <Modal isOpen={isSettingsOpen} onClose={onSettingsClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Timers:
            <br />
            <ul>
              <li>
                Game time (min)
                <NumberInput
                  defaultValue={7}
                  min={5}
                  max={30}
                  value={minuteValue}
                  onChange={handleChange}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {/* <input type="number" placeholder="00"  style={{ width: '40px' }}  /> */}
              </li>
            </ul>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSettingsClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <br />
    </div>
  );
}

export default Settings;
