import { Star, Tag } from "lucide-react";

type Product = {
  name: string;
  price: string;
  mrp?: string;
  discount?: string;
  emoji?: string;
  attr?: string;
  source?: string;
  rating?: string;
  reviews?: string;
};

type Compare = {
  products: Array<Record<string, string>>;
  attributes: string[];
};

type Segment =
  | { type: "text"; text: string }
  | { type: "products"; items: Product[] }
  | { type: "compare"; data: Compare }
  | { type: "refusal"; text: string };

function tryParse<T>(raw: string): T | null {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function parseSegments(content: string): Segment[] {
  const segs: Segment[] = [];
  let rest = content;

  // Refusal prefix: stays as a tagged text block
  if (rest.trim().startsWith("<<<REFUSAL>>>")) {
    const text = rest.replace("<<<REFUSAL>>>", "").trim();
    return [{ type: "refusal", text }];
  }

  const blockRegex =
    /<<<(PRODUCTS|COMPARE)>>>([\s\S]*?)<<<END_\1>>>/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = blockRegex.exec(rest))) {
    const before = rest.slice(lastIndex, match.index).trim();
    if (before) segs.push({ type: "text", text: before });
    const [, kind, body] = match;
    const json = body.trim();
    if (kind === "PRODUCTS") {
      const items = tryParse<Product[]>(json);
      if (items) segs.push({ type: "products", items });
    } else {
      const data = tryParse<Compare>(json);
      if (data) segs.push({ type: "compare", data });
    }
    lastIndex = match.index + match[0].length;
  }
  const tail = rest.slice(lastIndex).trim();
  if (tail) segs.push({ type: "text", text: tail });

  if (segs.length === 0) segs.push({ type: "text", text: content });
  return segs;
}

function ProductCard({ p }: { p: Product }) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-accent text-3xl">
          {p.emoji || "🛍️"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold text-foreground">{p.name}</p>
          <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-base font-bold text-primary">{p.price}</span>
            {p.mrp && (
              <span className="text-xs text-muted-foreground line-through">{p.mrp}</span>
            )}
            {p.discount && (
              <span className="text-xs font-medium text-success">{p.discount}</span>
            )}
          </div>
          {(p.rating || p.reviews) && (
            <div className="mt-1 inline-flex items-center gap-1 rounded-md bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success">
              <Star className="h-3 w-3 fill-current" />
              {p.rating}
              {p.reviews && <span className="text-muted-foreground">({p.reviews})</span>}
            </div>
          )}
        </div>
      </div>
      {p.attr && (
        <div className="mt-2 flex items-start gap-1.5 text-xs">
          <Tag className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
          <span className="text-foreground">{p.attr}</span>
        </div>
      )}
      {p.source && (
        <p className="mt-1 text-[11px] italic text-muted-foreground">— {p.source}</p>
      )}
    </div>
  );
}

function CompareTable({ data }: { data: Compare }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]">
      <div className="bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
        Comparison
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="px-2 py-2 text-left font-medium text-muted-foreground">
                Attribute
              </th>
              {data.products.map((p, i) => (
                <th key={i} className="px-2 py-2 text-left font-semibold text-foreground">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.attributes.map((attr) => (
              <tr key={attr} className="border-b border-border last:border-0">
                <td className="px-2 py-2 font-medium capitalize text-muted-foreground">
                  {attr}
                </td>
                {data.products.map((p, i) => (
                  <td key={i} className="px-2 py-2 text-foreground">
                    {p[attr] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function ParsedMessage({ content }: { content: string }) {
  const segs = parseSegments(content);
  return (
    <div className="space-y-2">
      {segs.map((s, i) => {
        if (s.type === "text") {
          return (
            <p key={i} className="whitespace-pre-wrap text-sm leading-relaxed">
              {s.text}
            </p>
          );
        }
        if (s.type === "refusal") {
          return (
            <div
              key={i}
              className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-foreground"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-destructive">
                Not in my scope
              </p>
              <p className="whitespace-pre-wrap">{s.text}</p>
            </div>
          );
        }
        if (s.type === "products") {
          return (
            <div key={i} className="grid gap-2">
              {s.items.map((p, j) => (
                <ProductCard key={j} p={p} />
              ))}
            </div>
          );
        }
        return <CompareTable key={i} data={s.data} />;
      })}
    </div>
  );
}
