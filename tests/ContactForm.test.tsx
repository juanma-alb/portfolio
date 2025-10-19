import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";

describe("ContactForm", () => {
  type FetchMock = jest.MockedFunction<typeof fetch>;
  let fetchMock: FetchMock;

  beforeEach(() => {
    // Creamos un mock tipado y lo asignamos a global.fetch
    fetchMock = jest.fn() as unknown as FetchMock;
  // Asignación tipada de fetch al objeto global para los tests
  (global as unknown as { fetch: typeof fetch }).fetch = fetchMock;
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
    const okResponse = {
      ok: true,
      json: async () => ({ ok: true, mocked: true }),
    } satisfies Pick<Response, "ok" | "json">;
    fetchMock.mockResolvedValue(okResponse as unknown as Response);

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

    expect(fetchMock).toHaveBeenCalledWith("/api/contact", {
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
    const failResponse = {
      ok: false,
      json: async () => ({ error: "Falla controlada" }),
    } satisfies Pick<Response, "ok" | "json">;
    fetchMock.mockResolvedValue(failResponse as unknown as Response);

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