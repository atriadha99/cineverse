// src/app/admin/page.js
'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, Stack, Heading, FormControl, FormLabel, useToast, Container } from '@chakra-ui/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { useUserAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
  const { user } = useUserAuth();
  const router = useRouter();
  const toast = useToast();

  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    posterUrl: '',   // Link Gambar Poster (Tegak)
    backdropUrl: '', // Link Gambar Background (Lebar)
    videoUrl: '',    // Link Video Utama (Embed/MP4)
    releaseDate: ''
  });

  const [loading, setLoading] = useState(false);

  // Proteksi: Kalau belum login, lempar ke halaman auth
  useEffect(() => {
    if (!user) router.push('/auth');
  }, [user, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simpan ke Firebase Collection 'custom_movies'
      await addDoc(collection(db, "custom_movies"), {
        ...formData,
        createdAt: new Date(),
        isCustom: true 
      });

      toast({
        title: "Film Berhasil Diupload!",
        description: "Cek halaman depan untuk melihat hasilnya.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Reset Form
      setFormData({ title: '', overview: '', posterUrl: '', backdropUrl: '', videoUrl: '', releaseDate: '' });

    } catch (error) {
      console.error(error);
      toast({ title: "Gagal upload", status: "error" });
    }
    setLoading(false);
  };

  return (
    <Box minH="100vh" bg="#141414" color="white" pt="100px">
      <Navbar />
      <Container maxW="container.md">
        <Heading mb={6} color="red.600">CMS TemuScene (Admin)</Heading>
        
        <form onSubmit={handleSubmit}>
          <Stack spacing={4} bg="gray.900" p={8} borderRadius="md" boxShadow="lg">
            
            <FormControl>
              <FormLabel>Judul Film</FormLabel>
              <Input name="title" value={formData.title} onChange={handleChange} placeholder="Contoh: Avengers (Cam)" bg="#222" border="none" required />
            </FormControl>

            <FormControl>
              <FormLabel>Sinopsis</FormLabel>
              <Textarea name="overview" value={formData.overview} onChange={handleChange} placeholder="Deskripsi film..." bg="#222" border="none" required />
            </FormControl>

            <FormControl>
              <FormLabel>Link Poster (URL Gambar Tegak)</FormLabel>
              <Input name="posterUrl" value={formData.posterUrl} onChange={handleChange} placeholder="https://..." bg="#222" border="none" required />
            </FormControl>

            <FormControl>
              <FormLabel>Link Backdrop (URL Gambar Lebar)</FormLabel>
              <Input name="backdropUrl" value={formData.backdropUrl} onChange={handleChange} placeholder="https://..." bg="#222" border="none" required />
            </FormControl>

            <FormControl>
              <FormLabel color="green.300">Link Video / Embed Source</FormLabel>
              <Input name="videoUrl" value={formData.videoUrl} onChange={handleChange} placeholder="https://..." bg="#222" border="1px solid green" required />
              <FormLabel fontSize="xs" color="gray.500">Masukkan link embed Google Drive, HLS, atau MP4 direct link.</FormLabel>
            </FormControl>

            <Button type="submit" colorScheme="red" size="lg" isLoading={loading} mt={4}>
              Upload Film
            </Button>
          </Stack>
        </form>
      </Container>
    </Box>
  );
}