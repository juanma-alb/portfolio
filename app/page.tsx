import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const sections = [
  { id: "proyectos", title: "Proyectos" },
  { id: "experiencia", title: "Experiencia" },
  { id: "skills", title: "Skills" },
  { id: "about", title: "Sobre mí" },
  { id: "contacto", title: "Contacto" },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <div className="bg-muted/20 py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 sm:px-6">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="scroll-mt-24 rounded-3xl border border-border/60 bg-background/80 p-8 shadow-sm backdrop-blur"
              >
                <div className="space-y-3">
                  <h2 id={`${section.id}-heading`} className="text-2xl font-semibold tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Contenido en construcción para la sección {section.title.toLowerCase()}.
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
