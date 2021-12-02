import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ChakraProvider,
  Alert,
  AlertIcon,
  Stack,
  Input,
  Container,
  Divider,
  Text,
  Button,
  Link,
} from '@chakra-ui/react';

const Options = () => {
  const [doneStatusName, setDoneStatusName] = useState<string>('Done');
  const [iterationNumber, setIterationNumber] = useState<number>(0);
  const [totalPoint, setTotalPoint] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    chrome.storage.local.get().then((data) => {
      if (data.doneStatusName) setDoneStatusName(data.doneStatusName);
      if (data.iterationNumber) setIterationNumber(data.iterationNumber);
      if (data.totalPoint) setTotalPoint(data.totalPoint);
    });
  }, []);

  const save = () => {
    chrome.storage.local
      .set({
        doneStatusName,
        iterationNumber,
        totalPoint,
      })
      .then(() => setMessage('Saved in local storage!'));
  };

  const clear = () => {
    chrome.storage.local
      .remove(['doneStatusName', 'iterationNumber', 'totalPoint'])
      .then(() => {
        setMessage('Cleared local storage values!');
        setDoneStatusName('Done');
        setIterationNumber(0);
        setTotalPoint(0);
      });
  };

  return (
    <Container p={4} w={500}>
      <Stack>
        <Text fontSize="xl">Settings</Text>
        <Divider />
        {!!message && (
          <Alert status="success" variant="subtle" height="30px" p={2}>
            <AlertIcon />
            {message}
          </Alert>
        )}
        <label htmlFor="done-status-name">Done Status Name</label>
        <Input
          id="done-status-name"
          type="text"
          value={doneStatusName}
          onChange={(event) => setDoneStatusName(event.target.value)}
          size="xs"
        />
        <label htmlFor="iteration-number">Iteration Number</label>
        <Input
          id="iteration-number"
          type="number"
          value={iterationNumber}
          onChange={(event) => setIterationNumber(Number(event.target.value))}
          size="xs"
        />
        <label htmlFor="total-point">Total Point</label>
        <Input
          id="total-point"
          type="number"
          value={totalPoint}
          onChange={(event) => setTotalPoint(Number(event.target.value))}
          size="xs"
        />
      </Stack>
      <Stack direction="row" align="center" pt={4}>
        <Button onClick={save} size="xs" colorScheme="teal" width="80px">
          Save
        </Button>
        <Button onClick={clear} size="xs" colorScheme="teal" width="80px">
          Clear
        </Button>
        <Link color="teal.500" href={chrome.runtime.getURL('popup.html')}>
          Information
        </Link>
      </Stack>
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Options />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
