import * as React from "react";

export function useSectionObserver(sectionIds: string[]) {
  const [activeId, setActiveId] = React.useState<string>(sectionIds[0] ?? "");
  React.useEffect(() => {
    // si cambia el listado, reseteamos al primero para no quedar en un id inexistente
    if (sectionIds.length > 0 && !sectionIds.includes(activeId)) {
      setActiveId(sectionIds[0] ?? "");
    }
  }, [sectionIds, activeId]);

  React.useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // tomamos la que tenga mayor intersección y esté entrando
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
          return;
        }

        // fallback: si ninguna intersecta, buscamos la más cercana por arriba
        const scrollY = window.scrollY;
        let closest: { id: string; delta: number } | null = null;
        for (const el of elements) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          const delta = Math.abs(scrollY - top);
          if (closest == null || delta < closest.delta) {
            closest = { id: el.id, delta };
          }
        }
        if (closest?.id) setActiveId(closest.id);
      },
      {
        // que dispare un poco antes de que el bloque ocupe viewport
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]); // array estable: el que viene del caller (memoizado)

  return activeId;
}
