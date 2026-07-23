"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage() {


  const router = useRouter();


  const [email, setEmail] =
    useState("");


  const [password, setPassword] =
    useState("");


  const [message, setMessage] =
    useState("");



  async function login() {


    setMessage("");



    try {


      const response =
        await fetch(
          "/api/login",
          {
            method: "POST",

            headers: {
              "Content-Type":
              "application/json",
            },


            body: JSON.stringify({

              email,

              password,

            }),

          }
        );




      const data =
        await response.json();




      if (!response.ok) {


        setMessage(
          data.error ||
          "Login failed"
        );


        return;

      }




      router.push("/");


      router.refresh();




    } catch(error) {


      console.error(error);


      setMessage(
        "Something went wrong"
      );


    }


  }







  return (

    <main
      className="
      min-h-screen
      bg-black
      text-white
      flex
      items-center
      justify-center
      p-6
      "
    >


      <div
        className="
        bg-neutral-900
        p-8
        rounded-xl
        w-full
        max-w-md
        "
      >



        <h1
          className="
          text-4xl
          font-black
          mb-6
          "
        >

          Login to NIPFLIX

        </h1>






        <input

          placeholder="Email"

          type="email"

          value={email}

          onChange={
            e =>
            setEmail(
              e.target.value
            )
          }

          className="
          w-full
          bg-black
          p-3
          rounded-lg
          mb-4
          "

        />






        <input

          placeholder="Password"

          type="password"

          value={password}

          onChange={
            e =>
            setPassword(
              e.target.value
            )
          }

          className="
          w-full
          bg-black
          p-3
          rounded-lg
          mb-4
          "

        />






        <button

          onClick={login}

          className="
          w-full
          bg-red-600
          py-3
          rounded-lg
          font-black
          hover:bg-red-700
          transition
          "

        >

          Login

        </button>







        {message && (

          <p
            className="
            text-red-400
            mt-4
            "
          >

            {message}

          </p>

        )}







        <Link

          href="/register"

          className="
          block
          mt-5
          text-gray-300
          "

        >

          Don't have an account? Register

        </Link>



      </div>



    </main>

  );


}