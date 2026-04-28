import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Slide } from "@/components/Slide";
import { GoalSlide } from "@/components/GoalSlide";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "2026 Cele Indywidualne — Design" },
      { name: "description", content: "Prezentacja indywidualnych celów na 2026 rok." },
    ],
  }),
  component: Index,
});

const goals = [
  {
    number: "01",
    title: "Wykorzystywanie AI do szybszego projektowania",
    description:
      "Używać AI do tworzenia wariantów, prototypowania i dokumentacji.",
    kpis: [
      { label: "skrócenie czasu wariantów o X%" },
      { label: "liczba projektów wspartych AI" },
      { label: "liczba wariantów z AI" },
    ],
  },
  {
    number: "02",
    title: "Odbudowa design systemu*",
    description:
      "Stworzyć DS dla premium + optymalizacja/dokumentacja pod narzędzia AI",
    kpis: [
      { label: "liczba komponentów w nowym DS" },
      { label: "adoption rate DS w projektach" },
    ],
  },
  {
    number: "03",
    title: "Rozwijanie produktu na podstawie analizy i researchu",
    description:
      "Proponować usprawnienia oparte na danych i researchu.",
    kpis: [
      { label: "liczba analiz/deep dive’ów" },
      { label: "liczba insightów w projektach" },
      { label: "liczba przesłanych inicjatyw i feedback do nich" },
    ],
  },
];

const totalSlides = goals.length + 1; // intro + goals

function Index() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => Math.min(c + 1, totalSlides - 1)),
    []
  );
  const prev = useCallback(() => setCurrent((c) => Math.max(c - 1, 0)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        setCurrent(0);
      } else if (e.key === "End") {
        setCurrent(totalSlides - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-background flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full max-w-[1400px] aspect-[16/9] rounded-2xl overflow-hidden bg-gradient-brand shadow-glow border border-white/5">
        {/* Subtle grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        {/* Intro */}
        <Slide active={current === 0}>
          <div className="h-full w-full flex flex-col justify-end p-10 md:p-16 lg:p-20">
            <div className="text-sm font-mono tracking-[0.25em] text-white/50 uppercase mb-6">
              Cele indywidualne
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95] text-white max-w-4xl">
              2026 Cele
              <br />
              indywidualne - Bartek
            </h1>
            <div className="mt-10 flex items-center gap-3 text-white/50 text-sm">
              <span>Design Team</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span>28.04.2026</span>
            </div>
          </div>
        </Slide>

        {/* Goals */}
        {goals.map((g, i) => (
          <Slide key={g.number} active={current === i + 1}>
            <GoalSlide {...g} />
          </Slide>
        ))}

        {/* Outro */}
        <Slide active={current === totalSlides - 1}>
          <div className="h-full w-full flex flex-col justify-center items-center p-10 text-center">
            <div className="text-sm font-mono tracking-[0.25em] text-white/50 uppercase mb-6">
              Dziękuję
            </div>
            <h2 className="text-5xl md:text-7xl font-semibold tracking-tight leading-tight text-gradient max-w-4xl">
              Pytania?
            </h2>
            <p className="text-lg text-white/60 mt-8 max-w-xl">
              Otwarci na dyskusję, doprecyzowanie KPI i ustalenie priorytetów.
            </p>
          </div>
        </Slide>

        {/* Bottom UI: progress + nav */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-center justify-between gap-6 z-10">
          {/* Slide dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slajd ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Counter + nav */}
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-white/50 tabular-nums">
              {String(current + 1).padStart(2, "0")} /{" "}
              {String(totalSlides).padStart(2, "0")}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                disabled={current === 0}
                className="glass w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Poprzedni slajd"
              >
                ←
              </button>
              <button
                onClick={next}
                disabled={current === totalSlides - 1}
                className="glass w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 transition disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Następny slajd"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
