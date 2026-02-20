import { Header } from "@/components/layout/header";
import { PokemonList } from "@/components/pokemon/pokemon-list";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <PokemonList />
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>
          Built with Next.js 15, React Query, Framer Motion, and Tailwind CSS
        </p>
        <p className="mt-1">
          © 2026 Pokédex. Data provided by{" "}
          <a
            href="https://quantum-coding-excercise-api.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-foreground transition-colors"
          >
            Quantum API
          </a>
        </p>
      </footer>
    </div>
  );
}

// Made with Bob
