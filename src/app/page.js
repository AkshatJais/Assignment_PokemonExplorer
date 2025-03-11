"use client";
import { useEffect, useState } from "react";
import { fetchPokemons } from "../lib/pokemon";
import Link from "next/link";
import { gsap } from "gsap";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getData() {
      const data = await fetchPokemons(100);
      setPokemons(data);
    }
    getData();

    // GSAP Animation
    gsap.from(".pokemon-card", {
      opacity: 0,
      y: 20,
      stagger: 0.05,
      duration: 0.6,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#3D405B] text-[#f2cc8fa1] p-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold text-heading text-center drop-shadow-lg">
        Pokemon Explorer
      </h1>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Pokemon"
        className="w-full md:w-1/2 mt-6 p-3 rounded-full bg-[#1a1c2c] text-white placeholder-gray-400 focus:ring-2 focus:ring-heading outline-none transition"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Pokemon Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-10 w-full max-w-5xl">
        {pokemons
          .filter((p) => p.name.includes(search.toLowerCase()))
          .map((p, index) => (
            <Link key={index} href={`/pokemon/${p.name}`}>
              <div className="pokemon-card p-4 rounded-lg bg-[#0f1b2e] shadow-xl hover:scale-105 transition transform duration-200 hover:bg-[#1e2939]">
                <p className="text-center text-[#324730] capitalize text-lg font-semibold">{p.name}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
