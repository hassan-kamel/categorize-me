import { useMutation, useQuery } from '@tanstack/react-query';
import { getScore, getWords } from './api';
import {
  Heading,
  Flex,
  Container,
  Button,
  Text,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import { Word } from './types';
import Question from './components/Question';
import { useContext, useEffect } from 'react';
import { AnswersContext } from './contexts/Answer';
import { Score } from './components/Score';
import Nav from './components/Nav';

function App() {
  // Hook for managing the score screen (popup)
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Hook for managing server state thats comes from the api
  const {
    data: words,
    isError,
    error,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['words'],
    queryFn: getWords,
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation({
    mutationFn: getScore,
    onSuccess: ({ myScore, scores }: { myScore: number; scores: number[] }) => {
      dispatch({
        type: 'SCORE',
        payload: { othersScore: scores, percentile: myScore },
      });
    },
  });

  // Hook for managing cline state thats comes from the context api we created
  const { state, dispatch } = useContext(AnswersContext);

  useEffect(() => {
    mutation.mutate(state.score);
    console.log({ ss: state.score });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.score]);

  // Handle function for submission the answers and send the score to the api
  const handleSubmit = async () => {
    await dispatch({ type: 'CORRECT', payload: words as Word[] });
    await dispatch({ type: 'SUBMIT' });
    onOpen(); // to open the score modal
  };

  if (isLoading || isFetching)
    return (
      <Flex height='100vh' justifyContent='center' alignItems='center'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          color='blue.500'
          size='xl'
          zIndex={9}
        />
      </Flex>
    );
  else if (isError) return <Heading>{JSON.stringify(error)}</Heading>;
  else {
    return (
      <Container maxW='1000px' py='5'>
        {/* appBar */}
        <Nav />
        {/* All Questions */}
        <Flex
          wrap='wrap'
          justifyContent='space-evenly'
          alignItems='center'
          gap='10px'>
          {words.map((word: Word, idx: number) => {
            return <Question key={word.id} index={idx} {...word}></Question>;
          })}
        </Flex>
        {/* footer  */}
        <Flex justifyContent='center' my='16' wrap='wrap'>
          {state.answers.length < 11 && (
            <Text
              textTransform='capitalize'
              fontWeight='bold'
              color='red.300'
              my='1'>
              please solve all questions
            </Text>
          )}
          <Button
            isLoading={state.answers.length < 11}
            loadingText='waiting'
            colorScheme='green'
            variant='outline'
            width='80%'
            onClick={handleSubmit}>
            Submit
          </Button>
        </Flex>
        {/* score Screen (popup) */}
        <Score
          isOpen={isOpen}
          onClose={onClose}
          onTryAgain={() => {
            dispatch({ type: 'RESET' });
            refetch();
          }}
        />
      </Container>
    );
  }
}

export default App;
