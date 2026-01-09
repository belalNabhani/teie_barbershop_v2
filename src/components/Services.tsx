import { useState, useEffect } from "react";
import { Scissors, UserCircle, Droplets, Gift, Sparkles, Baby } from "lucide-react";
import { fetchGoogleSheet } from "@/lib/googleSheets";

interface ServiceItem {
  name: string;
  price: string;
}

interface Category {
  name: string;
  description: string;
  icon: string;
}

interface Service {
  name: string;
  price: string;
  categoryName: string;
}

interface ServiceCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: ServiceItem[];
}

// Configuration - Replace with your Google Sheet ID and sheet names
const GOOGLE_SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID || "";
const SERVICES_SHEET_NAME = import.meta.env.VITE_SERVICES_SHEET_NAME || "services";
const CATEGORIES_SHEET_NAME = import.meta.env.VITE_CATEGORIES_SHEET_NAME || "categories";

// Icon mapping
const iconMap: Record<string, React.ReactNode> = {
  Scissors: <Scissors className="w-8 h-8" strokeWidth={1.5} />,
  UserCircle: <UserCircle className="w-8 h-8" strokeWidth={1.5} />,
  Droplets: <Droplets className="w-8 h-8" strokeWidth={1.5} />,
  Gift: <Gift className="w-8 h-8" strokeWidth={1.5} />,
  Sparkles: <Sparkles className="w-8 h-8" strokeWidth={1.5} />,
  Baby: <Baby className="w-8 h-8" strokeWidth={1.5} />,
};

// Fallback services (used if Google Sheet fails or is not configured)
const fallbackServices: ServiceCategory[] = [
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
      { name: "Skjegg trim med maskin", price: "250 kr" },
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

/**
 * Parses Categories sheet data
 * Expected structure: Category Name | Description | Icon
 */
function parseCategories(rows: string[][]): Map<string, Category> {
  const categories = new Map<string, Category>();

  if (rows.length === 0) return categories;

  // Skip header row
  const dataRows = rows.slice(1);

  dataRows.forEach((row) => {
    const [name, description, icon] = row.map(cell => (cell || "").trim());

    if (name) {
      categories.set(name, {
        name,
        description: description || "",
        icon: icon || "Scissors",
      });
    }
  });

  return categories;
}

/**
 * Parses Services sheet data
 * Expected structure: Service Name | Price | Category Name
 */
function parseServices(rows: string[][]): Service[] {
  const services: Service[] = [];

  if (rows.length === 0) return services;

  // Skip header row
  const dataRows = rows.slice(1);

  dataRows.forEach((row) => {
    const [name, price, categoryName] = row.map(cell => (cell || "").trim());

    if (name && price && categoryName) {
      services.push({
        name,
        price,
        categoryName,
      });
    }
  });

  return services;
}

/**
 * Joins categories and services into ServiceCategory array
 */
function joinCategoriesAndServices(
  categories: Map<string, Category>,
  services: Service[]
): ServiceCategory[] {
  const categoryMap = new Map<string, ServiceCategory>();

  // Create ServiceCategory entries from categories
  categories.forEach((category) => {
    const icon = iconMap[category.icon] || iconMap.Scissors;
    categoryMap.set(category.name, {
      title: category.name,
      description: category.description,
      icon,
      items: [],
    });
  });

  // Add services to their categories
  services.forEach((service) => {
    const category = categoryMap.get(service.categoryName);
    if (category) {
      category.items.push({
        name: service.name,
        price: service.price,
      });
    }
  });

  return Array.from(categoryMap.values());
}

const Services = () => {
  const [services, setServices] = useState<ServiceCategory[]>(fallbackServices);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      // If no sheet ID is configured, use fallback
      if (!GOOGLE_SHEET_ID) {
        console.warn("Google Sheet ID not configured. Using fallback data.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch both sheets in parallel
        const [categoriesRows, servicesRows] = await Promise.all([
          fetchGoogleSheet(GOOGLE_SHEET_ID, CATEGORIES_SHEET_NAME),
          fetchGoogleSheet(GOOGLE_SHEET_ID, SERVICES_SHEET_NAME),
        ]);

        // Parse and join
        const categories = parseCategories(categoriesRows);
        const servicesData = parseServices(servicesRows);
        const joinedServices = joinCategoriesAndServices(categories, servicesData);

        setServices(joinedServices);
      } catch (err) {
        console.error("Failed to load services from Google Sheet:", err);
        setError("Kunne ikke laste tjenester. Viser standardliste.");
        // Keep fallback services on error
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  return (
    <section id="tjenester" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold mb-4">
            Tjenester & Priser
          </h2>
          <div className="w-20 h-0.5 bg-accent mx-auto mb-6" />
          <p className="font-body text-primary-foreground/80 max-w-xl mx-auto">
            Vi tilbyr et bredt utvalg av tjenester. Få klassisk hårklipp og skjegg trim.
          </p>
          {error && (
            <p className="font-body text-sm text-accent mt-4">
              {error}
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="font-body text-primary-foreground/80">Laster tjenester...</p>
          </div>
        )}

        {/* Services Grid */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
            <div
              key={service.title}
              className="bg-primary-foreground/5 border border-primary-foreground/10 p-8 hover:bg-primary-foreground/10 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl font-semibold mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-body text-sm text-primary-foreground/80 mb-6">
                {service.description}
              </p>

              {/* Price List */}
              {service.items.length > 0 && (
                <ul className="space-y-3">
                  {service.items.map((item) => (
                    <li
                      key={item.name}
                      className="flex justify-between items-center font-body text-sm border-b border-primary-foreground/20 pb-2"
                    >
                      <span className="text-primary-foreground">{item.name}</span>
                      <span className="text-accent font-medium">{item.price}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Gavekort special message */}
              {service.title === "Gavekort" && (
                <p className="font-body text-sm text-primary-foreground/80 italic">
                  Kontakt oss for å kjøpe gavekort
                </p>
              )}
            </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
