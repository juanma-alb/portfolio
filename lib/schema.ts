import type { Profile, Project } from "@/content/profile";

export const buildPersonSchema = (profile: Profile) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: profile.website,
  image: profile.avatar,
  sameAs: profile.socials?.map((social) => social.url) ?? [],
  worksFor: profile.currentCompany
    ? {
        "@type": "Organization",
        name: profile.currentCompany,
      }
    : undefined,
  description: profile.shortBio,
  email: profile.email,
  knowsAbout: profile.skills?.core ?? [],
});

export const buildProjectsSchema = (projects: Project[]) =>
  projects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    url: project.links?.demo ?? project.links?.github ?? profileFallbackUrl,
    image: project.image?.src,
    dateCreated: project.year,
    keywords: project.tags,
  }));

const profileFallbackUrl = "https://portfolio.dev";
