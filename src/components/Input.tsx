import type { InputProps } from "../types";

// Componente de input con etiqueta y pista opcional.
export function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  hint,
}: InputProps) {
  return (
    <label className="block">
      <div className="flex items-end justify-between gap-2">
        <span className="text-xs font-semibold text-slate-700">{label}</span>
        {hint ? <span className="text-[11px] text-slate-500">{hint}</span> : null}
      </div>

      <div className="mt-1 rounded-2xl border border-slate-200 bg-white shadow-sm transition focus-within:border-slate-300 focus-within:ring-2 focus-within:ring-slate-900/10">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? label}
          className={[
            "w-full rounded-2xl bg-transparent px-3 py-2.5 text-sm text-slate-900",
            "outline-none placeholder:text-slate-400",
          ].join(" ")}
        />
      </div>
    </label>
  );
}
