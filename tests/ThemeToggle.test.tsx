import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

function renderWithTheme(ui: React.ReactNode) {
  return render(
    <ThemeProvider attribute="class" storageKey="portfolio-theme" defaultTheme="light" enableSystem={false}>
      {ui}
    </ThemeProvider>,
  );
}

describe("ThemeToggle", () => {
  it("renderiza el botón y alterna entre light/dark", () => {
    renderWithTheme(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /cambiar tema/i });
    expect(btn).toBeInTheDocument();

    // Inicial: modo light (por defaultTheme)
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Toggle  dark
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    // Toggle  light
    fireEvent.click(btn);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("persiste la preferencia en localStorage", () => {
    
    window.localStorage.removeItem("portfolio-theme");

    renderWithTheme(<ThemeToggle />);
    const btn = screen.getByRole("button", { name: /cambiar tema/i });

    // Cambiar a dark guarda 'dark'
    fireEvent.click(btn);
    expect(window.localStorage.getItem("portfolio-theme")).toBe("dark");

    // Volver a light guarda 'light'
    fireEvent.click(btn);
    expect(window.localStorage.getItem("portfolio-theme")).toBe("light");
  });
});