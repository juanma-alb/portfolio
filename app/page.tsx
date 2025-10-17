import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { ContactForm } from "@/components/ContactForm";
import { Timeline } from "@/components/Timeline";
import { SkillCategory } from "@/components/SkillCategory";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { skills as skillsData } from "@/content/skills";
import { profile } from "@/content/profile";

export default function Home() {
  return (
    
<main id="main" className="flex-1 bg-background">
      <Hero />

      <section
        id="proyectos"
        aria-labelledby="proyectos-heading"
        className="border-b border-border/60 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
          <h2 id="proyectos-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Proyectos
          </h2>
          <ProjectsGrid projects={projects} />
        </div>
      </section>

      <section
        id="experiencia"
        aria-labelledby="experiencia-heading"
        className="border-b border-border/60 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
          <h2 id="experiencia-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Experiencia
          </h2>
          <Timeline items={experience} />
        </div>
      </section>

      <section
        id="skills"
        aria-labelledby="skills-heading"
        className="border-b border-border/60 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl space-y-8 px-4 sm:px-6">
          <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Skills
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <SkillCategory title={skillsData.core.title} skills={skillsData.core.skills} />
            <SkillCategory title={skillsData.tools.title} skills={skillsData.tools.skills} />
            <SkillCategory title={skillsData.interests.title} skills={skillsData.interests.skills} />
          </div>
        </div>
      </section>

      <section
        id="about"
        aria-labelledby="about-heading"
        className="border-b border-border/60 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl space-y-4 px-4 sm:px-6">
          <h2 id="about-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Sobre mí
          </h2>
          <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{profile.about}</p>
       </div>
      </section>

      <section
        id="contacto"
        aria-labelledby="contacto-heading"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl space-y-6 px-4 sm:px-6">
          <h2 id="contacto-heading" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Contacto
          </h2>
          <p className="max-w-2xl text-sm text-muted-foreground sm:text-base">
            Completá el formulario y te responderé a la brevedad.
          </p>
          <ContactForm />
        </div>
      </section>
    </main>



      );
}
