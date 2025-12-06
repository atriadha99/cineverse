// src/components/ArchiveRow.jsx
'use client';

import { useState } from 'react';
import { 
  Box, Flex, Heading, Image, 
  Modal, ModalOverlay, ModalContent, ModalBody, ModalCloseButton, useDisclosure 
} from '@chakra-ui/react';

// Data film lokal yang tadi kita buat
import { classicMovies } from '@/utils/classics';

export default function ArchiveRow({ title }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentVideoId, setCurrentVideoId] = useState("");

  const handleClick = (archiveId) => {
    setCurrentVideoId(archiveId);
    onOpen();
  };

  return (
    <Box ml={5} mb={8}>
      <Heading as="h2" size="md" mb={3} color="white">
        {title} <span style={{fontSize: '0.8em', color: '#e50914'}}>(Full Movies)</span>
      </Heading>

      <Flex 
        overflowX="scroll" 
        py={4} px={2} gap={4}
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {classicMovies.map((movie) => (
          <Box 
            key={movie.id}
            onClick={() => handleClick(movie.archive_id)}
            minW="160px" 
            h="240px" // Poster tegak biar beda
            transition="transform 450ms"
            _hover={{ transform: "scale(1.08)", opacity: 1 }}
            cursor="pointer"
            position="relative"
            flexShrink={0}
          >
            <Image
              // Logika: Kalau linknya full http, pakai langsung. Kalau cuma path, tambah base_url TMDB
              src={movie.poster_path.startsWith('http') ? movie.poster_path : `https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title}
              w="100%" h="100%" objectFit="cover" borderRadius="md"
            />
            
            {/* Label "WATCH FREE" biar user tau ini film full */}
            <Box position="absolute" bottom="0" left="0" w="100%" bg="rgba(0,0,0,0.7)" p={1}>
                <Heading size="xs" textAlign="center" color="green.300">WATCH FULL</Heading>
            </Box>
          </Box>
        ))}
      </Flex>

      {/* MODAL PEMUTAR VIDEO ARCHIVE.ORG */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay bg='blackAlpha.900' backdropFilter='blur(5px)' />
        <ModalContent bg="black" border="1px solid #333" h="500px">
          <ModalCloseButton color="white" zIndex="10" bg="red.600" borderRadius="full" />
          <ModalBody p={0} w="100%" h="100%">
             {/* IFRAME ARCHIVE.ORG */}
             {currentVideoId && (
               <iframe 
                 src={`https://archive.org/embed/${currentVideoId}`} 
                 width="100%" 
                 height="100%" 
                 frameBorder="0" 
                 allowFullScreen
                 title="Archive Video Player"
               ></iframe>
             )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}