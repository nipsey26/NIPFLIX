"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RemoveFromList({
  movieId,
}: {
  movieId: string;
}) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);


  async function removeMovie() {

    setLoading(true);


    await fetch("/api/remove-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movieId,
      }),
    });


    router.refresh();

  }


  return (
    <button
      onClick={removeMovie}
      disabled={loading}
      className="mt-3 bg-red-600 px-4 py-2 rounded text-sm"
    >
      {loading ? "Removing..." : "Remove"}
    </button>
  );
}