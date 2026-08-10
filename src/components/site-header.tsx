"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState, useSyncExternalStore } from "react";

import { nav, site } from "@/data/site";

/* The theme lives on <html data-theme>, which ThemeScript resolves before
   paint. Reading it with useSyncExternalStore rather than mirroring it into
   component state means there is exactly one source of truth and no effect
   that re-renders after hydration. */
function subscribeToTheme(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const readTheme = () =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

/* No DOM on the server. "light" matches the pre-hydration markup, and
   ThemeScript has already corrected the attribute by the time this mounts. */
const readThemeOnServer = () => "light" as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<"open" | "closed">("closed");
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, readThemeOnServer);

  // Close the mobile menu whenever the route changes. Adjusting state during
  // render is React's recommended alternative to a route-watching effect: it
  // re-renders before paint instead of after, so the menu never flashes open
  // on the new page.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu("closed");
  }

  const toggleTheme = useCallback(() => {
    const next = readTheme() === "dark" ? "light" : "dark";
    // Writing the attribute is what updates the UI — the MutationObserver
    // above picks it up and re-renders this button's label.
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("aj-theme", next);
    } catch {
      // Private browsing / storage disabled — the theme still applies for
      // this page view, it just won't persist.
    }
  }, []);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/" || base === "") return false;
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <header className="navbar" data-menu={menu}>
      <nav className="navinner" aria-label="Primary">
        <Link href="/" className="navbrand">
          {site.name}
        </Link>
        <button
          type="button"
          className="btn btn-secondary menubtn mono"
          style={{ fontSize: 12, letterSpacing: ".08em" }}
          onClick={() => setMenu((m) => (m === "open" ? "closed" : "open"))}
          aria-expanded={menu === "open"}
          aria-controls="primary-links"
        >
          MENU
        </button>
        <div className="navlinks" id="primary-links">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            className="btn btn-secondary mono"
            style={{ fontSize: 11, letterSpacing: ".08em", padding: "5px 9px" }}
            onClick={toggleTheme}
            title="Switch theme"
          >
            {theme === "dark" ? "LIGHT" : "DARK"}
          </button>
        </div>
      </nav>
    </header>
  );
}
