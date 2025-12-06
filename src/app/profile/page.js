'use client';

import { useEffect } from 'react';
import { Box, Flex, Heading, Text, Button, Avatar, Stack, Badge } from '@chakra-ui/react';
import { useUserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function ProfilePage() {
  const { user, logOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/auth');
  }, [user, router]);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/auth');
    } catch (error) { console.log(error); }
  };

  return (
    <Box minH="100vh" bg="#141414" color="white">
      <Navbar /> 
      <Flex justify="center" pt="120px" px={4}>
        <Box w="100%" maxW="600px">
          <Heading as="h1" size="2xl" mb={8} borderBottom="1px solid #333" pb={4}>Account</Heading>
          <Flex direction={{ base: 'column', md: 'row' }} gap={6}>
            <Box><Avatar size="2xl" name={user?.email} bg="red.600" borderRadius="md" src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" /></Box>
            <Box flex={1}>
              <Box bg="gray.600" p={3} borderRadius="sm" mb={6}><Text fontSize="lg" fontWeight="bold">Member: {user?.email}</Text></Box>
              <Heading size="md" mb={4} borderBottom="1px solid #333" pb={2} color="gray.400">Plans (Current Plan: Premium)</Heading>
              
              <Stack spacing={4}>
                 <Flex justify="space-between" align="center" bg="gray.800" p={4} borderRadius="md" _hover={{ bg: "gray.700" }}>
                    <Box><Text fontWeight="bold">TemuScene Standard</Text><Text fontSize="sm" color="gray.400">720p</Text></Box><Button size="sm" colorScheme="gray">Subscribe</Button>
                 </Flex>
                 <Flex justify="space-between" align="center" bg="gray.800" p={4} borderRadius="md" _hover={{ bg: "gray.700" }}>
                    <Box><Text fontWeight="bold">TemuScene Basic</Text><Text fontSize="sm" color="gray.400">1080p</Text></Box><Button size="sm" colorScheme="gray">Subscribe</Button>
                 </Flex>
                 <Flex justify="space-between" align="center" bg="gray.800" p={4} borderRadius="md" border="2px solid red">
                    <Box><Text fontWeight="bold">TemuScene Premium <Badge colorScheme="green" ml={2}>Current</Badge></Text><Text fontSize="sm" color="gray.400">4K + HDR</Text></Box><Button size="sm" isLoading loadingText="Active" colorScheme="gray" variant="ghost" isDisabled>Current</Button>
                 </Flex>
                 <Button w="100%" mt={8} bg="red.600" color="white" size="lg" _hover={{ bg: "red.700" }} onClick={handleLogout}>Sign Out</Button>
              </Stack>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}