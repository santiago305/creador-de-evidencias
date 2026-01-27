import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";
import { FormPanel } from "./components/Form/FormPanel";
import { PreviewPanel } from "./components/Preview/PreviewPanel";
import type { ActiveDesign, FormState, SavedData } from "./types";

/* ---------------- App ---------------- */
// Componente raiz que coordina estado, tabs y vistas.
export default function App() {
  const [activeDesign, setActiveDesign] = useState<ActiveDesign>("whatsapp");
  const [form, setForm] = useState<FormState>({
    dni: "",
    telefono: "",
    nombre: "",
    monto: "",
    tasa: "",
    cuota: "",
    plazo: "",
    fechaHora: "",
    duracion: "",
  });

  const [saved, setSaved] = useState<SavedData | null>(null);

  const handleChange =
    (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSave = () => setSaved({ ...form });

  const tabItems = useMemo(
    () =>
      [
        { key: "whatsapp" as const, label: "WhatsApp", accent: "bg-emerald-600" },
        { key: "llamada" as const, label: "Llamada", accent: "bg-sky-600" },
        { key: "sms" as const, label: "SMS", accent: "bg-indigo-600" },
      ] as const,
    []
  );

  return (
    <div className="h-screen w-full bg-slate-50">
      <div className="mx-auto w-full p-4 md:p-6 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 h-full">
          <PreviewPanel activeDesign={activeDesign} saved={saved} />
          <FormPanel
            activeDesign={activeDesign}
            form={form}
            saved={saved}
            tabItems={tabItems}
            onSelectDesign={setActiveDesign}
            onChange={handleChange}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}
