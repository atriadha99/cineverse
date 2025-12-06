// src/components/Banner.jsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Box, Heading, Text, Button, Flex, Stack, 
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure 
} from '@chakra-ui/react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import requests from '@/utils/requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

export default function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  
  // Chakra UI Hook untuk mengontrol buka/tutup Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const base_url = "https://image.tmdb.org/t/p/original/";

  const router = useRouter();

const handlePlay = () => {
  if (movie?.id) {
    router.push(`/watch/${movie.id}`);
  }
};

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(requests.fetchNetflixOriginals);
      const data = await request.json();
      setMovie(
        data.results[Math.floor(Math.random() * data.results.length - 1)]
      );
      return request;
    }
    fetchData();
  }, []);

  // Fungsi saat tombol PLAY diklik
  const handlePlay = async () => {
    if (trailerUrl) {
      onOpen(); // Kalau url udah ada, langsung buka modal
    } else {
      // Cari trailer
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          if (url) {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
            onOpen(); // Buka modal setelah dapat URL
          } else {
            alert("Maaf, trailer untuk film ini tidak ditemukan :(");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // Settingan Player Youtube di dalam Modal
  const opts = {
    height: "450", // Tinggi video di modal
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <>
      <Box
        color="white"
        objectFit="contain"
        h="448px"
        position="relative"
        bgImage={`url("${base_url}${movie?.backdrop_path}")`}
        bgSize="cover"
        bgPos="center top"
      >
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
            {/* Tombol Play sekarang punya onClick */}
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

      {/* --- INI POP-UP MODAL VIDEO --- */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg='blackAlpha.800' backdropFilter='blur(5px)' />
        <ModalContent bg="#141414" border="1px solid #333">
          <ModalCloseButton color="white" zIndex="10" />
          <ModalBody p={0}>
             {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}