import { useMemo } from "react";
import type { PreviewProps } from "../../types";
import { EmptyState } from "./EmptyState";
import { WhatsappHeaderUser } from "./WhatsappHeaderUser";
import { WhatsappConversation } from "./WhatsappConversation";
import { WhatsappRightAside } from "./WhatsappRightAside";
import type { MsgStatus } from "./WhatsappPieces";


export function PreviewBlockWhatsapp({ data }: PreviewProps) {
  if (!data) return <EmptyState />;

  const messageStatus = useMemo<MsgStatus>(
    () => (Math.random() < 0.5 ? "read" : "delivered"),
    [data]
  );

  return (
    <div className="w-full h-full bg-[#efeae2] relative" id="CAPTURA">
      {/* Layout: SOLO chat + panel derecho (sin lista de chats) */}
      <div className="flex w-full h-full">
        <div className="flex-5 min-w-0 flex flex-col">
          <WhatsappHeaderUser data={data} status={messageStatus} />

          <WhatsappConversation data={data} messageStatus={messageStatus} />
        </div>
        {/* Chat area */}

        {/* Panel derecho FIJO (sticky). Esto es lo que pediste. */}
        <WhatsappRightAside data={data} />
      </div>
    </div>
  );
}
