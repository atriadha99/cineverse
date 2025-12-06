// src/components/Banner.jsx
'use client';

import { useState, useEffect } from 'react';
import { Box, Heading, Text, Button, Flex, Stack } from '@chakra-ui/react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import requests from '@/utils/requests';
import { useRouter } from 'next/navigation'; // Import Router

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const router = useRouter(); // Init Router
  const base_url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(requests.fetchNetflixOriginals);
      const data = await request.json();
      
      // Ambil 1 film random
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
      return request;
    }
    fetchData();
  }, []);

  // FUNGSI PLAY: Pindah ke halaman Nonton
  const handlePlay = () => {
    if (movie?.id) {
      router.push(`/watch/${movie.id}`);
    }
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <Box
      color="white"
      objectFit="contain"
      h="448px"
      position="relative"
      bgImage={`url("${base_url}${movie?.backdrop_path}")`}
      bgSize="cover"
      bgPos="center top"
    >
      {/* Gradient Overlay */}
      <Box 
        bgGradient="linear(to-b, transparent 0%, #141414 100%)" 
        h="100%" w="100%" position="absolute" top="0" left="0" 
      />

      <Flex 
        direction="column" pt="140px" h="100%" 
        px={{ base: 4, md: 8 }} position="relative" zIndex="1" maxW="600px"
      >
        <Heading size="2xl" mb={4} textShadow="2px 2px 4px rgba(0,0,0,0.5)">
          {movie?.title || movie?.name || movie?.original_name}
        </Heading>
        
        <Stack direction="row" spacing={4} mb={4}>
          <Button 
            leftIcon={<FaPlay />} 
            bg="white" color="black" 
            _hover={{ bg: "gray.300" }}
            onClick={handlePlay} 
          >
            Play
          </Button>
          <Button 
            leftIcon={<FaInfoCircle />} 
            bg="rgba(109, 109, 110, 0.7)" color="white" 
            _hover={{ bg: "rgba(109, 109, 110, 0.4)" }}
          >
            More Info
          </Button>
        </Stack>

        <Text fontSize="sm" fontWeight="medium" maxW="400px" lineHeight="1.3" textShadow="1px 1px 2px black">
          {truncate(movie?.overview, 150)}
        </Text>
      </Flex>
    </Box>
  );
}