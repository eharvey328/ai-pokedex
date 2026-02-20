"use client";

import { useMutation } from "@apollo/client/react";
import { FAVORITE_POKEMON, UNFAVORITE_POKEMON } from "@/lib/graphql/mutations";
import { Pokemon } from "@/types/pokemon";
import { toast } from "sonner";

export function useFavorite() {
  const [favoritePokemon, { loading: favoriting }] = useMutation(FAVORITE_POKEMON);
  const [unfavoritePokemon, { loading: unfavoriting }] = useMutation(UNFAVORITE_POKEMON);

  const toggleFavorite = async (pokemon: Pick<Pokemon, "id" | "name" | "isFavorite">) => {
    const { id, name, isFavorite } = pokemon;

    try {
      if (isFavorite) {
        await unfavoritePokemon({
          variables: { id },
          optimisticResponse: {
            unFavoritePokemon: { __typename: "Pokemon", id, name, isFavorite: false },
          },
          update(cache) {
            cache.modify({
              id: cache.identify({ __typename: "Pokemon", id }),
              fields: {
                isFavorite: () => false,
              },
            });
          },
        });
        toast.success(`Removed ${name} from favorites`, {
          icon: "💔",
        });
      } else {
        await favoritePokemon({
          variables: { id },
          optimisticResponse: {
            favoritePokemon: { __typename: "Pokemon", id, name, isFavorite: true },
          },
          update(cache) {
            cache.modify({
              id: cache.identify({ __typename: "Pokemon", id }),
              fields: {
                isFavorite: () => true,
              },
            });
          },
        });
        toast.success(`Added ${name} to favorites`, {
          icon: "❤️",
        });
      }
    } catch {
      toast.error(`Failed to update ${name}'s favorite status`);
    }
  };

  return {
    toggleFavorite,
    loading: favoriting || unfavoriting,
  };
}
