import { render, screen } from "@testing-library/react";

import { ProjectCard } from "@/components/ProjectCard";
import { Project } from "@/content/projects";

const baseProject: Project = {
  slug: "sample",
  title: "Sample Project",
  description: "Descripción breve del proyecto.",
  stack: ["React", "TypeScript"],
  tags: ["Demo"],
  image: { src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>", alt: "Preview" },
  links: {
    github: "https://github.com/example/sample",
    demo: "https://sample.dev",
  },
};

describe("ProjectCard", () => {
  it("muestra título, stack y enlaces externos", () => {
    render(<ProjectCard project={baseProject} />);

    expect(screen.getByRole("heading", { name: baseProject.title })).toBeInTheDocument();
    baseProject.stack.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });

    const githubLink = screen.getByRole("link", { name: `Abrir GitHub de ${baseProject.title}` });
    const demoLink = screen.getByRole("link", { name: `Ver demo de ${baseProject.title}` });

    expect(githubLink).toHaveAttribute("href", baseProject.links?.github);
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", expect.stringContaining("noreferrer"));

    expect(demoLink).toHaveAttribute("href", baseProject.links?.demo);
    expect(demoLink).toHaveAttribute("target", "_blank");
    expect(demoLink).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
