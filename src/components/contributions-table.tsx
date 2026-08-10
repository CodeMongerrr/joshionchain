import type { LiveContribution } from "@/lib/github";

/**
 * Renders `what` with any substrings listed in `code` set in mono — so
 * `zebrad-log-filter` reads as a binary name rather than prose, without the
 * data file having to carry markup.
 */
function Described({ text, code }: { text: string; code?: string[] }) {
  if (!code?.length) return <>{text}</>;

  // Split on all code substrings at once, keeping the delimiters.
  const escaped = code.map((c) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const parts = text.split(new RegExp(`(${escaped.join("|")})`, "g"));

  return (
    <>
      {parts.map((part, i) =>
        code.includes(part) ? (
          <span className="mono" style={{ fontSize: 13 }} key={i}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function StatusCell({ status }: { status: LiveContribution["status"] }) {
  if (status === "merged") {
    return (
      <td
        className="c-status mono"
        style={{ fontSize: 12, color: "var(--accent-ink)", whiteSpace: "nowrap" }}
      >
        ● Merged
      </td>
    );
  }
  return (
    <td className="c-status mono dimmer" style={{ fontSize: 12, whiteSpace: "nowrap" }}>
      ○ {status === "closed" ? "Closed" : "Open"}
    </td>
  );
}

export function ContributionsTable({
  items,
  counts,
  showFilter = true,
}: {
  items: LiveContribution[];
  counts: { total: number; merged: number; open: number };
  showFilter?: boolean;
}) {
  return (
    <div className="oss">
      {showFilter ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {/* Pure-CSS filtering via :has() — works with JavaScript disabled. */}
          <div className="seg" role="group" aria-label="Filter contributions by status">
            <label className="seg-opt mono" style={{ fontSize: 12, letterSpacing: ".06em" }}>
              <input type="radio" name="ossfilter" id="f-all" defaultChecked />
              All {counts.total}
            </label>
            <label className="seg-opt mono" style={{ fontSize: 12, letterSpacing: ".06em" }}>
              <input type="radio" name="ossfilter" id="f-merged" />
              Merged {counts.merged}
            </label>
            <label className="seg-opt mono" style={{ fontSize: 12, letterSpacing: ".06em" }}>
              <input type="radio" name="ossfilter" id="f-open" />
              Open {counts.open}
            </label>
          </div>
        </div>
      ) : null}

      <table className="table" style={{ fontSize: 15 }}>
        <thead className="osshead">
          <tr>
            <th scope="col" style={{ width: "32%" }}>
              Project
            </th>
            <th scope="col">Contribution</th>
            <th scope="col" style={{ width: 110 }}>
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr data-status={c.status} key={`${c.repo}#${c.number}`}>
              <td className="c-repo mono" style={{ fontSize: 13 }}>
                {c.repo}
              </td>
              <td className="c-what">
                <Described text={c.what} code={c.code} />{" "}
                <span style={{ whiteSpace: "nowrap" }}>
                  —{" "}
                  <a href={c.url} target="_blank" rel="noopener noreferrer">
                    PR #{c.number}
                  </a>
                </span>
              </td>
              <StatusCell status={c.status} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
