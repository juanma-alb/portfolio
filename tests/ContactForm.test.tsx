import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";

describe("ContactForm", () => {
  beforeEach(() => {
    (global as any).fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("muestra errores de validación cuando se envía vacío", async () => {
    render(<ContactForm />);

    const submit = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submit);

    await screen.findByText(/ingresá tu nombre/i);
    expect(screen.getByText(/ingresá un email válido/i)).toBeInTheDocument();
    expect(screen.getByText(/al menos 10 caracteres/i)).toBeInTheDocument();
  });

  it("envía con éxito y muestra mensaje de confirmación", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, mocked: true }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "juan@example.com" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: "Este es un mensaje válido de prueba." },
    });

    const submit = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submit);

    await waitFor(() =>
      expect(screen.getByText(/¡mensaje enviado!/i)).toBeInTheDocument(),
    );

    expect((global as any).fetch).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Juan",
        email: "juan@example.com",
        message: "Este es un mensaje válido de prueba.",
      }),
    });
  });

  it("muestra error si la API devuelve status no-ok", async () => {
    (global as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Falla controlada" }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "juan@example.com" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), {
      target: { value: "Este es un mensaje válido de prueba." },
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() =>
      expect(screen.getByText(/falla controlada/i)).toBeInTheDocument(),
    );
  });
});