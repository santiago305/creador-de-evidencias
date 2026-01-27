import type { PreviewProps } from "../../types";
import { EmptyState } from "./EmptyState";
import { WhatsappHeaderUser } from "./WhatsappHeaderUser";
import { WhatsappConversation } from "./WhatsappConversation";
import { WhatsappRightAside } from "./WhatsappRightAside";


export function PreviewBlockWhatsapp({ data }: PreviewProps) {
  if (!data) return <EmptyState />;

  return (
    <div className="w-full h-full bg-[#efeae2] relative">
      {/* Layout: SOLO chat + panel derecho (sin lista de chats) */}
      <div className="flex w-full h-full">
        <div className="flex-2 min-w-0 flex flex-col">
          <WhatsappHeaderUser data={data} />

          <WhatsappConversation data={data} />
        </div>
        {/* Chat area */}

        {/* Panel derecho FIJO (sticky). Esto es lo que pediste. */}
        <WhatsappRightAside data={data} />
      </div>
    </div>
  );
}
