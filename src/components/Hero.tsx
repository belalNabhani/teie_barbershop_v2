import teieLogo from "@/assets/teie_barbershop_logo.png";

const Hero = () => {
  return (
    <section
      id="hjem"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8 opacity-0 animate-fade-up">
          <img
            src={teieLogo}
            alt="Teie Barbershop Logo"
            className="w-48 md:w-64 lg:w-80 h-auto"
          />
        </div>

        {/* Decorative line */}
        <div className="decorative-line mb-8 opacity-0 animate-fade-up animation-delay-200" />

        {/* Subtitle */}
        <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-up animation-delay-300">
          Velkommen inn i salongen. En fantastisk frisøropplevelse hvor menn møtes
          for hårklipp og barbering fra en dyktig barberman.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-up animation-delay-400">
          <a
            href="#tjenester"
            className="inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 font-body text-sm uppercase tracking-widest hover:bg-primary/90 transition-all duration-300 hover:shadow-lg"
          >
            Se Våre Tjenester
          </a>
          <a
            href="tel:+47-412-62-843"
            className="inline-flex items-center justify-center border-2 border-primary text-foreground px-8 py-4 font-body text-sm uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Bestill Time
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
