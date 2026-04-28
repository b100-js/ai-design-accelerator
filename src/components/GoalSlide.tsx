interface KPI {
  label: string;
}

interface GoalSlideProps {
  number: string;
  title: string;
  description: string;
  kpis: KPI[];
  note?: string;
}

export function GoalSlide({ number, title, description, kpis, note }: GoalSlideProps) {
  return (
    <div className="h-full w-full flex flex-col justify-between p-10 md:p-16 lg:p-20">
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-white/20">
          <span className="text-2xl md:text-3xl font-semibold text-white tabular-nums leading-none">
            {number}
          </span>
          <span className="text-xs font-mono tracking-[0.2em] text-white/70 uppercase">
            / 03 · Cel
          </span>
        </div>
        <div className="h-px flex-1 bg-gradient-accent-line opacity-80" />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-5xl">
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] mb-8">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
          {description}
        </p>
        {note && (
          <p className="text-sm text-muted-foreground/70 mt-4 italic">{note}</p>
        )}
      </div>

      {/* KPIs */}
      <div>
        <div className="text-xs font-mono tracking-[0.25em] text-muted-foreground uppercase mb-5">
          KPI
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kpis.map((kpi, i) => (
            <div
              key={i}
              className="glass rounded-xl p-5 hover:border-white/20 transition-all duration-300 group"
            >
              <div className="flex items-start gap-3">
                <div className="text-xs font-mono text-muted-foreground mt-1">
                  0{i + 1}
                </div>
                <div className="text-base md:text-lg text-foreground/90 leading-snug">
                  {kpi.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
