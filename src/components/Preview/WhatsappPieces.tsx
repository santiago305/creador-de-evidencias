import React from "react";

export function MessageGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`space-y-0.5 mb-4 ${className}`}>{children}</div>;
}

export function DayChip({ text }: { text: string }) {
  return (
    <div className="flex justify-center my-4">
      <span className="rounded-md bg-[#fefdfc] px-3 py-0.75 text-[11px] text-[#667781] shadow font-medium">
        {text}
      </span>
    </div>
  );
}

export function IncomingBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white border border-black/5 px-3 py-2 text-[12px] text-slate-900 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        {children}
      </div>
    </div>
  );
}

export function OutgoingBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-[#d9fdd3] border border-black/5 px-3 py-2 text-[12px] text-slate-900 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
        {children}
      </div>
    </div>
  );
}

export function BubbleTitle({ children }: { children: React.ReactNode }) {
  return <div className="text-[12px] font-semibold mb-1">{children}</div>;
}

export function BubbleRow({ k, v }: { k: string; v: string }) {
  const value = v?.trim() ? v : "—";
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-[11px] text-slate-700">{k}</span>
      <span className="text-[11px] text-slate-900 font-medium truncate max-w-[60%]">
        {value}
      </span>
    </div>
  );
}

export function PanelItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-black/5 bg-white px-2.5 py-2">
      <div className="text-[10px] text-slate-500">{label}</div>
      <div className="text-[11px] font-semibold text-slate-900 truncate">
        {value?.trim() ? value : "—"}
      </div>
    </div>
  );
}


export type MsgStatus = "sent" | "delivered" | "read";

function BubbleTail({
  side,
  colorClass,
}: {
  side: "left" | "right";
  colorClass: string;
}) {
  // Tail tipo WhatsApp (inline, para no depender de otro componente)
  if (side === "left") {
    return (
      <span className={`absolute -left-1.75 ${colorClass}`}>
        <svg
          viewBox="0 0 8 13"
          height="13"
          width="8"
          preserveAspectRatio="xMidYMid meet"
          version="1.1"
          x="0px"
          y="0px"
          enableBackground="new 0 0 8 13"
        >
          <title>tail-in</title>
          <path
            opacity="0.13"
            fill="#000000"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
          <path
            fill="currentColor"
            d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
          ></path>
        </svg>
      </span>
    );
  }

  return (
    <span className={`absolute -right-1.75 ${colorClass}`}>
      <svg
        viewBox="0 0 8 13"
        height="13"
        width="8"
        preserveAspectRatio="xMidYMid meet"
        version="1.1"
        x="0px"
        y="0px"
        enableBackground="new 0 0 8 13"
      >
        <title>tail-out</title>
        <path
          opacity="0.13"
          d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z"
          fill="#000000"
        ></path>
        <path
          fill="currentColor"
          d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z"
        ></path>
      </svg>
    </span>
  );
}

// Placeholder si ya lo tienes, borra esto
function Ticks({ status }: { status: MsgStatus }) {
  // Solo ejemplo: ajusta a tu implementación real
  const color =
    status === "read" ? "text-[#007BFC]" : "text-[rgba(0,0,0,0.6)]";
  return (
    <span className={`${color} inline-block`}>
      {/* Doble check */}
      <svg viewBox="0 0 16 11" height="11" width="16" fill="currentColor">
        <path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832Z" />
        <path d="M8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" />
      </svg>
    </span>
  );
}

