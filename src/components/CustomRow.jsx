// src/components/CustomRow.jsx
'use client';

import { useState, useEffect } from 'react';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useRouter } from 'next/navigation';

export default function CustomRow({ title }) {
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchCustomMovies() {
      // Ambil data dari collection 'custom_movies'
      const querySnapshot = await getDocs(collection(db, "custom_movies"));
      const movieList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMovies(movieList);
    }
    fetchCustomMovies();
  }, []);

  if (movies.length === 0) return null; // Kalau gak ada data, sembunyikan row ini

  return (
    <Box ml={5} mb={8}>
      <Heading as="h2" size="md" mb={3} color="white">
        {title} <span style={{fontSize:'0.8em', color:'red'}}>(Exclusive Uploads)</span>
      </Heading>

      <Flex 
        overflowX="scroll" 
        py={4} px={2} gap={4} 
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {movies.map((movie) => (
          <Box 
            key={movie.id} 
            // PENTING: Kita kasih tanda custom=true biar Halaman Watch tau ini film bajakan
            onClick={() => router.push(`/watch/${movie.id}?custom=true`)} 
            minW="160px" 
            h="240px" 
            transition="transform 450ms" 
            _hover={{ transform: "scale(1.08)", opacity: 1 }} 
            cursor="pointer" 
            flexShrink={0}
          >
            <Image 
              src={movie.posterUrl} 
              alt={movie.title} 
              w="100%" h="100%" objectFit="cover" borderRadius="md" 
            />
          </Box>
        ))}
      </Flex>
    </Box>
  );
}