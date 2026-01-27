import type { ChangeEvent } from "react";
import type { ActiveDesign, FormState, SavedData } from "../../types";
import { Input } from "../Input";

interface DataFormProps {
  form: FormState;
  activeDesign: ActiveDesign;
  saved: SavedData | null;
  onChange: (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

// Componente que renderiza el formulario y el estado de guardado.
export function DataForm({
  form,
  activeDesign,
  saved,
  onChange,
  onSave,
}: DataFormProps) {
  return (
    <div className="p-4 md:p-5">
      <div className="rounded-2xl border border-slate-200 bg-linear-to-b from-slate-50 to-white p-4 shadow-sm">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-bold text-slate-900">Datos</div>
          </div>

          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700">
            {activeDesign.toUpperCase()}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Input
            label="DNI"
            value={form.dni}
            onChange={onChange("dni")}
            placeholder="Ej: 12345678"
          />
          <Input
            label="Telefono"
            value={form.telefono}
            onChange={onChange("telefono")}
            placeholder="Ej: 999 999 999"
          />
          <Input
            label="Nombre"
            value={form.nombre}
            onChange={onChange("nombre")}
            placeholder="Ej: Juan PÇ¸rez"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Monto"
              value={form.monto}
              onChange={onChange("monto")}
              placeholder="Ej: 1500"
              hint="Puedes poner S/ si quieres."
            />
            <Input
              label="Tasa"
              value={form.tasa}
              onChange={onChange("tasa")}
              placeholder="Ej: 2.5%"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              label="Cuota"
              value={form.cuota}
              onChange={onChange("cuota")}
              placeholder="Ej: 250"
            />
            <Input
              label="Plazo"
              value={form.plazo}
              onChange={onChange("plazo")}
              placeholder="Ej: 12 meses"
            />
          </div>

          <Input
            label="Fecha y hora"
            type="datetime-local"
            value={form.fechaHora}
            onChange={onChange("fechaHora")}
            hint="Se guarda tal cual lo ingresas."
          />

          <Input
            label="Duracion (min)"
            value={form.duracion}
            onChange={onChange("duracion")}
            placeholder="Ej: 6"
          />

          <button
            type="button"
            onClick={onSave}
            className={[
              "mt-1 inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold",
              "bg-slate-900 text-white shadow-sm transition-all",
              "hover:shadow-md hover:-translate-y-px active:translate-y-0",
              "focus:outline-none focus:ring-2 focus:ring-slate-900/25",
            ].join(" ")}
          >
            Guardar
          </button>

          <div className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span>
                Guardado actual:{" "}
                <b className="text-slate-900">{saved ? "Si" : "No"}</b>
              </span>
             
              <span>
                Preview: <b className="text-slate-900">{activeDesign}</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
