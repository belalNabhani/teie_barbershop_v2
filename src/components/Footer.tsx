import { Scissors } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3 mb-6">
            <Scissors className="w-6 h-6 text-accent rotate-45" strokeWidth={1.5} />
            <span className="font-display text-xl font-semibold text-foreground">
              Teie Barber Shop
            </span>
          </div>

          {/* Quick Links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-8">
            <a
              href="#hjem"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Hjem
            </a>
            <a
              href="#tjenester"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Tjenester
            </a>
            <a
              href="#apningstider"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Åpningstider
            </a>
            <a
              href="#kontakt"
              className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Kontakt
            </a>
          </nav>

          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-border mb-8" />

          {/* Copyright */}
          <p className="font-body text-sm text-muted-foreground">
            © {currentYear} Teie Barber Shop. Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
