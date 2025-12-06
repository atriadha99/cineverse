import { Providers } from "./providers";
import { AuthContextProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
  title: 'TemuScene',
  description: 'Your Favorite Scene Streaming App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </Providers>
      </body>
    </html>
  )
}