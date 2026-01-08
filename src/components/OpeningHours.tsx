import { Clock } from "lucide-react";

const hours = [
  { day: "Mandag", time: "10:00 – 18:00" },
  { day: "Tirsdag", time: "10:00 – 18:00" },
  { day: "Onsdag", time: "10:00 – 18:00" },
  { day: "Torsdag", time: "10:00 – 18:00" },
  { day: "Fredag", time: "10:00 – 18:00" },
  { day: "Lørdag", time: "10:00 – 16:00" },
  { day: "Søndag", time: "Stengt", closed: true },
];

const OpeningHours = () => {
  // Get current day (0 = Sunday, 1 = Monday, etc.)
  const today = new Date().getDay();
  const dayIndex = today === 0 ? 6 : today - 1; // Convert to our array index (0 = Monday)

  return (
    <section id="apningstider" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Header */}
          <div className="flex justify-center mb-6">
            <Clock className="w-12 h-12 text-accent" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Åpningstider
          </h2>
          <div className="decorative-line mb-12" />

          {/* Hours Table */}
          <div className="bg-card border border-border p-8 md:p-12">
            <ul className="space-y-4">
              {hours.map((item, index) => (
                <li
                  key={item.day}
                  className={`flex justify-between items-center font-body py-3 border-b border-border/50 last:border-0 transition-colors ${
                    index === dayIndex ? "bg-accent/10 -mx-4 px-4 rounded" : ""
                  }`}
                >
                  <span
                    className={`text-lg ${
                      index === dayIndex
                        ? "text-accent font-medium"
                        : "text-foreground"
                    }`}
                  >
                    {item.day}
                    {index === dayIndex && (
                      <span className="ml-2 text-xs uppercase tracking-wider bg-accent text-accent-foreground px-2 py-0.5 rounded">
                        I dag
                      </span>
                    )}
                  </span>
                  <span
                    className={`text-lg ${
                      item.closed
                        ? "text-muted-foreground"
                        : index === dayIndex
                        ? "text-accent font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpeningHours;
