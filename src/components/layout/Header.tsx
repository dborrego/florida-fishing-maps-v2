import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Compass } from "lucide-react";

const nav = [
  { href: "/maps", label: "Shop Maps" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-plotter/10 bg-abyss/80 backdrop-blur-lg">
      <Container className="flex h-16 min-w-0 items-center justify-between gap-3">
        <Link href="/" className="group flex min-w-0 items-center gap-2">
          <div className="relative">
            <Compass className="h-7 w-7 shrink-0 text-plotter group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 blur-md bg-plotter/40 -z-10" />
          </div>
          <span className="truncate font-display text-base font-bold tracking-tight text-foam sm:text-lg">
            Florida<span className="text-plotter">Fishing</span>Maps
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-foam/75 hover:text-plotter transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <ButtonLink href="/maps" size="sm" variant="primary" className="shrink-0 px-3 sm:px-4">
          <span className="sm:hidden">Maps</span>
          <span className="hidden sm:inline">Get Maps</span>
        </ButtonLink>
      </Container>
    </header>
  );
}
