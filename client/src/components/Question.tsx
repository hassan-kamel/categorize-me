import { useRadioGroup, HStack, Heading, Flex, Text } from '@chakra-ui/react';
import { RadioCard } from './RadioCard';
import { Word } from '../types';
import { useContext, useEffect } from 'react';
import { AnswersContext } from '../contexts/Answer';
import { v4 as uuidv4 } from 'uuid';

const PosOptions = ['adjective', 'adverb', 'noun', 'verb'];

interface IQuestion extends Word {
  index: number;
}

const Question = (word: IQuestion) => {
  const { state, dispatch } = useContext(AnswersContext);
  const handleChange = (value: string) => {
    dispatch({ type: 'ANSWER', payload: { id: word.id, pos: value } });
    console.log('state: ', state);
  };

  const { getRootProps, getRadioProps, setValue } = useRadioGroup({
    name: 'Part Of Speech',
    onChange: handleChange,
  });
  useEffect(() => {
    setValue('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.answers]);

  const group = getRootProps();

  return (
    <Flex direction='column' gap='10px'>
      <Heading textTransform='capitalize' fontSize='2xl'>
        <Text color='blue.400' display='inline' mr='7px'>
          {word.index + 1}.
        </Text>
        {word.word}
      </Heading>
      <HStack {...group}>
        {PosOptions.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <RadioCard key={uuidv4()} {...radio}>
              {value}
            </RadioCard>
          );
        })}
      </HStack>
    </Flex>
  );
};

export default Question;
