"use client";

import { motion } from "framer-motion";

import { Project } from "@/content/projects";

import { ProjectCard } from "./ProjectCard";

export type ProjectsGridProps = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const orderedProjects = [...projects].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
    >
      {orderedProjects.map((project) => (
        <motion.div key={project.slug} variants={itemVariants}>
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};
