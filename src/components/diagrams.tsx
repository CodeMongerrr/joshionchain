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
      <figcaption className="figcap">Fig. 01 — service topology</figcaption>
      <svg
        viewBox="0 0 340 196"
        width="100%"
        role="img"
        aria-label="Diagram: a progressive web app and an internal operations console sit above an API gateway, which fronts nine independently deployable services."
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
          <rect x="62" y="164" width="104" height="28" />
          <rect x="174" y="164" width="104" height="28" strokeDasharray="4 4" />
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
          <text x="114" y="182">live tracking</text>
          <text x="226" y="182">+ 2 services</text>
        </g>
      </svg>
      <p className="mono dimmer" style={{ fontSize: 12, lineHeight: 1.4, margin: "10px 0 0" }}>
        Kubernetes · containerized builds · CI verifies deploys serve traffic
      </p>
    </figure>
  );
}

export function BatteryFlowIntegration() {
  return (
    <figure style={{ margin: 0 }}>
      <figcaption className="figcap">Fig. 02 — vehicle-integration layer</figcaption>
      <svg
        viewBox="0 0 330 186"
        width="100%"
        role="img"
        aria-label="Diagram: manufacturer hardware feeds a telematics integration, which normalizes data and command handling, feeding fleet operations tooling."
      >
        <g className="dg">
          <rect x="40" y="4" width="250" height="30" />
          <rect x="40" y="56" width="250" height="30" />
          <rect x="40" y="108" width="250" height="30" />
          <rect x="40" y="156" width="250" height="26" />
          <path d="M165 34v22M165 86v22M165 138v18" />
          <path
            d="M165 56l-4-6h8zM165 108l-4-6h8zM165 156l-4-6h8z"
            fill="currentColor"
            stroke="none"
          />
          <path d="M300 56v82M300 56h-6M300 138h-6" strokeDasharray="3 3" />
        </g>
        <g className="dgt" textAnchor="middle">
          <text x="165" y="23">manufacturer hardware</text>
          <text x="165" y="75">telematics integration</text>
          <text x="165" y="127">normalized data + commands</text>
          <text x="165" y="173">fleet operations tooling</text>
        </g>
      </svg>
      <p className="mono dimmer" style={{ fontSize: 12, lineHeight: 1.4, margin: "10px 0 0" }}>
        Bracketed steps are my main engineering surface — the same logical command maps to
        different control behavior per vehicle platform.
      </p>
    </figure>
  );
}

export function Diagram({ kind }: { kind?: string }) {
  if (kind === "bharattruck-topology") return <BharatTruckTopology />;
  if (kind === "batteryflow-integration") return <BatteryFlowIntegration />;
  return null;
}
