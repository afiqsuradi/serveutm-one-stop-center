'use client'

import {
  Container,Flex,Box,Heading,Text,IconButton,Button,VStack,HStack,Wrap,WrapItem,FormControl,FormLabel,Input,InputGroup,InputLeftElement,Textarea, flexbox,} from '@chakra-ui/react'
import { MdPhone, MdEmail, MdLocationOn, MdFacebook, MdOutlineEmail,} from 'react-icons/md'
import { BsGithub, BsPerson } from 'react-icons/bs'

export default function Contact() {
  return (
    <Container 
        bg={242526}
        maxW="full"
        mt={0}
        centerContent
        verflow="hidden"
        height="100vh" 
        width="100vw"
        
    >
      <Flex>
        <Box
            
            color="white"
            borderRadius={20}
            height="100%"
            width="100%"
            bg={242526}
            p={{ sm: 5, md: 5, lg: 16 }}
            top="50%"
            left="50%"
            mt={100}

          >
          <Box p={4}          >
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact Us</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500"
                  mr={20}
                  ml={20}>
                    Fill up the form below to contact
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack pl={0} spacing={3} alignItems="flex-start" >
                      <Button
                        size="md"
                        height="100%"
                        width="100%"
                        variant="ghost"
                        color="#DCE2FF"
                        bg={242526}
                        _hover={{ borderRight: '2px solid #1C6FEB' }}
                        leftIcon={<MdPhone color="#1970F1" size="20px" />}>
                        +60-123456789
                      </Button>
                      <Button
                        size="md"
                        height="100%"
                        width="100%"
                        variant="ghost"
                        color="#DCE2FF"
                        bg={242526}
                        paddingLeft={20}
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                        serveUTM@gmail.com
                      </Button>
                      <Button
                        size="md"
                        height="100%"
                        width="100%"
                        variant="ghost"
                        color="#DCE2FF"
                        bg={242526}
                        _hover={{ border: '2px solid #1C6FEB' }}
                        leftIcon={<MdLocationOn color="#1970F1" size="20px" />}>
                        Kuala Lumpur,Malaysia
                      </Button>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start">
                    <IconButton
                      aria-label="facebook"
                      variant="ghost"
                      size="lg"
                      
                      isRound={true}
                      _hover={{ bg: 'white' }}
                      bg={242526}
                      icon={<a href="https://www.facebook.com/univteknologimalaysia/?locale=ms_MY" target="_blank" rel="noopener noreferrer"><MdFacebook size="28px" /></a>}
                      mr={70}
                      ml={50}
                      mt={10}

                    />
                    <IconButton
                      aria-label="github"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: 'white' }}
                      bg={242526}
                      icon={
                        <a href="https://github.com/afiqsuradi/serveutm-one-stop-center" target="_blank" rel="noopener noreferrer">
                          <BsGithub size="28px" />
                        </a>
                      }
                      mr={20}
                      mt={10}
                    />
                   
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box 
                 bg="white"
                 borderRadius={20} 
                 paddingRight={20}
                 paddingBottom={5}
                 ml={50}
                 mr={50}
                 mt={20}
                 display="flex"
                 alignItems="center"
                 alignContent="center"
                 justifyContent="center"
                 zIndex={9999}     
                >
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="name">
                        <FormLabel ml={20} bg={''}>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7" >
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800"  />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel ml={20}>Mail</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input type="text" size="md" />
                        </InputGroup>
                      </FormControl>
                      <FormControl id="name">
                        <FormLabel ml={20}>Message</FormLabel>
                        <Textarea
                          borderColor="gray.300"
                          _hover={{
                            borderRadius: 'gray.300',
                          }}
                          
                          placeholder="message"
                          style={{
                            margin: 'auto',
                            display: 'block',
                          }}
                        />
                      </FormControl>
                      <FormControl id="name" float="right" ml={25} mt={50} >
                        <Button variant="solid" bg="#0D74FF" color="white" _hover={{}}>
                          Send Message                        
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}
