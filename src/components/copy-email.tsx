"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Copies the address instead of opening a mail app. A mailto link does
 * nothing at all on a desktop with no mail client set up, which is most of
 * them, so this is the button that always works.
 *
 * The Clipboard API is tried first. Some in-app browsers (LinkedIn's, for
 * one, which is where a lot of recruiters open links) leave that promise
 * pending forever instead of rejecting it, so it gets 600ms before the old
 * textarea route takes over. The label says what actually happened, and the
 * button is a live region so screen readers hear it too.
 */
export function CopyEmail({
  email,
  className = "btn btn-secondary",
  style,
}: {
  email: string;
  className?: string;
  style?: CSSProperties;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = window.setTimeout(() => setState("idle"), 2500);
    return () => window.clearTimeout(t);
  }, [state]);

  const copy = async () => {
    let ok = false;
    if (navigator.clipboard?.writeText) {
      ok = await Promise.race([
        navigator.clipboard.writeText(email).then(
          () => true,
          () => false,
        ),
        new Promise<boolean>((resolve) => window.setTimeout(() => resolve(false), 600)),
      ]);
    }
    if (!ok) ok = legacyCopy(email);
    setState(ok ? "copied" : "failed");
  };

  return (
    <button type="button" className={className} style={style} onClick={copy} aria-live="polite">
      {state === "copied" ? "Copied" : state === "failed" ? "Select it to copy" : "Copy email"}
    </button>
  );
}

function legacyCopy(text: string) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.appendChild(ta);
  ta.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  ta.remove();
  return ok;
}
