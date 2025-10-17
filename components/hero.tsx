"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { profile } from "@/content/profile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


const initials =
  profile.name?.split(" ").map((p) => p[0]).join("") || "NA";

const avatarPlaceholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='320' viewBox='0 0 320 320'%3E%3Crect width='320' height='320' rx='48' fill='%23222'/%3E%3Ctext x='50%25' y='54%25' font-family='Inter, Arial' font-size='56' fill='%23fff' text-anchor='middle'%3E${encodeURIComponent(
  initials,
)}%3C/text%3E%3C/svg%3E`;

export function Hero() {
  const [imageSrc, setImageSrc] = React.useState(() =>
    profile.avatar && profile.avatar.trim() !== "" ? profile.avatar : avatarPlaceholder,
  );

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-16 sm:px-6 md:flex-row md:items-center md:justify-between"
      >
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground shadow-sm backdrop-blur">
            Disponible para oportunidades
          </div>

          <h1 id="hero-heading" className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>

          <p className="text-lg font-semibold text-muted-foreground">{profile.role}</p>

          <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.shortBio}
          </p>

          <div className="flex flex-wrap gap-2">
            {profile.skills.core.slice(0, 5).map((skill) => (
              <Badge key={skill} variant="subtle" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button asChild size="lg">
              <Link href="#proyectos">Ver proyectos</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#contacto">Contactar</Link>
            </Button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto flex h-72 w-72 max-w-full items-center justify-center rounded-[2.5rem] border border-border/60 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-3 shadow-xl"
        >
          <div
            className="absolute -inset-2 rounded-[2.75rem] bg-gradient-to-br from-primary/30 via-transparent to-transparent blur-2xl"
            aria-hidden
          />

          <Image
            src={imageSrc}
            alt={`Retrato de ${profile.name}`}
            width={320}
            height={320}
            className="relative h-full w-full rounded-[2rem] object-cover"
            priority
            placeholder="blur"
            blurDataURL={avatarPlaceholder}
            onError={() => setImageSrc(avatarPlaceholder)}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
