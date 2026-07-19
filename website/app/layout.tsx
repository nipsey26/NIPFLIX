import type { Metadata } from "next";
import "./globals.css";

import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "NIPFLIX",
  description: "Unlimited movies and shows anytime.",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body
        className="
        min-h-screen
        bg-black
        text-white
        "
      >

        <Navbar user={null} />

        {children}

      </body>

    </html>

  );

}