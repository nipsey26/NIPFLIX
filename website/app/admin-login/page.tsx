"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);



  async function login(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);
    setError("");


    const response = await fetch(
      "/api/admin/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );


    const data = await response.json();


    if (!response.ok) {

      setError(
        data.error || "Login failed"
      );

      setLoading(false);

      return;
    }


    router.push("/admin");

    router.refresh();

  }



  return (

    <div className="
      min-h-screen
      bg-black
      flex
      items-center
      justify-center
      px-6
    ">


      <form
        onSubmit={login}
        className="
          bg-neutral-900
          p-8
          rounded-3xl
          w-full
          max-w-md
          border
          border-white/10
        "
      >

        <h1 className="
          text-4xl
          font-black
          text-red-600
          mb-2
        ">
          NIPFLIX
        </h1>


        <p className="
          text-gray-400
          mb-8
        ">
          Admin Studio Login
        </p>



        {error && (

          <div className="
            bg-red-600/20
            text-red-400
            p-3
            rounded-xl
            mb-4
          ">
            {error}
          </div>

        )}



        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="
            w-full
            bg-black
            border
            border-white/10
            rounded-xl
            p-4
            mb-4
            text-white
          "
        />



        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="
            w-full
            bg-black
            border
            border-white/10
            rounded-xl
            p-4
            mb-6
            text-white
          "
        />



        <button
          disabled={loading}
          className="
            w-full
            bg-red-600
            hover:bg-red-700
            rounded-xl
            py-4
            font-black
          "
        >
          {loading ? "Signing in..." : "Enter Admin"}
        </button>


      </form>


    </div>

  );

}