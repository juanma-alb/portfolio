"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useSectionObserver } from "@/hooks/useSectionObserver";

const navItems = [
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "skills", label: "Skills" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const openBtnRef = React.useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = React.useRef<HTMLAnchorElement | null>(null);
  const prefersReduced = useReducedMotion();
  // ids de secciones a observar
  const sectionIds = React.useMemo(
    () => ["skills", "sobre-mi", "proyectos", "experiencia", "contacto"],
    []
  );
  const activeSection = useSectionObserver(sectionIds);

  // Variants para la animación del contenedor del menú
  const menuVariants = React.useMemo(
    () =>
      prefersReduced
        ? {
          closed: { opacity: 0, pointerEvents: "none" as const },
          open: { opacity: 1, pointerEvents: "auto" as const },
        }
        : {
          closed: {
            opacity: 0,
            y: -12,
            scale: 0.98,
            filter: "blur(3px)",
            pointerEvents: "none" as const,
            transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
          },
          open: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            pointerEvents: "auto" as const,
            transition: {
              type: "spring",
              stiffness: 420,
              damping: 36,
              mass: 0.6,
              bounce: 0.12,
              when: "beforeChildren",
              staggerChildren: 0.035,
            },
          },
        },
    [prefersReduced]
  );

  // Variants para cada item
  const itemVariants = React.useMemo(
    () =>
      prefersReduced
        ? {
          closed: { opacity: 0 },
          open: { opacity: 1 },
        }
        : {
          closed: { opacity: 0, y: -8 },
          open: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 500, damping: 32 },
          },
        },
    [prefersReduced]
  );

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

  React.useEffect(() => {
    if (isOpen) queueMicrotask(() => firstLinkRef.current?.focus());
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/#hero"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground transition hover:text-primary"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            NA
          </span>
          <span>Juan Manuel Albino</span>
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
                  href={`/#${item.id}`}
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
          <div className="md:hidden">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setIsOpen((prev) => !prev)}
              ref={openBtnRef}
            >
              <span className="sr-only">{isOpen ? "Cerrar menú" : "Abrir menú"}</span>
              {isOpen ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
            </Button>

            {isOpen && (
              <motion.div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Menú de navegación"
                initial="closed"
                animate="open"
                variants={menuVariants}
                className="fixed inset-x-0 top-14 z-40 mx-2 rounded-2xl border bg-background/95 shadow-lg backdrop-blur md:hidden"
              >
                <motion.ul className="flex flex-col gap-2 p-4">
                  {sectionIds.map((id, idx) => {
                    const label =
                      id === "sobre-mi"
                        ? "Sobre mí"
                        : id.charAt(0).toUpperCase() + id.slice(1);
                    const isActive = activeSection === id;
                    return (
                      <motion.li key={id} variants={itemVariants}>
                        <Link
                          ref={idx === 0 ? firstLinkRef : undefined}
                          href={`/#${id}`}
                          aria-current={isActive ? "page" : undefined}
                          className={`block rounded-xl px-4 py-2 transition ${isActive ? "bg-primary/10" : "hover:bg-muted"
                            }`}
                          onClick={() => {
                            setIsOpen(false);
                            queueMicrotask(() => openBtnRef.current?.focus());
                          }}
                        >
                          {label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </motion.div>

            )}</div>
        </div>
      </div>
    </header>
  );
}
