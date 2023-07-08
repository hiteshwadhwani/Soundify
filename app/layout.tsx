import "./globals.css";
import { Figtree } from "next/font/google";

import SupabaseProvider from "@/app/provider/SupabaseProvider";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/app/provider/UserProvider";
import ModalProvider from "@/app/provider/ModalProvider"
import {Toaster} from 'react-hot-toast'
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from '@/components/Player'

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify",
  description: "Listen to your music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const songsOfUser = await getSongsByUserId()
  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={songsOfUser}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
