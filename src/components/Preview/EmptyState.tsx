// Componente que muestra el estado vacio cuando no hay datos.
export function EmptyState() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-100">
      <div className="mx-6 rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm">
        <div className="text-sm font-semibold text-slate-900">Sin datos todavia</div>
        <div className="mt-1 text-xs text-slate-600">
          Completa el formulario y pulsa <b>Guardar</b>.
        </div>
      </div>
    </div>
  );
}
