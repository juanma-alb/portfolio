export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  tags?: string[];
  image?: { src: string; alt: string };
  links?: { github?: string; demo?: string };
  featured?: boolean;
};

const svgPlaceholder = encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="480" height="320" viewBox="0 0 480 320">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#111827" />
        <stop offset="100%" stop-color="#1f2937" />
      </linearGradient>
    </defs>
    <rect width="480" height="320" rx="24" fill="url(#grad)" />
    <text x="50%" y="48%" fill="#a5b4fc" font-family="Inter, Arial" font-size="32" text-anchor="middle">Project</text>
    <text x="50%" y="65%" fill="#d1d5db" font-family="Inter, Arial" font-size="18" text-anchor="middle">Preview</text>
  </svg>
`);

const imageSrc = `data:image/svg+xml,${svgPlaceholder}`;

export const projects: Project[] = [
  {
    slug: "gusto",
    title: "GUSTO — App social de restaurantes",
    description: "Organizador de salidas y recomendaciones por gustos.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Node"],
    tags: ["Maps", "Auth"],
    image: { src: imageSrc, alt: "Preview GUSTO" },
    links: {
      github: "https://github.com/usuario/gusto",
      demo: "https://gusto.app/demo",
    },
    featured: true,
  },
  {
    slug: "atlas-insights",
    title: "Atlas Insights",
    description: "Dashboard analítico para explorar datos operativos en tiempo real.",
    stack: ["Next.js", "tRPC", "PostgreSQL", "Tailwind"],
    tags: ["Analytics", "Realtime"],
    image: { src: imageSrc, alt: "Preview Atlas" },
    links: {
      github: "https://github.com/usuario/atlas-insights",
    },
  },
  {
    slug: "colectivo",
    title: "Colectivo",
    description: "Plataforma colaborativa para equipos que organizan hackatones.",
    stack: ["React", "TypeScript", "Firebase"],
    tags: ["Collaboration"],
    image: { src: imageSrc, alt: "Preview Colectivo" },
    links: {
      demo: "https://colectivo.app",
    },
    featured: true,
  },
  {
    slug: "folio-maker",
    title: "FolioMaker",
    description: "Generador de portfolios con bloques personalizables y deploy automático.",
    stack: ["Next.js", "Prisma", "PlanetScale"],
    tags: ["SaaS", "CLI"],
    image: { src: imageSrc, alt: "Preview FolioMaker" },
  },
];
