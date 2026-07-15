"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("Creating account...");

    try {

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });


      const data = await res.json();


      if (!res.ok) {
        setMessage(data.error || "Signup failed");
        setLoading(false);
        return;
      }


      setMessage("Account created! Redirecting to login...");


      setTimeout(() => {
        router.push("/login");
      }, 1500);


    } catch (error) {

      console.error(error);
      setMessage("Cannot connect to server");

    } finally {

      setLoading(false);

    }
  }


  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg">


        <h1 className="text-4xl font-bold mb-6 text-center">
          Create Account
        </h1>


        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-4"
        >


          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white"
            required
          />


          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white"
            required
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white"
            required
          />


          <button
            type="submit"
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 p-3 rounded font-bold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>


        </form>


        {message && (
          <p className="text-center mt-4 text-gray-300">
            {message}
          </p>
        )}


        <p className="text-gray-400 mt-5 text-center">
          Already have an account? Login
        </p>


      </div>

    </main>
  );
}