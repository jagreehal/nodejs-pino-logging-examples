import axios from 'axios';

export type Pokemon = {
  id: number;
  name: string;
};

const pokemonCache = new Map<number, Pokemon>();

export function setPokemonName(id, name?: string): Pokemon {
  if (!name) {
    throw new Error('name is required');
  }
  const pokemon = pokemonCache.get(id);
  if (!pokemon) {
    throw new Error(`Pokemon with id ${id} not found`);
  }
  const updatedPokemon = { ...pokemon, name };
  pokemonCache.set(id, updatedPokemon);
  return updatedPokemon;
}

export async function getPokemonName(id: number): Promise<Pokemon | undefined> {
  if (pokemonCache.has(id)) {
    return pokemonCache.get(id);
  }

  const { data } = await axios<Pokemon>(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  );
  const { name } = data;
  const pokemon = { id, name };
  pokemonCache.set(id, pokemon);
  return pokemon;
}
