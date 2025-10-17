import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

jest.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    resolvedTheme: "light",
    setTheme: jest.fn(),
  }),
}));

import { Navbar } from "@/components/navbar";

beforeAll(() => {
  type ObserverEntry = { isIntersecting: boolean; target: { id: string } };
  type ObserverCallback = (entries: ObserverEntry[], observer: IntersectionObserverMock) => void;

  class IntersectionObserverMock {
    callback: ObserverCallback;
    constructor(callback: ObserverCallback) {
      this.callback = callback;
    }
    observe() {
      // simula intersección inmediata para el hero
      this.callback([{ isIntersecting: true, target: { id: "hero" } }], this);
    }
    unobserve() {}
    disconnect() {}
    takeRecords(): ObserverEntry[] {
      return [];
    }
  }

  // @ts-expect-error global assignment para el entorno de test
  global.IntersectionObserver = IntersectionObserverMock;
});

describe("Navbar", () => {
  it("renderiza enlaces y CTA", () => {
    render(<Navbar />);

    const links = [
      "Proyectos",
      "Experiencia",
      "Skills",
      "Sobre mí",
      "Contacto",
    ];

    links.forEach((label) => {
      expect(screen.getAllByRole("link", { name: label })[0]).toBeInTheDocument();
    });

    expect(screen.getAllByRole("link", { name: "Contactar" })[0]).toBeInTheDocument();
  });

  it("muestra toggle de tema y abre menú móvil", () => {
    render(<Navbar />);

    expect(screen.getByRole("button", { name: /alternar tema/i })).toBeVisible();

    const toggleMenu = screen.getByRole("button", { name: "Abrir menú" });
    fireEvent.click(toggleMenu);
    expect(screen.getByRole("dialog", { name: "Menú de navegación" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Cerrar menú" }));
    expect(screen.queryByRole("dialog", { name: "Menú de navegación" })).not.toBeInTheDocument();
  });
});
