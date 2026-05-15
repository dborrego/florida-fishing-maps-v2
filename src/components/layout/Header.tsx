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
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Compass className="h-7 w-7 text-plotter group-hover:rotate-45 transition-transform duration-500" />
            <div className="absolute inset-0 blur-md bg-plotter/40 -z-10" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-foam">
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

        <ButtonLink href="/maps" size="sm" variant="primary">
          Get Maps
        </ButtonLink>
      </Container>
    </header>
  );
}
