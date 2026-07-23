"use client";

import { useEffect, useState } from "react";

type Profile = {
  id: string;
  name: string;
  avatar: string;
  kids: boolean;
};

const avatars = [
  "😀",
  "😎",
  "🤖",
  "🦁",
  "🐼",
  "🐯",
  "🐸",
  "👑",
];

export default function ProfilePage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("😀");
  const [kids, setKids] = useState(false);

  async function loadProfiles() {
    const res = await fetch("/api/profile");

    if (res.ok) {
      const data = await res.json();
      setProfiles(data);
    }
  }

  useEffect(() => {
    loadProfiles();
  }, []);

  async function createProfile() {
    if (!name.trim()) return;

    await fetch("/api/profile/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        avatar,
        kids,
      }),
    });

    setName("");
    setKids(false);
    setAvatar("😀");

    loadProfiles();
  }

  async function deleteProfile(id: string) {
    await fetch("/api/profile/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    loadProfiles();
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-32">

      <h1 className="text-5xl font-black mb-12 text-center">
        Who's Watching?
      </h1>

      <div className="grid md:grid-cols-4 gap-8 mb-16">

        {profiles.map((profile) => (

          <div
            key={profile.id}
            className="bg-neutral-900 rounded-2xl p-8 text-center hover:scale-105 transition"
          >

            <div className="text-7xl mb-4">
              {profile.avatar}
            </div>

            <h2 className="text-2xl font-black">
              {profile.name}
            </h2>

            {profile.kids && (
              <p className="text-green-400 mt-2">
                Kids Profile
              </p>
            )}

            <button
              onClick={() => deleteProfile(profile.id)}
              className="mt-6 bg-red-600 px-4 py-2 rounded-lg"
            >
              Delete
            </button>

          </div>

        ))}

      </div>

      <div className="bg-neutral-900 rounded-2xl p-8 max-w-xl mx-auto">

        <h2 className="text-3xl font-black mb-6">
          Create New Profile
        </h2>

        <input
          placeholder="Profile Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-black p-3 rounded-lg mb-5"
        />

        <div className="grid grid-cols-4 gap-4 mb-5">

          {avatars.map((item) => (

            <button
              key={item}
              onClick={() => setAvatar(item)}
              className={`text-5xl rounded-xl p-3 border ${
                avatar === item
                  ? "border-red-600"
                  : "border-transparent"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        <label className="flex items-center gap-3 mb-6">

          <input
            type="checkbox"
            checked={kids}
            onChange={(e) => setKids(e.target.checked)}
          />

          Kids Profile

        </label>

        <button
          onClick={createProfile}
          className="w-full bg-red-600 py-4 rounded-xl font-black text-lg"
        >
          Create Profile
        </button>

      </div>

    </main>
  );
}