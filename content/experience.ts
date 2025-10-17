export type TimelineItem = {
  title: string;
  organization?: string;
  start: string;
  end?: string;
  achievements?: string[];
};

export const experience: TimelineItem[] = [
  {
    title: "Full Stack Developer Jr",
    organization: "Proyecto GUSTO",
    start: "2025-01",
    achievements: [
      "Integración mapas y registro de restaurantes",
      "API con validaciones y tests",
    ],
  },
  {
    title: "Frontend Developer Trainee",
    organization: "Comunidad Atlas Insights",
    start: "2024-05",
    end: "2024-12",
    achievements: [
      "Implementación de dashboards responsivos",
      "Automatización de despliegues con CI/CD",
    ],
  },
  {
    title: "Asistente Académico",
    organization: "Universidad Creativa",
    start: "2023-03",
    end: "2024-02",
    achievements: [
      "Tutorías de lógica de programación",
      "Soporte en talleres de desarrollo web",
    ],
  },
];