export function Bubble({
  side,
  firstInGroup,
  time,
  status,
  children,
}: {
  side: "in" | "out";
  firstInGroup?: boolean;
  time?: string;
  status?: MsgStatus;
  children: React.ReactNode;
}) {
  const isOut = side === "out";

  // Colores tipo WA
  const bubbleBg = isOut ? "bg-[#D9FDD3]" : "bg-white";
  const tailColor = isOut ? "text-[#D9FDD3]" : "text-white";

  // Cortes de esquina SOLO si es firstInGroup
  const cornerCut = firstInGroup
    ? isOut
      ? "rounded-tr-none"
      : "rounded-tl-none"
    : "";

  // Render de contenido:
  // - Si children trae varios nodos (ej: varios <span>), a todos menos al último les metemos "block"
  const content = (() => {
    const arr = React.Children.toArray(children);

    // Si solo hay 1 cosa, no molestamos.
    if (arr.length <= 1) return children;

    return arr.map((node, idx) => {
      const isLast = idx === arr.length - 1;

      // Si es un elemento React (ej: <span>), le agregamos className
      if (React.isValidElement(node)) {
        const existing = (node.props as any).className ?? "";
        const add = !isLast ? "block" : "";
        const merged = [existing, add].filter(Boolean).join(" ");

        return React.cloneElement(node as any, {
          className: merged || undefined,
          key: (node as any).key ?? idx,
        });
      }

      // Si es texto plano, lo envolvemos para poder aplicar "block"
      return (
        <span key={idx} className={!isLast ? "block" : undefined}>
          {node as any}
        </span>
      );
    });
  })();

  return (
    <div className={`flex ${isOut ? "justify-end" : "justify-start"} px-15.75`}>
      <div className="relative max-w-[60%] flex-none text-[14.2px] leading-4.75">
        {/* Tail SOLO si es primer mensaje del bloque */}
        {firstInGroup && (
          <BubbleTail
            side={isOut ? "right" : "left"}
            colorClass={tailColor}
          />
        )}

        <div
          className={[
            "relative z-200",
            "rounded-[7.5px]",
            cornerCut,
            bubbleBg,
            "shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]",
          ].join(" ")}
        >
          <div className="pt-1.5 pb-2 ps-2.25 pe-1.75 box-border select-text">
            <div className="relative wrap-break-word whitespace-pre-wrap overflow-x-hidden overflow-y-hidden">
              {/* Contenido */}
              <span
                data-testid="selectable-text"
                dir="ltr"
                className="visible select-text font-normal text-sm leading-5 tracking-[0.01rem]"
                style={{ minHeight: "0px" }}
              >
                {content}
              </span>

              {/* Esto imita el “espacio reservado” de WA para que el reloj no pise el texto */}
              <span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-0 pt-0 pb-0 align-middle invisible pe-1 ps-1 leading-3.75 text-[0.6875rem]"
                >
                  <span className="shrink-0 grow-0">{time ?? ""}</span>
                </span>
              </span>
            </div>

            {/* Hora + ticks flotando abajo derecha */}
            {(time || (isOut && status)) && (
              <div className="relative z-10 float-right -mt-2.5 -mb-1.25 ps-1 pe-0">
                <div
                  className={[
                    "flex items-center h-3.75 whitespace-nowrap text-[0.6875rem] leading-3.75",
                    "text-[rgba(0,0,0,0.6)]",
                    isOut ? "cursor-pointer" : "",
                  ].join(" ")}
                >
                  {time && (
                    <span className="inline-block align-top" dir="auto">
                      <span className="min-w-0 max-w-full inline font-normal text-[0.75rem] leading-4 text-[rgba(0,0,0,0.6)] wrap-break-word break-all whitespace-pre-line select-text">
                        {time}
                      </span>
                    </span>
                  )}

                  {isOut && status && (
                    <div className="inline-block ps-0.75">
                      <Ticks status={status} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function VoiceBubble({
  side,
  firstInGroup,
  time,
  status,
  duration = "0:23",
  showAvatar = false,
}: {
  side: "in" | "out";
  firstInGroup?: boolean;
  time?: string;
  status?: MsgStatus;
  duration?: string;
  showAvatar?: boolean;
}) {
  const isOut = side === "out";

  return (
    <Bubble side={side} firstInGroup={firstInGroup} time={time} status={status}>
      <div className="flex items-center gap-2">
        {/* Play */}
        <button
          className="h-8 w-8 rounded-full bg-black/10 flex items-center justify-center shrink-0"
          type="button"
          aria-label="Play"
        >
          <svg width="14" height="14" viewBox="0 0 16 16">
            <path fill="currentColor" d="M6 4.5v7l6-3.5z" />
          </svg>
        </button>

        {/* Wave */}
        <div className="flex-1 min-w-30">
          <div className="h-3 rounded-full bg-black/10 relative overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-[35%] bg-black/20" />
          </div>
          <div className="mt-1 text-[10px] text-[#667781]">{duration}</div>
        </div>

        {/* Avatar (incoming style) */}
        {showAvatar && !isOut && (
          <div className="h-9 w-9 rounded-full bg-black/10 shrink-0" />
        )}
      </div>
    </Bubble>
  );
}
