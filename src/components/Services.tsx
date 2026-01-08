import { Scissors, UserCircle, Droplets, Gift, Sparkles, Baby } from "lucide-react";

interface ServiceItem {
  name: string;
  price: string;
}

interface ServiceCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: ServiceItem[];
}

const services: ServiceCategory[] = [
  {
    title: "Herre Hårklipp",
    description: "Velg den beste stilen for hodeformen, og vi vil gi deg den perfekte klipp.",
    icon: <Scissors className="w-8 h-8" strokeWidth={1.5} />,
    items: [
      { name: "Hårklipp", price: "450 kr" },
      { name: "Skin fade", price: "500 kr" },
      { name: "Taper fade", price: "500 kr" },
      { name: "Maskinklipp (hele hodet)", price: "300 kr" },
      { name: "Hårklipp + Skjegg", price: "850 kr" },
    ],
  },
  {
    title: "Skjegg Trim/Forming",
    description: "Få et komplett skjegg trim og gi det en ren, naturlig stil.",
    icon: <UserCircle className="w-8 h-8" strokeWidth={1.5} />,
    items: [
      { name: "Skjegg trim", price: "400 kr" },
    ],
  },
  {
    title: "Hot Towel Shave",
    description: "For best resultat kombinerer vi moderne og tradisjonelle metoder.",
    icon: <Droplets className="w-8 h-8" strokeWidth={1.5} />,
    items: [
      { name: "Full barbering", price: "400 kr" },
      { name: "Hodet + Skjegg", price: "800 kr" },
    ],
  },
  {
    title: "Gavekort",
    description: "Du kan kjøpe gavekort og velge behandlingen.",
    icon: <Gift className="w-8 h-8" strokeWidth={1.5} />,
    items: [],
  },
  {
    title: "Behandling",
    description: "Vi kan fjerne hår som plager deg i ansiktet og øre med voks eller tråd.",
    icon: <Sparkles className="w-8 h-8" strokeWidth={1.5} />,
    items: [
      { name: "Hår vask", price: "75 kr" },
      { name: "Fjerne hår på ører", price: "125 kr" },
      { name: "Fjerne hår i nese", price: "125 kr" },
      { name: "Fjerne hår på ansikt", price: "250 kr" },
      { name: "Øyenbryn med tråd", price: "100 kr" },
      { name: "Full Pakke", price: "375 kr" },
    ],
  },
  {
    title: "Barneklipp",
    description: "Profesjonelle klipp for de yngste kundene våre.",
    icon: <Baby className="w-8 h-8" strokeWidth={1.5} />,
    items: [
      { name: "Alder 5-12 år", price: "375 kr" },
      { name: "Alder 13-15 år", price: "425 kr" },
    ],
  },
];

const Services = () => {
  return (
    <section id="tjenester" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Tjenester & Priser
          </h2>
          <div className="decorative-line mb-6" />
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Vi tilbyr et bredt utvalg av tjenester. Få klassisk hårklipp og skjegg trim.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-background p-8 border border-border hover:border-accent/50 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-muted-foreground mb-6">
                {service.description}
              </p>

              {/* Price List */}
              {service.items.length > 0 && (
                <ul className="space-y-3">
                  {service.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex justify-between items-center font-body text-sm border-b border-border/50 pb-2"
                    >
                      <span className="text-foreground">{item.name}</span>
                      <span className="text-accent font-medium">{item.price}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Gavekort special message */}
              {service.title === "Gavekort" && (
                <p className="font-body text-sm text-muted-foreground italic">
                  Kontakt oss for å kjøpe gavekort
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
