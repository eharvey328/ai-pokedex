import { gql } from "@apollo/client";
import { POKEMON_LIST_FRAGMENT, POKEMON_DETAIL_FRAGMENT } from "./fragments";

export const GET_POKEMONS = gql`
  ${POKEMON_LIST_FRAGMENT}
  query GetPokemons($query: PokemonsQueryInput!) {
    pokemons(query: $query) {
      limit
      offset
      count
      edges {
        ...PokemonListFields
      }
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  ${POKEMON_DETAIL_FRAGMENT}
  query GetPokemonByName($name: String!) {
    pokemonByName(name: $name) {
      ...PokemonDetailFields
    }
  }
`;

export const GET_POKEMON_TYPES = gql`
  query GetPokemonTypes {
    pokemonTypes
  }
`;
