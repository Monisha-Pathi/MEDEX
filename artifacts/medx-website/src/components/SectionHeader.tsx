interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({ eyebrow, title, subtitle, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      {eyebrow && (
        <div className={`text-xs font-bold uppercase tracking-widest mb-3 ${light ? "text-secondary" : "text-secondary"}`}>
          {eyebrow}
        </div>
      )}
      <h2 className={`text-3xl md:text-4xl font-bold leading-tight mb-4 font-serif ${light ? "text-primary-foreground" : "text-primary"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg max-w-2xl leading-relaxed ${centered ? "mx-auto" : ""} ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
