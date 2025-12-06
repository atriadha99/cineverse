'use client';

import { useState } from 'react';
import { Box, Button, Input, Stack, Text, Heading, Alert, AlertIcon } from '@chakra-ui/react';
import { useUserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp, logIn } = useUserAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) await logIn(email, password);
      else await signUp(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <Box w="100%" h="100vh" bgImage="url('https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42d-2256-432d-9372-6804e3046604/ID-en-20230918-popsignuptwoweeks-perspective_alpha_website_large.jpg')" bgSize="cover" position="relative">
      <Box position="absolute" top="0" left="0" w="100%" h="100%" bg="blackAlpha.600" />
      
      {/* LOGO TEMUSCENE */}
      <Box position="absolute" top="5" left="5" zIndex="10">
        <Heading color="red.600" letterSpacing="tighter">TEMUSCENE</Heading>
      </Box>
      
      <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" w={{ base: "90%", md: "450px" }} bg="blackAlpha.800" p={10} borderRadius="md" boxShadow="lg">
        <Heading mb={6} color="white">{isLogin ? 'Sign In' : 'Sign Up'}</Heading>
        {error && <Alert status='error' mb={4} borderRadius="md"><AlertIcon />{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Input placeholder="Email" bg="#333" border="none" color="white" _focus={{ bg: "#444" }} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" bg="#333" border="none" color="white" _focus={{ bg: "#444" }} onChange={(e) => setPassword(e.target.value)} />
            <Button type="submit" w="100%" bg="red.600" color="white" _hover={{ bg: "red.700" }} mt={4}>{isLogin ? 'Sign In' : 'Sign Up'}</Button>
          </Stack>
        </form>
        <Text mt={8} color="gray.400">
          {isLogin ? 'New to TemuScene? ' : 'Already have an account? '}
          <Text as="span" color="white" cursor="pointer" fontWeight="bold" _hover={{ textDecoration: 'underline' }} onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Sign up now.' : 'Sign in.'}</Text>
        </Text>
      </Box>
    </Box>
  );
}