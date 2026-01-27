import type { ActiveDesign, SavedData } from "../../types";
import {
  PreviewLlamada,
  PreviewSMS,
  PreviewWhatsApp,
} from "./PreviewChannels";

interface PreviewPanelProps {
  activeDesign: ActiveDesign;
  saved: SavedData | null;
}

// PreviewPanel.tsx
export function PreviewPanel({ activeDesign, saved }: PreviewPanelProps) {
  return (
    <div className="lg:col-span-6 flex min-h-0">
      <div className="rounded-t-3xl border border-slate-200 bg-white shadow-sm overflow-hidden w-full flex flex-col min-h-0">
        {/* Preview header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
          </div>
        </div>

        {/* Device frame */}
        <div className="flex-1 min-h-0 bg-slate-100">
          <div className="h-full min-h-0 overflow-hidden">
            {activeDesign === "whatsapp" && <PreviewWhatsApp data={saved} />}
            {activeDesign === "llamada" && <PreviewLlamada data={saved} />}
            {activeDesign === "sms" && <PreviewSMS data={saved} />}
          </div>
        </div>
      </div>
    </div>
  );
}
