import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const httpLink = new HttpLink({
  uri: "https://quantum-coding-excercise-api.vercel.app/api/graphql",
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            keyArgs: ["query", ["search", "filter"]],
            merge(existing, incoming, { args }) {
              const offset = args?.query?.offset ?? 0;
              const existingEdges = existing?.edges ?? [];
              const incomingEdges = incoming?.edges ?? [];

              if (offset === 0) {
                return incoming;
              }

              return {
                ...incoming,
                edges: [...existingEdges, ...incomingEdges],
              };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
});
