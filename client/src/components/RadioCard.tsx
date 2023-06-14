import { useRadio, Box, RadioProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface IRadioCard extends RadioProps {
  children: ReactNode;
}

export const RadioCard = (props: IRadioCard) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'yellow.400',
          color: 'brown.700',
          borderColor: 'yellow.400',
        }}
        _hover={{
          transform: 'scale(1.1)',
          transition: 'all 0.2s ease',
          border: '1px solid yellow',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        px={5}
        py={3}
        textTransform={'capitalize'}>
        {props.children}
      </Box>
    </Box>
  );
};
