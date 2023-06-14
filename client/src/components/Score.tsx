import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Flex,
  Box,
  Spacer,
  Badge,
  Text,
  Heading,
  Avatar,
  AvatarGroup,
} from '@chakra-ui/react';
import { AnswersContext } from '../contexts/Answer';
import { useContext, useEffect, useState } from 'react';
import { colors } from '../utils';

interface IScore {
  isOpen: boolean;
  onClose: () => void;
  onTryAgain: () => void;
}
export const Score = ({ isOpen, onClose, onTryAgain }: IScore) => {
  const [scores, setScores] = useState<number[] | undefined>([]);
  const { state } = useContext(AnswersContext);

  useEffect(() => {
    setScores(state.othersScore?.sort((scoreA, scoreB) => scoreA - scoreB));
    console.log('scores: ', scores);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.othersScore]);

  const handleClose = () => {
    onClose();
    onTryAgain();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => 1} size='4xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems='center'>
              <Badge
                colorScheme='red'
                alignItems='center'
                fontFamily='cursive'
                fontSize='20px'>
                Scores
              </Badge>
              <Spacer />
              <Box display={'flex'}>
                <Text
                  fontFamily='heading'
                  fontSize='20px'
                  textTransform='capitalize'
                  mx='2'>
                  you got
                </Text>
                <Badge colorScheme='green' fontFamily='cursive' fontSize='20px'>
                  {state.score}
                </Badge>
              </Box>
            </Flex>
          </ModalHeader>

          <ModalBody>
            <Text textTransform='capitalize'>
              you are better than{' '}
              <Text
                as='span'
                display='inline'
                fontSize='15'
                mr='1'
                bg='green.200'
                p='1'
                borderRadius='md'>
                {state.percentile}%
              </Text>
              of others's score
            </Text>
            <Heading my='5'>Others's scores</Heading>
            <Flex
              justifyContent='center'
              alignItems='center'
              wrap='wrap'
              height='50vh'
              overflow='scroll'
              overflowX='hidden'>
              {state.othersScore?.map((score, idx) => {
                const randomIndex = Math.floor(Math.random() * colors.length);
                return (
                  <Flex
                    justifyContent='start'
                    alignItems='center'
                    key={`${score}-${idx}`}
                    width='30%'
                    bgColor='blackAlpha.500'
                    borderRadius='md'
                    color='white'
                    p='2'
                    m='2'>
                    <AvatarGroup>
                      <Avatar bg={colors[randomIndex]} />
                    </AvatarGroup>
                    <Text p='1'>{score}</Text>
                  </Flex>
                );
              })}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={handleClose}
              variant='outline'>
              Try Again
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
