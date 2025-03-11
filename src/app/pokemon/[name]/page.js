"use client";
import { useEffect, useState } from "react";
import { fetchPokemonDetails } from "../../../lib/pokemon";
import { useParams } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";

export default function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    async function getData() {
      const data = await fetchPokemonDetails(name);
      setPokemon(data);
    }
    getData();

    // GSAP Animation
    gsap.from(".pokemon-detail", {
      opacity: 0,
      y: 30,
      duration: 0.6,
    });
  }, [name]);

  if (!pokemon) return <p className="text-center text-[#F2CC8F]">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#3D405B] text-[#F2CC8F] p-6 flex flex-col items-center">
      <Link href="/" className="text-heading text-lg mb-4 hover:underline">
        ← Back to Home
      </Link>

      <div className="pokemon-detail p-6 rounded-lg bg-[#1A1C2C] shadow-lg max-w-lg text-center">
        <h1 className="text-4xl font-bold text-heading capitalize">{pokemon.name}</h1>

        {/* Pokemon Image */}
        <div className="flex justify-center mt-4">
          <img 
            src={pokemon.sprites.other["official-artwork"].front_default} 
            alt={pokemon.name} 
            className="w-48 h-48 object-contain"
          />
        </div>

        {/* Details */}
        <div className="mt-4 text-lg">
          <p className="text-[#81B29A]">Type: 
            <span className="text-white"> {pokemon.types.map(t => t.type.name).join(", ")}</span>
          </p>
          <p className="text-[#81B29A]">Abilities: 
            <span className="text-white"> {pokemon.abilities.map(a => a.ability.name).join(", ")}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6">
          <h2 className="text-2xl text-heading">Stats</h2>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {pokemon.stats.map((s, index) => (
              <div key={index} className="bg-[#0F1B2E] p-2 rounded">
                <p className="text-[#F2CC8F]">{s.stat.name}</p>
                <p className="text-white font-bold">{s.base_stat}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
