# Pokédex Application

A modern, responsive Pokédex application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to browse, search, filter, and favorite Pokemon while exploring their detailed information and evolution chains.

![Pokédex App](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwind-css)

## 🚀 Features

### Core Functionality

- ✅ **Pokemon List View**: Browse all Pokemon in a responsive grid layout
- ✅ **Search**: Search Pokemon by name or ID
- ✅ **Type Filter**: Filter Pokemon by their type (Fire, Water, Grass, etc.)
- ✅ **Favorites System**: Add/remove Pokemon to favorites with persistent storage
- ✅ **View Toggle**: Switch between "All Pokemon" and "Favorites" views
- ✅ **Pagination**: Load more Pokemon with a "Load More" button
- ✅ **Pokemon Details**: View comprehensive information including:
  - High-quality artwork
  - Types and abilities
  - Physical stats (height, weight)
  - Base stats with visual progress bars
  - Pokemon description
  - Complete evolution chain with navigation

### Additional Features

- 🎨 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- ⚡ **Loading States**: Smooth loading indicators for better UX
- 🎯 **Error Handling**: Graceful error messages and fallbacks
- 💾 **Local Storage**: Favorites persist across sessions
- 🔄 **Real-time Updates**: Favorites sync across the application
- 🎭 **Smooth Animations**: Hover effects and transitions throughout

## 🛠️ Technologies Used

### Core Technologies

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
  - _Why_: Provides excellent developer experience, built-in routing, and optimized performance out of the box
  - _New Learning_: App Router architecture and server/client component patterns

- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
  - _Why_: Ensures code quality, better IDE support, and catches errors at compile time
  - _Experience_: Strong typing for API responses and component props

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
  - _Why_: Rapid UI development, consistent design system, and excellent responsive utilities
  - _Experience_: Custom color schemes and responsive grid layouts

### Supporting Libraries

- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge Tailwind classes without conflicts

### API

- **[PokéAPI](https://pokeapi.co/)** - RESTful Pokemon API
  - _Why_: Comprehensive, free, and well-documented Pokemon data
  - _Endpoints Used_:
    - `/pokemon` - List and individual Pokemon data
    - `/pokemon-species` - Species information and evolution chains
    - `/type` - Pokemon types for filtering
    - Evolution chain endpoints

## 📁 Project Structure

```
pokedex-app/
├── app/
│   ├── layout.tsx              # Root layout with metadata
│   ├── page.tsx                # Home page with Pokemon list
│   ├── globals.css             # Global styles
│   └── pokemon/
│       └── [id]/
│           └── page.tsx        # Dynamic Pokemon detail page
├── components/
│   ├── PokemonCard.tsx         # Pokemon card component
│   ├── SearchBar.tsx           # Search input component
│   ├── TypeFilter.tsx          # Type filter dropdown
│   └── Loading.tsx             # Loading spinner component
├── lib/
│   ├── api.ts                  # API service layer
│   ├── favorites.ts            # Favorites management (localStorage)
│   └── utils.ts                # Utility functions
├── types/
│   └── pokemon.ts              # TypeScript type definitions
└── public/                     # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd pokedex-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Implementation Details

### State Management

- Used React hooks (`useState`, `useEffect`, `useCallback`) for local state
- Custom event system for cross-component favorites synchronization
- LocalStorage for persistent favorites

### Performance Optimizations

- Image optimization with Next.js `Image` component
- Lazy loading of Pokemon data
- Efficient re-renders with proper dependency arrays
- Pagination to avoid loading all Pokemon at once

### Responsive Design

- Mobile-first approach
- Flexible grid layouts (1-4 columns based on screen size)
- Touch-friendly interactive elements
- Optimized images for different screen sizes

### Type Safety

- Comprehensive TypeScript interfaces for all API responses
- Strict type checking enabled
- Type-safe component props and state

## 🧪 Testing Approach

While comprehensive tests are not included in this initial version, the application is structured for easy testing:

### Recommended Testing Strategy

- **Unit Tests**: Test utility functions in `lib/utils.ts`
- **Component Tests**: Test individual components with React Testing Library
- **Integration Tests**: Test user flows (search, filter, favorites)
- **E2E Tests**: Test complete user journeys with Playwright or Cypress

### Example Test Structure

```typescript
// Example: Testing the favorites functionality
describe("Favorites", () => {
  it("should add Pokemon to favorites", () => {
    // Test implementation
  });

  it("should persist favorites in localStorage", () => {
    // Test implementation
  });
});
```

## 🎨 Design Decisions

### UI/UX Choices

- **Card-based Layout**: Easy to scan and visually appealing
- **Color-coded Types**: Each Pokemon type has a distinct color
- **Heart Icon**: Universal symbol for favorites
- **Progress Bars**: Visual representation of stats
- **Gradient Backgrounds**: Modern, attractive design

### Code Organization

- **Separation of Concerns**: API, UI, and business logic are separated
- **Reusable Components**: Small, focused components
- **Type Safety**: Strong typing throughout the application
- **Clean Code**: Consistent formatting and naming conventions

## 🔮 Future Enhancements

Potential improvements for future iterations:

- [ ] Infinite scroll instead of "Load More" button
- [ ] Advanced filtering (multiple types, stats range)
- [ ] Comparison tool for multiple Pokemon
- [ ] Battle simulator
- [ ] Team builder
- [ ] Dark mode toggle
- [ ] Animations for Pokemon sprites
- [ ] Sound effects
- [ ] PWA support for offline usage
- [ ] Share Pokemon via URL
- [ ] Export favorites list

## 📝 What I Learned

### New Concepts

- **Next.js App Router**: Learned the new App Router architecture with server and client components
- **Dynamic Routes**: Implemented dynamic routing with `[id]` parameter
- **Image Optimization**: Utilized Next.js Image component for automatic optimization

### Challenges Overcome

- **Evolution Chain Parsing**: Recursive traversal of nested evolution data
- **State Synchronization**: Keeping favorites in sync across components
- **Type Safety**: Creating comprehensive TypeScript types for complex API responses
- **Responsive Grid**: Creating a flexible grid that works on all screen sizes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokemon data
- [Next.js](https://nextjs.org/) team for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- The Pokemon Company for creating these amazing creatures

---

Built with ❤️ for the IBM Quantum Frontend Developer position
