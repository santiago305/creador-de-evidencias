import type { PreviewProps } from "../../types";
import { PreviewBlock } from "./PreviewBlock";
import { PreviewBlockWhatsapp } from "./whatsapp"
// Componente que muestra el preview estilo WhatsApp.
export function PreviewWhatsApp({ data }: PreviewProps) {
  return <PreviewBlockWhatsapp title="WhatsApp" badge="CHAT" data={data} />;
}

// Componente que muestra el preview estilo llamada.
export function PreviewLlamada({ data }: PreviewProps) {
  return <PreviewBlock title="Llamada" badge="CALL" data={data} />;
}

// Componente que muestra el preview estilo SMS.
export function PreviewSMS({ data }: PreviewProps) {
  return <PreviewBlock title="SMS" badge="MSG" data={data} />;
}
