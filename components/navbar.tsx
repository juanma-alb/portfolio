"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = React.useState<string>("hero");

  React.useEffect(() => {
    const sectionIds = ["hero", ...navItems.map((i) => i.id)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -40% 0px",
        threshold: [0.1, 0.5, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => sections.forEach((s) => observer.unobserve(s));
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href={{ pathname: "/", hash: "hero" }}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition hover:text-primary"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            NA
          </span>
          <span>Nombre Apellido</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Secciones principales">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Button
                key={item.id}
                asChild
                variant={isActive ? "default" : "ghost"}
                className="px-4"
              >
                <Link
                  href={{ pathname: "/", hash: item.id }}
                  className="text-sm"
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href={{ pathname: "/", hash: "contacto" }}>Contactar</Link>
          </Button>
          <ThemeToggle />
          <MobileMenu activeSection={activeSection} />
        </div>
      </div>
    </header>
  );
}

type MobileMenuProps = {
  activeSection: string;
};

function MobileMenu({ activeSection }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="sr-only">{isOpen ? "Cerrar menú" : "Abrir menú"}</span>
        {isOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="ml-auto flex h-full w-64 flex-col gap-6 border-l border-border bg-background px-6 py-8 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Navegación</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X aria-hidden className="h-5 w-5" />
                </Button>
              </div>

              <ul className="flex flex-col gap-3">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <Link
                        href={{ pathname: "/", hash: item.id }}
                        className="block rounded-full px-4 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                        aria-current={isActive ? "page" : undefined}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Button asChild size="lg" className="mt-auto">
                <Link href={{ pathname: "/", hash: "contacto" }} onClick={() => setIsOpen(false)}>
                  Contactar
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
