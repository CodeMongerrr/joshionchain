import type { ReactNode } from "react";

/** The four registration marks that sit outside a framed box. */
export function Corners() {
  return (
    <>
      <i className="corner tl" />
      <i className="corner tr" />
      <i className="corner bl" />
      <i className="corner br" />
    </>
  );
}

export function Frame({
  children,
  className = "",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}) {
  return (
    <As className={`frame ${className}`.trim()}>
      <Corners />
      {children}
    </As>
  );
}

export function TagRow({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <div className={`tagrow ${className}`.trim()}>
      {items.map((t) => (
        <span className="t" key={t}>
          {t}
        </span>
      ))}
    </div>
  );
}

export function Evidence({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <div className={`ev ${className}`.trim()}>
      {items.map((e) => (
        <span key={e}>{e}</span>
      ))}
    </div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return <span className="kick">{children}</span>;
}
