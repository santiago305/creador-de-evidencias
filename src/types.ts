import type { ChangeEvent } from "react";

export type ActiveDesign = "whatsapp" | "llamada" | "sms";

export interface FormState {
  nombreAsesor: string;
  dni: string;
  telefono: string;
  nombre: string;
  monto: string;
  tasa: string;
  cuota: string;
  plazo: string;
  fechaHora: string;
  duracion: string;
}

export type SavedData = FormState;

export interface InputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  hint?: string;
}

export interface PreviewProps {
  data: SavedData | null;
}

export interface PreviewBlockProps extends PreviewProps {
  title: string;
  badge: string;
}

export interface RowProps {
  k: string;
  v: string;
}
