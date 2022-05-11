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

function Settings({ updateTimer, lobby }) {
  const { isOpen: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();
  const [settings, setSettings] = useState({ minutes: 7 });

  const handleChange = (e) => {
    const { value } = e.target;
    setSettings({ ...settings, [e.target.name]: value });
    updateTimer({ minutes: settings.minutes }, lobby);
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
                {' '}
                {' '}
                <input type="number" placeholder="00" name="minutes" style={{ width: '40px' }} value={settings.minutes} onChange={handleChange} />
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
