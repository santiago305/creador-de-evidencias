import type { ChangeEvent } from "react";
import type { ActiveDesign, FormState, SavedData } from "../../types";
import { DataForm } from "./DataForm";
import { DesignTabs } from "./DesignTabs";

interface TabItem {
  key: ActiveDesign;
  label: string;
  accent: string;
}

interface FormPanelProps {
  activeDesign: ActiveDesign;
  form: FormState;
  saved: SavedData | null;
  tabItems: readonly TabItem[];
  onSelectDesign: (design: ActiveDesign) => void;
  onChange: (key: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

// Componente que arma la tarjeta del formulario con tabs y campos.
export function FormPanel({
  activeDesign,
  form,
  saved,
  tabItems,
  onSelectDesign,
  onChange,
  onSave,
}: FormPanelProps) {
  return (
    <div className="lg:col-span-2">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <DesignTabs
          activeDesign={activeDesign}
          tabItems={tabItems}
          onSelect={onSelectDesign}
        />

        <DataForm
          form={form}
          activeDesign={activeDesign}
          saved={saved}
          onChange={onChange}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
