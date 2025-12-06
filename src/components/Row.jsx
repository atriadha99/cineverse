// src/components/Row.jsx
'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'; // Import Router

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const router = useRouter(); // Init Router

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(fetchUrl);
      const data = await request.json();
      setMovies(data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // Fungsi Pindah Halaman
  const handleClick = (movie) => {
    // Arahkan ke /watch/[id]
    router.push(`/watch/${movie.id}`);
  };

  return (
    <Box ml={5} mb={8}>
      <Heading as="h2" size="md" mb={3} color="white">
        {title}
      </Heading>

      <Flex 
        overflowX="scroll" 
        py={4} 
        px={2} 
        gap={4} 
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {movies.map((movie) => (
          ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
            <Box 
              key={movie.id} 
              // Pas diklik panggil handleClick
              onClick={() => handleClick(movie)} 
              minW={isLargeRow ? "160px" : "240px"} 
              h={isLargeRow ? "250px" : "135px"} 
              transition="transform 450ms" 
              _hover={{ transform: "scale(1.08)", opacity: 1 }} 
              cursor="pointer" 
              flexShrink={0}
            >
              <Image 
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name} 
                w="100%" 
                h="100%" 
                objectFit="cover" 
                borderRadius="md" 
              />
            </Box>
          )
        ))}
      </Flex>
    </Box>
  );
}

export default Row;