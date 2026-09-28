"use client";

/** Opens the browser's print dialog, which saves the resume page as a PDF. */
export function PrintButton() {
  return (
    <button
      type="button"
      className="btn btn-secondary mono no-print"
      style={{ fontSize: 12, letterSpacing: ".06em", padding: "8px 14px" }}
      onClick={() => window.print()}
    >
      SAVE AS PDF
    </button>
  );
}
