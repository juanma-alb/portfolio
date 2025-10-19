"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const isDataSvg = (src: string) => src.startsWith("data:image/svg+xml");
const isLocalPath = (src: string) => src.startsWith("/") && !src.startsWith("//");

export type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, stack, tags, links, image } = project;
  const canRenderImage = image && (isDataSvg(image.src) || isLocalPath(image.src));

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/80 shadow-sm backdrop-blur"
    >
      {canRenderImage ? (
        <figure className="relative aspect-[3/2] overflow-hidden border-b border-border/60 bg-muted/40">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
            priority={Boolean(project.featured)}
          />
          <figcaption className="sr-only">{image.alt}</figcaption>
        </figure>
      ) : (
        <div
          className="aspect-[3/2] border-b border-border/60 bg-gradient-to-br from-muted/40 via-muted/20 to-muted/40"
          aria-hidden
        />
      )}

      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {project.featured && (
              <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1">Destacado</span>
            )}
            {tags?.map((tag) => (
              <Badge key={tag} variant="subtle">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {stack.map((tech) => (
            <Badge key={tech} variant="outline" className="border-border/60 bg-background/60">
              {tech}
            </Badge>
          ))}
        </div>

        {links && (links.github || links.demo) ? (
          <div className="mt-auto flex flex-wrap gap-3">
            {links.github ? (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir GitHub de ${title}`}
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "rounded-full")}
              >
                Código
              </a>
            ) : null}
            {links.demo ? (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver demo de ${title}`}
                className={cn(buttonVariants({ size: "sm" }), "rounded-full")}
              >
                Demo
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
