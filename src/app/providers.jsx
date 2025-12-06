// src/app/providers.jsx
'use client';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// Kita paksa tema gelap
const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#141414",
        color: "white",
      },
    },
  },
});

export function Providers({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}