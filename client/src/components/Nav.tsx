import { Box, Flex, Heading, Image, Spacer } from '@chakra-ui/react';

const Nav = () => {
  return (
    <Flex height='10vh' my='10' alignItems='center'>
      <Box width='200px'>
        <Image
          src='https://contents-live.nagwa.com/content/images/logo.svg'
          alt='Nagwa'
        />
      </Box>
      <Spacer />
      <Box>
        <Heading fontSize='2xl' textTransform='capitalize'>
          what is the part of speech of the words below
        </Heading>
      </Box>
    </Flex>
  );
};

export default Nav;
