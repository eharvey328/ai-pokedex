import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPokemon, getPokemonById, toggleFavorite } from "../api";
import { PokemonType } from "../types";

const ITEMS_PER_PAGE = 20;

/**
 * Hook for fetching paginated Pokemon list with infinite scroll
 */
export function usePokemonList(query: string, type: PokemonType | "All", showFavorites: boolean) {
  return useInfiniteQuery({
    queryKey: ["pokemon", query, type, showFavorites],
    queryFn: ({ pageParam = 0 }) =>
      getPokemon({
        limit: ITEMS_PER_PAGE,
        offset: pageParam,
        query: query || undefined,
        type: type !== "All" ? type : undefined,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((sum, page) => sum + page.items.length, 0);
      return totalFetched < lastPage.count ? totalFetched : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => {
      // Filter favorites on client side since API doesn't support it
      if (showFavorites) {
        return {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            items: page.items.filter((pokemon) => pokemon.isFavorite),
          })),
        };
      }
      return data;
    },
  });
}

/**
 * Hook for fetching single Pokemon details
 */
export function usePokemonDetail(id: string | null) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemonById(id!),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

/**
 * Hook for toggling Pokemon favorite status with optimistic updates
 */
export function useToggleFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, isFavorite }: { id: string; isFavorite: boolean }) =>
      toggleFavorite(id, isFavorite),
    onMutate: async ({ id, isFavorite }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["pokemon"] });

      // Snapshot previous values
      const previousLists = queryClient.getQueriesData({ queryKey: ["pokemon"] });

      // Optimistically update all queries
      queryClient.setQueriesData({ queryKey: ["pokemon"] }, (old: any) => {
        if (!old) return old;

        // Handle infinite query data
        if (old.pages) {
          return {
            ...old,
            pages: old.pages.map((page: any) => ({
              ...page,
              items: page.items.map((pokemon: any) =>
                pokemon.id === id
                  ? { ...pokemon, isFavorite: !isFavorite }
                  : pokemon
              ),
            })),
          };
        }

        // Handle single Pokemon query
        if (old.id === id) {
          return { ...old, isFavorite: !isFavorite };
        }

        return old;
      });

      return { previousLists };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousLists) {
        context.previousLists.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },
    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["pokemon"] });
    },
  });
}

// Made with Bob
