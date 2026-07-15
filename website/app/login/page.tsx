"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Login failed");
      return;
    }

    setMessage("Login successful! Redirecting...");

    setTimeout(() => {
      router.push("/");
    }, 1500);
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="w-full max-w-md bg-gray-900 p-8 rounded-lg">

        <h1 className="text-4xl font-bold mb-6 text-center">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded bg-gray-800 text-white"
          />

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 p-3 rounded font-bold"
          >
            Login
          </button>

        </form>

        {message && (
          <p className="text-center mt-4 text-gray-300">
            {message}
          </p>
        )}

        <p className="text-gray-400 mt-5 text-center">
          Don't have an account? Sign Up
        </p>

      </div>

    </main>
  );
}