import "./globals.css";
import { Figtree } from "next/font/google";

import SupabaseProvider from "@/app/provider/SupabaseProvider";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/app/provider/UserProvider";
import ModalProvider from "@/app/provider/ModalProvider"
import {Toaster} from 'react-hot-toast'

const font = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify",
  description: "Listen to your music",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
