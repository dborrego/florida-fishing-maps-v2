import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Compass, Mail, ShieldCheck } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-plotter/10 bg-abyss">
      <Container className="py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Compass className="h-6 w-6 text-plotter" />
            <span className="font-display font-bold text-lg text-foam">
              Florida<span className="text-plotter">Fishing</span>Maps
            </span>
          </Link>
          <p className="text-sm text-foam/60 max-w-md leading-relaxed">
            GPS fishing spots for every chartplotter. Inshore, offshore, reefs,
            wrecks, and ledges across the entire state of Florida — delivered to
            your inbox in minutes.
          </p>
          <div className="flex items-center gap-3 mt-6 text-xs text-foam/50">
            <ShieldCheck className="h-4 w-4 text-sonar" />
            <span>Secure checkout via Stripe</span>
          </div>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foam mb-4 text-sm uppercase tracking-wider">
            Maps
          </h4>
          <ul className="space-y-2 text-sm text-foam/70">
            <li><Link href="/maps" className="hover:text-plotter">All Regions</Link></li>
            <li><Link href="/maps/florida-keys" className="hover:text-plotter">Florida Keys</Link></li>
            <li><Link href="/maps/miami-offshore" className="hover:text-plotter">Miami Offshore</Link></li>
            <li><Link href="/maps/south-florida-bundle" className="hover:text-plotter">South Florida Bundle</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-semibold text-foam mb-4 text-sm uppercase tracking-wider">
            Help
          </h4>
          <ul className="space-y-2 text-sm text-foam/70">
            <li><Link href="/how-it-works" className="hover:text-plotter">How It Works</Link></li>
            <li><Link href="/compatibility" className="hover:text-plotter">Chartplotter Compatibility</Link></li>
            <li><Link href="/faq" className="hover:text-plotter">FAQ</Link></li>
            <li><Link href="/about" className="hover:text-plotter">About</Link></li>
            <li><Link href="/contact" className="hover:text-plotter">Contact</Link></li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-plotter/10">
        <Container className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4 text-xs text-foam/50">
          <p>© {year} Florida Fishing Maps. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-plotter">Terms</Link>
            <Link href="/privacy" className="hover:text-plotter">Privacy</Link>
            <Link href="/refund-policy" className="hover:text-plotter">Refund Policy</Link>
            <a
              href="mailto:support@floridafishingmaps.com"
              className="hover:text-plotter inline-flex items-center gap-1"
            >
              <Mail className="h-3 w-3" />
              Support
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
