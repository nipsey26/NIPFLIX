import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { verifySession } from "./lib/auth";
import { prisma } from "./lib/prisma";
import Navbar from "./components/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "NIPFLIX",
  description: "Unlimited movies and shows anytime, anywhere.",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const cookieStore = await cookies();

  const session = cookieStore.get("session")?.value;


  let user = null;


  if (session) {

    const payload = await verifySession(session);


    if (payload?.userId) {

      user = await prisma.user.findUnique({

        where: {
          id: payload.userId as string,
        },

        select: {
          name: true,
        },

      });

    }

  }



  return (

    <html lang="en">

      <body className="min-h-full flex flex-col bg-black">

        <Navbar user={user} />

        {children}

      </body>

    </html>

  );

}