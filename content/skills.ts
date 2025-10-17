export type SkillCategory = { title: string; skills: string[] };

export const skills: {
  core: SkillCategory;
  tools: SkillCategory;
  interests: SkillCategory;
} = {
  core: {
    title: "Core",
    skills: ["TypeScript", "React", "Next.js", "Node.js", ".NET"],
  },
  tools: {
    title: "Herramientas",
    skills: ["Git", "Vercel", "Jest", "ESLint", "Prisma/EF"],
  },
  interests: {
    title: "Intereses",
    skills: ["Maps", "AI helpers", "DX"],
  },
};
