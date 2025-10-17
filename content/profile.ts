export type SocialLink = {
  label: string;
  url: string;
  icon: string;
};

export type Project = {
  id: string;
  title: string;
  summary: string;
  year: string;
  stack: string[];
  tags: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  links?: {
    github?: string;
    demo?: string;
  };
};

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  start: string;
  end?: string;
  achievements: string[];
};

export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  start: string;
  end: string;
  achievements?: string[];
};

export type SkillSection = {
  title: string;
  items: string[];
};

export type Profile = {
  name: string;
  role: string;
  shortBio: string;
  about: string;
  email: string;
  website: string;
  location: string;
  avatar: string;
  resumeUrl?: string;
  currentCompany?: string;
  socials: SocialLink[];
  skills: {
    core: string[];
    tools: string[];
    interests: string[];
  };
  projects: Project[];
  experience: ExperienceItem[];
  education: EducationItem[];
};

export const profile: Profile = {
  name: "Juan Manuel Albino",
  role: "Desarrollador Full-Stack",
  shortBio:
    "Diseño y construyo experiencias web performantes con foco en DX, accesibilidad y negocios.",
  about:
    "Soy un desarrollador frontend con pasión por crear productos digitales que generen impacto medible. Me entusiasma colaborar con equipos multifuncionales, experimentar con nuevas tecnologías y mantener altos estándares de calidad.",
  email: "juanmanuelalbino01@gmail.com",
  website: "https://portfolio-juan-alb.vercel.app/",
  location: "Buenos Aires, Argentina",
  avatar: "/images/avatar.jpg",
  resumeUrl: "https://portfolio.dev/cv.pdf",
  currentCompany: "Startup Ejemplo",
  socials: [
    { label: "GitHub", url: "https://github.com/juanma-alb", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/usuario", icon: "linkedin" },
  ],
  skills: {
    core: ["React", "Next.js", "TypeScript", "Node.js", "Accessibility"],
    tools: ["Tailwind CSS", "shadcn/ui", "Framer Motion", "Jest", "Testing Library"],
    interests: ["DX", "Microfrontends", "Web Performance", "UI Animations"],
  },
  projects: [
    {
      id: "project-1",
      title: "Proyecto Destacado",
      summary:
        "Aplicación SaaS que optimiza flujos de trabajo para equipos remotos con métricas en tiempo real.",
      year: "2024",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
      tags: ["SaaS", "Performance", "Analytics"],
      image: {
        src: "/images/projects/proyecto-1.jpg",
        alt: "Captura del proyecto destacado",
        width: 1280,
        height: 832,
      },
      links: {
        github: "https://github.com/usuario/proyecto-destacado",
        demo: "https://proyecto-destacado.vercel.app",
      },
    },
  ],
  experience: [
    {
      id: "exp-1",
      title: "Senior Front-end Engineer",
      company: "Startup Ejemplo",
      start: "Mar 2022",
      achievements: [
        "Incrementé la conversión de onboarding un 23% optimizando el flujo y la performance.",
        "Lideré la migración a Next.js 15 con App Router y arquitectura modular.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "Licenciatura en Sistemas",
      institution: "Universidad de la Ciudad",
      start: "2015",
      end: "2019",
      achievements: ["Promedio 8.7", "Tesis orientada a Web Performance"],
    },
  ],
};
