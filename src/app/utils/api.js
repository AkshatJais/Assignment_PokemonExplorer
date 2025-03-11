import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

export const fetchPokemons = async () => {
    const response = await axios.get(API_URL);
    return response.data.results;
};
