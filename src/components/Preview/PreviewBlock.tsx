import type { PreviewBlockProps } from "../../types";
import { EmptyState } from "./EmptyState";
import { Row } from "./Row";

// Componente que agrupa el resumen guardado en el preview.
export function PreviewBlock({ title, badge, data }: PreviewBlockProps) {
  if (!data) return <EmptyState />;

  return (
    <div className="w-full min-h-130 bg-slate-100">
      {/* top bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <div>
          <div className="text-sm font-bold text-slate-900">{title}</div>
          <div className="text-xs text-slate-500">Resumen del registro guardado</div>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-semibold text-white">
          {badge}
        </span>
      </div>

      {/* content */}
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-1 gap-2">
          <Row k="Nombre de asesor" v={data.nombreAsesor} />
          <Row k="DNI" v={data.dni} />
          <Row k="Telefono" v={data.telefono} />
          <Row k="Nombre" v={data.nombre} />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Row k="Monto" v={data.monto} />
          <Row k="Tasa" v={data.tasa} />
          <Row k="Cuota" v={data.cuota} />
          <Row k="Plazo" v={data.plazo} />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Row k="Fecha/Hora" v={data.fechaHora} />
          <Row k="Duracion (min)" v={data.duracion} />
        </div>
      </div>
    </div>
  );
}
