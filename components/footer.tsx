import type { ReactNode } from "react";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, Globe } from "lucide-react";

import { profile } from "@/content/profile";

const iconMap: Record<string, ReactNode> = {
  github: <Github className="h-4 w-4" aria-hidden />,
  linkedin: <Linkedin className="h-4 w-4" aria-hidden />,
  twitter: <Twitter className="h-4 w-4" aria-hidden />,
  website: <Globe className="h-4 w-4" aria-hidden />,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">{profile.name}</p>
          <p>{profile.location}</p>
          <Link
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 text-foreground transition hover:text-primary"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {profile.email}
          </Link>
        </div>
        <div className="flex flex-col items-start gap-3 md:items-end">
          <nav aria-label="Redes sociales">
            <ul className="flex flex-wrap items-center gap-3">
              {profile.socials.map((social) => (
                <li key={social.label}>
                  <Link
                    href={social.url}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition hover:border-primary hover:text-primary"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {iconMap[social.icon] ?? <Globe className="h-4 w-4" aria-hidden />}
                    <span>{social.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-xs text-muted-foreground">© {year} Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
