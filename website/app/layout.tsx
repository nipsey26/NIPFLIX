import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import NavbarWrapper from "./components/NavbarWrapper";


export const metadata: Metadata = {
  title: "NIPFLIX",
  description: "Unlimited entertainment.",
};


export default function RootLayout({

  children,

}:{

  children: React.ReactNode;

}){


  return (

    <html lang="en">

      <body
        className="
        bg-black
        text-white
        min-h-screen
        "
      >

        <Providers>

          <NavbarWrapper />

          <div className="pt-24">

            {children}

          </div>

        </Providers>

      </body>

    </html>

  );

}