import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  ChakraProvider,
  Button,
  Container,
  Divider,
  Text,
  Link,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Stack,
} from '@chakra-ui/react';

const Popup = () => {
  const [inProgress, setInProgress] = useState<boolean>(false);
  const [doneStatusName, setDoneStatusName] = useState<string>('Done');
  const [iterationNumber, setIterationNumber] = useState<number>(0);
  const [prevDonePoint, setPrevDonePoint] = useState<number>(0);
  const [currentDonePoint, setCurrentDonePoint] = useState<number>(0);
  const [totalPoint, setTotalPoint] = useState<number>(0);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.storage.local.get().then((data) => {
        if (data?.doneStatusName) setDoneStatusName(data.doneStatusName);
        if (data?.iterationNumber) setIterationNumber(data.iterationNumber);
        if (data?.prevDonePoint) setPrevDonePoint(data.prevDonePoint);
        if (data?.totalPoint) setTotalPoint(data.totalPoint);
        setInProgress(!!data?.inProgress);
      });
      const tab = tabs[0];
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, { doneStatusName }, (data) => {
          setCurrentDonePoint(Number(data));
        });
      }
    });
  }, []);

  const start = () => {
    setInProgress(true);
    setIterationNumber(iterationNumber + 1);
    chrome.storage.local
      .set({
        inProgress: true,
        iterationNumber: iterationNumber + 1,
        prevDonePoint: currentDonePoint,
      })
      .then(() => console.log('Started!'));
  };

  const finished = () => {
    setInProgress(false);
    const tmpTotalPoint = totalPoint + currentDonePoint - prevDonePoint;
    setTotalPoint(tmpTotalPoint);
    chrome.storage.local
      .set({
        inProgress: false,
        totalPoint: tmpTotalPoint,
        prevDonePoint: 0,
      })
      .then(() => console.log('Finished!'));
  };

  return (
    <Container p={4} w={500}>
      <Text fontSize="xl">Story Point Information</Text>
      <Divider />
      <StatGroup pt={2}>
        <Stat>
          <StatLabel>Iteration</StatLabel>
          <StatNumber>{iterationNumber}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Total Point</StatLabel>
          <StatNumber>{totalPoint}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Velocity</StatLabel>
          <StatNumber>
            {0 < iterationNumber
              ? Math.floor(totalPoint / iterationNumber)
              : '-'}
          </StatNumber>
        </Stat>
      </StatGroup>
      <Stack direction="row" align="center" pt={4}>
        <Button
          onClick={start}
          disabled={inProgress}
          size="xs"
          colorScheme="teal"
          width="80px"
        >
          Start
        </Button>
        <Button
          onClick={finished}
          disabled={!inProgress}
          size="xs"
          colorScheme="teal"
          width="80px"
        >
          Finished
        </Button>
        <Link color="teal.500" href={chrome.runtime.getURL('options.html')}>
          Options
        </Link>
      </Stack>
    </Container>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Popup />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
