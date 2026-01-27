import type { ActiveDesign } from "../../types";

interface TabItem {
  key: ActiveDesign;
  label: string;
  accent: string;
}

interface DesignTabsProps {
  activeDesign: ActiveDesign;
  tabItems: readonly TabItem[];
  onSelect: (design: ActiveDesign) => void;
}

// Componente que renderiza las pestanas para cambiar de canal.
export function DesignTabs({ activeDesign, tabItems, onSelect }: DesignTabsProps) {
  return (
    <div className="px-4 py-4 border-b border-slate-100 bg-white">
      <div className="flex flex-wrap gap-2">
        {tabItems.map((t) => {
          const active = activeDesign === t.key;

          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onSelect(t.key)}
              className={[
                "group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                "transition-all select-none",
                active
                  ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-900"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
                "focus:outline-none focus:ring-2 focus:ring-slate-900/20",
              ].join(" ")}
            >
              {/* dot */}
              <span
                className={[
                  "h-2.5 w-2.5 rounded-full",
                  t.accent,
                  active ? "opacity-100" : "opacity-80 group-hover:opacity-100",
                ].join(" ")}
              />

              <span>{t.label}</span>

              {/* subtle active underline glow */}
              {active ? (
                <span className="absolute -bottom-2.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-slate-900/20" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
