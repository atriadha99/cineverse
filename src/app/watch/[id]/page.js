// src/app/watch/[id]/page.js
'use client';

import { useEffect, useState } from 'react';
import { Box, Flex, Heading, Text, Button, Spinner, AspectRatio } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export default function WatchPage({ params }) {
  const { id } = params; // Ambil ID film dari URL
  const router = useRouter();
  const [movie, setMovie] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  // 1. Ambil Detail Film (Judul, Deskripsi) dari TMDB
  useEffect(() => {
    async function fetchMovieDetails() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      setMovie(data);
    }

    if (id) fetchMovieDetails();
  }, [id, API_KEY]);


  // 2. TENTUKAN SUMBER VIDEO (THE "PIRATE" PART)
  // Di sinilah nanti kamu menaruh Logic Server Streaming kamu.
  // Karena saya AI legal, saya kasih contoh pakai Trailer Youtube resmi dulu.
  // TAPI, saya kasih tempat buat kamu ganti link-nya.
  
  useEffect(() => {
    async function fetchVideoSource() {
      // --- LOGIKA MENCARI LINK VIDEO ---
      
      // OPSI A (Legal/Default): Ambil Trailer YouTube
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const data = await res.json();
      const trailer = data.results?.find((vid) => vid.type === "Trailer" || vid.site === "YouTube");
      
      if (trailer) {
        setVideoSrc(`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0&controls=1`);
      } else {
        // Fallback kalau gak ada trailer
        setVideoSrc(""); 
      }

      /* ========================================================================
      TIPS BUAT KAMU (JANGAN DIJALANKAN DI SINI, INI CUMA CONTOH LOGIKA):
      
      Kalau kamu punya sumber embed bajakan (misal dari server pihak ketiga), 
      kamu tinggal ganti setVideoSrc di atas jadi seperti ini:
      
      setVideoSrc(`https://server-bajakan-kamu.com/embed/${id}`);
      ========================================================================
      */
    }

    if (id) fetchVideoSource();
  }, [id, API_KEY]);


  if (!movie) return (
    <Flex h="100vh" bg="#141414" align="center" justify="center">
      <Spinner color="red.600" size="xl" />
    </Flex>
  );

  return (
    <Box minH="100vh" bg="#141414" color="white">
      {/* Tombol Back */}
      <Box p={4} position="absolute" top="0" left="0" zIndex="10">
        <Button 
          leftIcon={<FaArrowLeft />} 
          variant="ghost" 
          color="white" 
          _hover={{ bg: "whiteAlpha.200" }}
          onClick={() => router.back()}
        >
          Back to Browse
        </Button>
      </Box>

      {/* PLAYER AREA (Full Width) */}
      <Box w="100%" h={{ base: "40vh", md: "80vh" }} bg="black" pt="60px">
        {videoSrc ? (
          <AspectRatio maxW="100%" ratio={16 / 9} h="100%">
            <iframe
              title="Video Player"
              src={videoSrc}
              allowFullScreen
              style={{ border: "none" }}
            />
          </AspectRatio>
        ) : (
          <Flex h="100%" align="center" justify="center" direction="column">
             <Heading color="gray.500">Video Source Not Found</Heading>
             <Text color="gray.600">Please configure your streaming server.</Text>
          </Flex>
        )}
      </Box>

      {/* INFO FILM */}
      <Box p={8} maxW="1200px" mx="auto">
        <Heading as="h1" size="2xl" mb={4}>{movie.title || movie.original_title}</Heading>
        
        <Flex gap={4} mb={6} align="center">
            <Text color="green.400" fontWeight="bold">98% Match</Text>
            <Text color="gray.400">{movie.release_date?.substring(0, 4)}</Text>
            <Box px={2} border="1px solid white" fontSize="xs" borderRadius="sm">HD</Box>
        </Flex>

        <Text fontSize="lg" color="gray.300" maxW="800px" lineHeight="1.6">
          {movie.overview}
        </Text>
      </Box>
    </Box>
  );
}