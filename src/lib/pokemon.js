const API_URL = "https://pokeapi.co/api/v2/pokemon";

export async function fetchPokemons(limit = 50) {
  const res = await fetch(`${API_URL}?limit=${limit}`);
  const data = await res.json();
  return data.results;
}

export async function fetchPokemonDetails(name) {
  const res = await fetch(`${API_URL}/${name}`);
  const data = await res.json();
  return data;
}
