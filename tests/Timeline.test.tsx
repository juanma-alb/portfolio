import { render, screen } from "@testing-library/react";

import { Timeline } from "@/components/Timeline";
import { TimelineItem } from "@/content/experience";

const timelineItems: TimelineItem[] = [
  {
    title: "Rol Actual",
    organization: "Org Uno",
    start: "2024-03",
    achievements: ["Logro actual"],
  },
  {
    title: "Rol Pasado",
    organization: "Org Dos",
    start: "2023-01",
    end: "2023-12",
    achievements: ["Logro pasado", "Otro logro"],
  },
];

describe("Timeline", () => {
  it("ordena elementos y muestra fechas formateadas", () => {
    const { container } = render(<Timeline items={timelineItems} />);

    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings[0]).toHaveTextContent("Rol Actual");
    expect(headings[1]).toHaveTextContent("Rol Pasado");

    const times = container.querySelectorAll("time");
    expect(times[0]).toHaveAttribute("dateTime", "2024-03");
    expect(times[1]).toHaveAttribute("dateTime", "2023-01");

    expect(screen.getByText("Actual")).toBeInTheDocument();
    expect(screen.getByText("Logro pasado")).toBeInTheDocument();
  });
});
