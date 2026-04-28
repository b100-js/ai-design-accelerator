import { ReactNode } from "react";

interface SlideProps {
  children: ReactNode;
  active: boolean;
}

export function Slide({ children, active }: SlideProps) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-700 ease-out ${
        active
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {children}
    </div>
  );
}
