import type { Project } from "@/content/projects";


export function personSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Juan Manuel Albino",
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    jobTitle: "Full-Stack Developer Jr",
  };
}

export function projectSchema(project: Project, siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    description: project.description,
    url: siteUrl, // homepage; reemplazar por la URL del proyecto si existe una ruta dedicada
    keywords: project.tags ?? [],
    programmingLanguage: project.stack?.join(", "),
    isAccessibleForFree: true,
    sameAs: [
      ...(project.links?.github ? [project.links.github] : []),
      ...(project.links?.demo ? [project.links.demo] : []),
    ],
  };
}