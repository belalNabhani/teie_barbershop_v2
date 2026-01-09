import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#hjem", label: "Hjem" },
    { href: "#tjenester", label: "Tjenester" },
    { href: "#apningstider", label: "Åpningstider" },
    { href: "#kontakt", label: "Kontakt" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo placeholder - will be replaced with actual logo */}
          <a href="#" className="flex items-center gap-3">
            <span className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-wide">
              Teie Barbershop
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+47-412-62-843"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 font-body text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors duration-300"
            >
              <Phone size={16} />
              Ring Oss
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pt-6 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+47-412-62-843"
                className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-body text-sm uppercase tracking-wider mt-2"
              >
                <Phone size={16} />
                Ring Oss
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
