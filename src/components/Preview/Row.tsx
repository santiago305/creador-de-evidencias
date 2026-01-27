import type { RowProps } from "../../types";

// Componente que pinta una fila clave valor del resumen.
export function Row({ k, v }: RowProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
      <span className="text-xs font-semibold text-slate-700">{k}</span>
      <span className="text-xs text-slate-900 truncate max-w-[60%]">
        {v?.trim() ? v : "-"}
      </span>
    </div>
  );
}
