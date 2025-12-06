'use client';

import { useState, useEffect } from 'react';
import { Flex, Heading, Stack, Button, IconButton, Avatar, Menu, MenuButton, MenuList, MenuItem, Box } from '@chakra-ui/react';
import { FaSearch, FaBell } from 'react-icons/fa';
import { useUserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [show, handleShow] = useState(false);
  const { user, logOut } = useUserAuth();
  const router = useRouter();

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 100) handleShow(true);
      else handleShow(false);
    };
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/auth');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      as="nav" position="fixed" top="0" width="100%" zIndex="1000" padding="1.5rem"
      align="center" justify="space-between" transition="all 0.5s"
      bg={show ? "#141414" : "transparent"} 
    >
      <Heading 
        as="h1" size="lg" color="red.600" letterSpacing="tighter" cursor="pointer"
        onClick={() => router.push('/')}
        textShadow="1px 1px 2px black"
      >
        TEMUSCENE
      </Heading>

      {user ? (
        <Stack direction="row" spacing={4} align="center">
          <IconButton icon={<FaSearch />} variant="ghost" color="white" aria-label="Search" />
          <IconButton icon={<FaBell />} variant="ghost" color="white" aria-label="Notif" />
          <Menu>
            <MenuButton>
              <Avatar size="sm" bg="red.600" name={user.email} src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" cursor="pointer" />
            </MenuButton>
            <MenuList bg="black" borderColor="gray.700">
              <MenuItem bg="black" _hover={{ bg: "gray.800" }} onClick={() => router.push('/profile')}>Account: {user.email}</MenuItem>
              <MenuItem bg="black" _hover={{ bg: "gray.800" }} onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      ) : (
        <Button 
          bg="red.600" color="white" _hover={{ bg: "red.700" }}
          onClick={() => router.push('/auth')}
        >
          Sign In
        </Button>
      )}
    </Flex>
  );
}