import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section id="kontakt" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Kontakt Oss
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-primary-foreground/80 max-w-xl mx-auto">
            Vi ser frem til å høre fra deg. Ta kontakt for å bestille time eller for spørsmål.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Phone */}
          <a
            href="tel:+47-412-62-843"
            className="group bg-primary-foreground/5 border border-primary-foreground/10 p-8 text-center hover:bg-primary-foreground/10 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <Phone
                className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Telefon</h3>
            <p className="font-body text-primary-foreground/80">+47 412 62 843</p>
          </a>

          {/* Email */}
          <a
            href="mailto:teie_barbershop@hotmail.com"
            className="group bg-primary-foreground/5 border border-primary-foreground/10 p-8 text-center hover:bg-primary-foreground/10 transition-all duration-300"
          >
            <div className="flex justify-center mb-4">
              <Mail
                className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-300"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">E-post</h3>
            <p className="font-body text-primary-foreground/80 break-all">
              teie_barbershop@hotmail.com
            </p>
          </a>

          {/* Location */}
          <div className="bg-primary-foreground/5 border border-primary-foreground/10 p-8 text-center">
            <div className="flex justify-center mb-4">
              <MapPin className="w-10 h-10 text-accent" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">Adresse</h3>
            <p className="font-body text-primary-foreground/80">
            Smidsrødveien, 9
            3120, Nøtterøy
            </p>
          </div>
        </div>

        {/* Map placeholder or CTA */}
        <div className="mt-16 text-center">
          <a
            href="https://maps.app.goo.gl/BMZwXku2EqYA9FEt8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-2 border-primary-foreground text-primary-foreground px-8 py-4 font-body text-sm uppercase tracking-widest hover:bg-primary-foreground hover:text-primary transition-all duration-300"
          >
            <MapPin size={18} />
            Se på kart
          </a>
        </div>
        <div className="mt-16">
          <div style={{ width: '100%' }}>
            <iframe
              width="100%"
              height="600"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Teie%20Barber%20Shop+(Teie%20barber%20shop)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              title="Teie Barbershop Location"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
