
import type { Profile } from "@/content/profile";
import type { Project } from "@/content/projects";


export function personSchema(profile: Profile, siteUrl: string) {
  const sameAs = profile.socials?.map((s) => s.url).filter(Boolean) ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    image: `${siteUrl}/api/og`,
    email: profile.email ? `mailto:${profile.email}` : undefined,
    sameAs,
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
