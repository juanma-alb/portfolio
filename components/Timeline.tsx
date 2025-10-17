import { TimelineItem } from "@/content/experience";

function formatMonth(value: string) {
  const [yearPart, monthPart] = value.split("-");
  const year = Number(yearPart);
  const month = Number(monthPart ?? "1");
  const date = new Date(year, Math.max(0, month - 1), 1);
  return new Intl.DateTimeFormat("es", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export type TimelineProps = {
  items: TimelineItem[];
};

export function Timeline({ items }: TimelineProps) {
  const orderedItems = [...items].sort((a, b) => (a.start < b.start ? 1 : -1));

  return (
    <ol className="relative space-y-8 border-l border-border/60 pl-6">
      {orderedItems.map((item) => {
        const startLabel = formatMonth(item.start);
        const endLabel = item.end ? formatMonth(item.end) : "Actual";

        return (
          <li key={`${item.title}-${item.start}`} className="relative space-y-3">
            <span
              className="absolute -left-[37px] mt-1 h-3 w-3 rounded-full border-2 border-background bg-primary"
              aria-hidden
            />
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                <time dateTime={item.start}>{startLabel}</time>
                <span aria-hidden className="px-1 text-muted-foreground/70">
                  ·
                </span>
                {item.end ? <time dateTime={item.end}>{endLabel}</time> : <span>{endLabel}</span>}
              </p>
              <h3 className="text-xl font-semibold tracking-tight text-foreground">
                {item.title}
                {item.organization ? (
                  <span className="ml-2 text-base font-normal text-muted-foreground">{item.organization}</span>
                ) : null}
              </h3>
            </div>
            {item.achievements?.length ? (
              <ul className="space-y-2 text-sm text-muted-foreground">
                {item.achievements.map((achievement) => (
                  <li key={achievement} className="leading-relaxed">
                    {achievement}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
