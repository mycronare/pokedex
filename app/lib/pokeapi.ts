const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export async function getPokemonList(limit = 20, offset = 0) {
  const res = await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`);
  return res.json();
}

export async function getPokemon(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}

const imageUrl = (id: number) =>
  `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(id)}.png`;
