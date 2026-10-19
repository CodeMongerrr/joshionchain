/**
 * The two system diagrams, ported verbatim from the design.
 *
 * They're inline SVG rather than images on purpose: they inherit currentColor,
 * so they re-tint correctly in both themes, they stay crisp at any zoom, and
 * they carry a real text alternative for screen readers instead of alt text
 * approximating a picture.
 */

export function BharatTruckTopology() {
  return (
    <figure style={{ margin: 0 }}>
      <figcaption className="figcap">Fig. 01 · service topology</figcaption>
      <svg
        viewBox="0 0 340 196"
        width="100%"
        role="img"
        aria-label="Diagram: a progressive web app and an internal operations console sit above an API gateway, which fronts seven independently deployable services."
      >
        <g className="dg">
          <rect x="6" y="4" width="160" height="26" />
          <rect x="174" y="4" width="160" height="26" />
          <path d="M86 30v14M254 30v14" />
          <path d="M170 70v14M58 84h224M58 84v8M170 84v8M282 84v8" />
          <rect x="6" y="92" width="104" height="28" />
          <rect x="118" y="92" width="104" height="28" />
          <rect x="230" y="92" width="104" height="28" />
          <rect x="6" y="128" width="104" height="28" />
          <rect x="118" y="128" width="104" height="28" />
          <rect x="230" y="128" width="104" height="28" />
          <rect x="118" y="164" width="104" height="28" />
        </g>
        <g className="dga">
          <rect x="6" y="44" width="328" height="26" />
        </g>
        <g className="dgt" textAnchor="middle">
          <text x="86" y="21">web app</text>
          <text x="254" y="21">ops console</text>
          <text x="170" y="61" style={{ opacity: 1 }}>API gateway</text>
          <text x="58" y="110">auth</text>
          <text x="170" y="110">booking</text>
          <text x="282" y="110">pricing</text>
          <text x="58" y="146">payments</text>
          <text x="170" y="146">fleet</text>
          <text x="282" y="146">cargo ledger</text>
          <text x="170" y="182">live tracking</text>
        </g>
      </svg>
      <p className="mono dimmer" style={{ fontSize: 12, lineHeight: 1.4, margin: "10px 0 0" }}>
        Kubernetes · containerized builds · CI verifies deploys serve traffic
      </p>
    </figure>
  );
}

export function Diagram({ kind }: { kind?: string }) {
  if (kind === "bharattruck-topology") return <BharatTruckTopology />;
  return null;
}
