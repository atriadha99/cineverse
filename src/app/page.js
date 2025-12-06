'use client';

import { Box } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Banner from '@/components/Banner';
import Row from '@/components/Row';
import ArchiveRow from '@/components/ArchiveRow';
import requests from '@/utils/requests';

export default function Home() {
  return (
    <Box pb={10} overflow="hidden"> 
      <Navbar />
      <Banner />
      <ArchiveRow title="Classic Cinema Vault" />
      
      {/* KATEGORI UTAMA */}
      <Row title="TEMUSCENE ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
      
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
    </Box>
  );
}