# Pokédex — IBM Quantum Frontend Exercise

A high-fidelity Pokédex application built to demonstrate modern frontend engineering practices.

## Live Preview

```bash
cd claude
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Technology Choices

### Framework: **Next.js 16 (App Router)**
- **Why**: App Router enables React Server Components for the shell, reducing client-side JS. The layout/page model maps cleanly to a single-page app with a sticky header.
- **What I learned**: Next.js 16 ships with Turbopack by default, resulting in noticeably faster dev builds (~2s vs ~8s).

### Language: **TypeScript**
- **Why**: Required, and correctly so. Explicit GraphQL response types catch mismatches at compile time rather than runtime. The `PokemonsQueryInput` interface mirrors the schema exactly.

### Data Fetching: **Apollo Client 4 + GraphQL**
- **Why over REST**: GraphQL lets us fetch *exactly* the fields we need — the list view omits `weight`, `height`, `sound`, and `previousEvolutions`, saving bandwidth. Apollo's normalized `InMemoryCache` deduplicates Pokemon objects across list and detail queries — clicking a Pokemon you already loaded shows data instantly.
- **Key technique**: The `keyArgs` + `merge` policy on `pokemons` implements cursor-less offset pagination cleanly, appending pages while resetting on filter/search changes.
- **Optimistic UI**: Favorite/unfavorite mutations update the cache immediately via `optimisticResponse`, so the heart icon toggles with zero perceived latency.

### Styling: **Tailwind CSS v3 + CSS Custom Properties**
- **Why**: Utility-first keeps co-location of styles and markup. Custom properties (`--bg-card`, `--text-muted`, etc.) create a design token layer that Tailwind classes compose against, making theme changes trivial.
- **Design system**: Type colors are defined as a lookup table with `bg`, `text`, `border`, `gradient`, and `glow` variants per Pokémon type, enabling consistent visual treatment everywhere.

### Animation: **Framer Motion**
- **Why**: Spring physics (`type: "spring", stiffness, damping`) make transitions feel physical rather than mechanical. `layoutId` for the tab indicator and view toggle produces shared-element transitions with one line.
- **Performance**: `AnimatePresence` with `mode="wait"` prevents flash-of-unstyled-content during view transitions. Card entrance animations are staggered at 40ms/card using `index * 0.04` delay.

### Icons: **Lucide React**
- **Why**: Tree-shakeable, consistent stroke width, TypeScript types for every icon.

### Toasts: **Sonner**
- **Why**: Lightweight, beautiful defaults, stacks correctly.

---

## Features

| Feature | Implementation |
|---|---|
| Grid view | Responsive CSS Grid (2→5 columns) |
| List view | Flex column with condensed card layout |
| Infinite scroll | `IntersectionObserver` on a sentinel `<div>`, triggers `fetchMore` |
| Search | Debounced via React 18 `useDeferredValue` — no explicit setTimeout |
| Type filter | Custom dropdown querying `pokemonTypes` endpoint |
| Favorites | Optimistic mutations + Apollo cache |
| All / Favorites tab | `filter.isFavorite` GraphQL variable |
| Detail modal | Bottom-sheet on mobile, centered dialog on desktop |
| Evolution chain | Horizontal scroll, clickable evolution nodes |
| Pokémon cry | Web Audio API via `new Audio(sound).play()` |
| Keyboard shortcuts | `⌘K` focuses search, `Esc` closes modal |
| Loading states | Shimmer skeleton cards matching grid layout |
| Error states | Friendly message with Lucide icon |
| Empty states | Contextual messaging per view |

---

## Architecture

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout (ApolloProvider, Toaster)
│   └── page.tsx            # Renders <Pokedex>
├── components/
│   ├── Pokedex.tsx         # Root app shell, all state lives here
│   ├── controls/
│   │   ├── SearchBar.tsx   # Controlled text input
│   │   ├── TypeFilter.tsx  # Custom dropdown with type colors
│   │   └── ViewToggle.tsx  # Grid/List toggle with shared layout animation
│   ├── pokemon/
│   │   ├── PokemonCard.tsx # Grid card + list row (view-mode aware)
│   │   ├── PokemonDetail.tsx # Full modal with stats, dimensions, evolutions
│   │   └── PokemonGrid.tsx # Infinite-scroll container
│   ├── providers/
│   │   └── ApolloProvider.tsx
│   └── ui/
│       ├── TypeBadge.tsx   # Colored type pill
│       ├── StatBar.tsx     # Animated stat bar
│       └── SkeletonCard.tsx
├── hooks/
│   ├── useFavorite.ts      # Toggle favorite with optimistic update
│   └── useKeyboard.ts      # Global keyboard shortcut listener
├── lib/
│   ├── apollo-client.ts    # InMemoryCache with pagination merge policy
│   ├── type-colors.ts      # Type → Tailwind class mapping
│   ├── utils.ts            # cn(), formatPokemonNumber(), capitalize()
│   └── graphql/
│       ├── fragments.ts    # Shared field fragments
│       ├── queries.ts      # GET_POKEMONS, GET_POKEMON_BY_NAME, GET_POKEMON_TYPES
│       ├── mutations.ts    # FAVORITE_POKEMON, UNFAVORITE_POKEMON
│       └── types.ts        # TypeScript interfaces for query results
└── types/
    └── pokemon.ts          # Domain model types
```

---

## What I Learned During This Exercise

- **Apollo Client 4** moved all React hooks (`useQuery`, `useMutation`, `ApolloProvider`) to the `@apollo/client/react` subpath. The main entrypoint only exports the client class and cache. This is a significant breaking change from v3.
- **Next.js 16** uses Turbopack by default in dev; production builds use webpack. The `create-next-app` prompts changed again.
- **`useDeferredValue`** for search is a React 18 pattern I prefer over `useDebounce` — it keeps the input responsive while deferring the expensive query re-trigger to when the browser is idle.

