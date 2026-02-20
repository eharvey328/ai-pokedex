import { gql } from "@apollo/client";

export const POKEMON_LIST_FRAGMENT = gql`
  fragment PokemonListFields on Pokemon {
    id
    number
    name
    image
    types
    isFavorite
    maxCP
    maxHP
  }
`;

export const POKEMON_DETAIL_FRAGMENT = gql`
  fragment PokemonDetailFields on Pokemon {
    id
    number
    name
    image
    sound
    types
    isFavorite
    maxCP
    maxHP
    weight {
      minimum
      maximum
    }
    height {
      minimum
      maximum
    }
    evolutions {
      id
      name
      image
      types
      isFavorite
    }
    previousEvolutions {
      id
      name
      image
      types
      isFavorite
    }
  }
`;
