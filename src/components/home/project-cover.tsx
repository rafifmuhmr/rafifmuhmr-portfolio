export function ProjectCover({title, label}: {title: string; label: string}) {
  return <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-muted px-6 text-center">
    <span className="text-xl font-medium tracking-tight text-muted-foreground">{title}</span>
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>;
}
