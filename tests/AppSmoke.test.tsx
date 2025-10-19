import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("App smoke test", () => {
  it("renderiza encabezados principales sin explotar", () => {
    // Render directo del componente de página
    render(<Home />);
    expect(screen.getByRole("heading", { name: /proyectos/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /experiencia/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /skills/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /sobre mí/i })).toBeInTheDocument();
  });
});