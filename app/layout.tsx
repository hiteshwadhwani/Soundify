import "./globals.css";
import { Figtree } from "next/font/google";

import SupabaseProvider from "@/app/provider/SupabaseProvider";
import Sidebar from "@/components/Sidebar";
import UserProvider from "@/app/provider/UserProvider";

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
        <SupabaseProvider>
          <UserProvider>
            <Sidebar>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
