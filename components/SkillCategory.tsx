import { SkillCategory as SkillCategoryType } from "@/content/skills";
import { Badge } from "@/components/ui/badge";

export type SkillCategoryProps = SkillCategoryType;

export function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
      <h3 className="text-lg font-semibold tracking-tight text-foreground">{title}</h3>
      <ul className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li key={skill}>
            <Badge variant="outline" className="border-border/60 bg-background/60 text-sm">
              {skill}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}
