import type { WhatsappData } from "./whatsappTypes";

/* --------- util para formatear teléfono Perú --------- */
function formatTelefonoPE(phone?: string) {
  if (!phone) return "—";

  // Quitamos todo lo que no sea número
  const clean = phone.replace(/\D/g, "");

  // Si viene con 51 adelante (51987654321), lo quitamos
  const nine =
    clean.startsWith("51") && clean.length === 11 ? clean.slice(2) : clean;

  if (nine.length !== 9) return nine;

  // 999 999 999
  return `${nine.slice(0, 3)} ${nine.slice(3, 6)} ${nine.slice(6, 9)}`;
}

/* --------- componente --------- */
export function WhatsappRightAside({ data }: { data: WhatsappData }) {
  return (
    <aside className="w-45 border-l border-black/5 bg-white/95 flex-2 min-h-0 flex flex-col">

        {/* ---------- HEADER ---------- */}
        <div className="w-full py-2 px-3 bg-white shrink-0">
          <div className="flex items-center justify-between">

            {/* Left: X + title */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Cerrar"
                className="h-9 w-9 grid place-items-center rounded-full hover:bg-black/5 active:bg-black/10 transition text-[#111b21]"
              >
                {/* X icon */}
                <svg viewBox="0 0 24 24" height="20" width="20" fill="none">
                  <path
                    d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              <div className="text-[12px] font-medium text-[#111b21]">
                Info. del contacto
              </div>
            </div>

            {/* Right: pencil */}
            <button
              type="button"
              aria-label="Editar"
              className="h-9 w-9 grid place-items-center rounded-full hover:bg-black/5 active:bg-black/10 transition text-[#111b21]"
            >
              <svg viewBox="0 0 24 24" height="20" width="20" fill="none">
                <path
                  d="M5 18.9999H6.4L16.2 9.22488L14.775 7.79988L5 17.5999V18.9999ZM4 20.9999C3.71667 20.9999 3.47917 20.904 3.2875 20.7124C3.09583 20.5207 3 20.2832 3 19.9999V17.5749C3 17.3082 3.05 17.054 3.15 16.8124C3.25 16.5707 3.39167 16.3582 3.575 16.1749L16.2 3.57488C16.3833 3.39154 16.6 3.24988 16.85 3.14988C17.1 3.04988 17.3583 2.99988 17.625 2.99988C17.8917 2.99988 18.1458 3.04988 18.3875 3.14988C18.6292 3.24988 18.85 3.39988 19.05 3.59988L20.425 4.99988C20.625 5.18321 20.7708 5.39571 20.8625 5.63738C20.9542 5.87904 21 6.13321 21 6.39988C21 6.64988 20.9542 6.89988 20.8625 7.14988C20.7708 7.39988 20.625 7.62488 20.425 7.82488L7.825 20.4249C7.64167 20.6082 7.42917 20.7499 7.1875 20.8499C6.94583 20.9499 6.69167 20.9999 6.425 20.9999H4Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-soft">
          <div className="w-full px-4">
            {/* ---------- USER CARD ---------- */}
            <div className="py-3 border-b-[1.5px] border-black/5 bg-white">
              <div className="flex flex-col items-center gap-2">
                {/* avatar */}
                <div className="h-32 w-32 rounded-full bg-slate-300 overflow-hidden">
                  <svg
                    viewBox="0 0 48 48"
                    className="rounded-full w-full h-full bg-[#F7F5F3] border border-[#e0dfde]"
                    fill="none"
                  >
                    <path
                      d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z"
                      fill="#606263"
                    />
                  </svg>
                </div>

                {/* name + phone */}
                <div className="min-w-0 flex flex-col items-center">
                  <div className="text-[20px] font-normal text-slate-900 truncate">
                    {data.nombre?.trim() ? data.nombre : "Sin nombre"}
                  </div>

                  {/* AQUÍ VA EL TELÉFONO FORMATEADO */}
                  <div className="text-[13px] text-slate-500 truncate">
                    +51 {formatTelefonoPE(data.telefono)}
                  </div>

                  <button
                    type="button"
                    className="
                      mt-2
                      flex flex-col items-center justify-center gap-1
                      px-12 py-2
                      rounded-2xl
                      border border-[#e0dfde]
                      bg-white
                      text-[#111b21]
                      text-[12px]
                      font-medium
                      hover:bg-black/5
                      active:bg-black/10
                      transition
                    "
                  >
                    {/* Icono lupa */}
                    <span className="text-[#00a884]">
                      <svg
                        viewBox="0 0 24 24"
                        height="16"
                        width="16"
                        preserveAspectRatio="xMidYMid meet"
                        fill="none"
                      >
                        <path
                          d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>

                    {/* Texto */}
                    <span>Busca</span>
                  </button>


                </div>
                <div className="block w-full text-[11px] my-3">
                  Info.
                </div>

              </div>
            </div>

            {/* ---------- DATA PANEL ---------- */}
            <div className="px-4 py-6 bg-white border-b border-black/10">
              <button
                type="button"
                className="w-full flex items-center justify-between gap-3 text-left"
              >
                {/* Left: icon + label */}
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#54656f] shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      height="18"
                      width="18"
                      preserveAspectRatio="xMidYMid meet"
                      fill="none"
                    >
                      <path
                        d="M3 21C2.45 21 1.97917 20.8042 1.5875 20.4125C1.19583 20.0208 1 19.55 1 19V7C1 6.71667 1.09583 6.47917 1.2875 6.2875C1.47917 6.09583 1.71667 6 2 6C2.28333 6 2.52083 6.09583 2.7125 6.2875C2.90417 6.47917 3 6.71667 3 7V19H19C19.2833 19 19.5208 19.0958 19.7125 19.2875C19.9042 19.4792 20 19.7167 20 20C20 20.2833 19.9042 20.5208 19.7125 20.7125C19.5208 20.9042 19.2833 21 19 21H3ZM7 17C6.45 17 5.97917 16.8042 5.5875 16.4125C5.19583 16.0208 5 15.55 5 15V4C5 3.45 5.19583 2.97917 5.5875 2.5875C5.97917 2.19583 6.45 2 7 2H11.175C11.4417 2 11.6958 2.05 11.9375 2.15C12.1792 2.25 12.3917 2.39167 12.575 2.575L14 4H21C21.55 4 22.0208 4.19583 22.4125 4.5875C22.8042 4.97917 23 5.45 23 6V15C23 15.55 22.8042 16.0208 22.4125 16.4125C22.0208 16.8042 21.55 17 21 17H7ZM7 15H21V6H13.175L11.175 4H7V15ZM13.25 11.5L12.1 10C12 9.86667 11.8667 9.8 11.7 9.8C11.5333 9.8 11.4 9.86667 11.3 10L9.625 12.2C9.49167 12.3667 9.47083 12.5417 9.5625 12.725C9.65417 12.9083 9.80833 13 10.025 13H17.975C18.1917 13 18.3458 12.9083 18.4375 12.725C18.5292 12.5417 18.5083 12.3667 18.375 12.2L15.95 9.025C15.85 8.89167 15.7167 8.825 15.55 8.825C15.3833 8.825 15.25 8.89167 15.15 9.025L13.25 11.5Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>

                  <span className="text-[12px] text-[#111b21] truncate">
                    Archivos, enlaces y documentos
                  </span>
                </div>

                {/* Right: count */}
                <span className="text-[11px] text-[#667781]">
                  0
                </span>
              </button>
            </div>

            {/* */}
            <div className="bg-white border-b border-black/10">
              {/* Mensajes destacados */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left hover:bg-black/5 active:bg-black/10 transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#54656f] shrink-0">
                    {/* star-refreshed */}
                    <svg viewBox="0 0 24 24" height="18" width="18" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.0001 5.5563L10.4474 9.20853C10.2737 9.61713 9.88857 9.89642 9.44622 9.9346L5.45091 10.2794L8.46629 12.8783C8.80433 13.1697 8.95276 13.6246 8.85162 14.0593L7.95108 17.9296L11.3829 15.8715C11.7628 15.6437 12.2373 15.6437 12.6172 15.8715L16.049 17.9296L15.1485 14.0593C15.0474 13.6246 15.1958 13.1697 15.5338 12.8783L18.5492 10.2794L14.5539 9.9346C14.1115 9.89642 13.7264 9.61713 13.5527 9.20853L12.0001 5.5563ZM10.8957 3.04204C11.3098 2.06802 12.6903 2.06802 13.1044 3.04204L15.2051 7.98336L20.6131 8.45006C21.6713 8.54138 22.0979 9.86115 21.2933 10.5546L17.2061 14.0773L18.4246 19.3142C18.6647 20.3462 17.5473 21.1602 16.6387 20.6153L12.0001 17.8335L7.36144 20.6153C6.4528 21.1602 5.33537 20.3462 5.57548 19.3142L6.79399 14.0773L2.70679 10.5546C1.90226 9.86116 2.32885 8.54138 3.38705 8.45006L8.79502 7.98336L10.8957 3.04204Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>

                  <span className="text-[12px] text-[#111b21] truncate">
                    Mensajes destacados
                  </span>
                </div>

                {/* En WhatsApp suele ir vacío (o un número si quieres) */}
                <span className="text-[11px] text-[#667781]"> </span>
              </button>

              {/* Silenciar notificaciones (con switch) */}
              <div className="w-full px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#54656f] shrink-0">
                    {/* unmute-notifications-refreshed */}
                    <svg viewBox="0 0 24 24" height="18" width="18" fill="none">
                      <path
                        d="M5 19C4.44772 19 4 18.5523 4 18C4 17.4477 4.44772 17 5 17H6V10C6 8.61667 6.41667 7.3875 7.25 6.3125C8.08333 5.2375 9.16667 4.53333 10.5 4.2V3.5C10.5 3.08333 10.6458 2.72917 10.9375 2.4375C11.2292 2.14583 11.5833 2 12 2C12.4167 2 12.7708 2.14583 13.0625 2.4375C13.3542 2.72917 13.5 3.08333 13.5 3.5V4.2C14.8333 4.53333 15.9167 5.2375 16.75 6.3125C17.5833 7.3875 18 8.61667 18 10V17H19C19.5523 17 20 17.4477 20 18C20 18.5523 19.5523 19 19 19H5ZM12 22C11.45 22 10.9792 21.8042 10.5875 21.4125C10.1958 21.0208 10 20.55 10 20H14C14 20.55 13.8042 21.0208 13.4125 21.4125C13.0208 21.8042 12.55 22 12 22ZM8 17H16V10C16 8.9 15.6083 7.95833 14.825 7.175C14.0417 6.39167 13.1 6 12 6C10.9 6 9.95833 6.39167 9.175 7.175C8.39167 7.95833 8 8.9 8 10V17Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>

                  <span className="text-[12px] text-[#111b21] truncate">
                    Silenciar notificaciones
                  </span>
                </div>

                {/* Switch (fake, solo UI) */}
                <button
                  type="button"
                  aria-label="Silenciar notificaciones"
                  className="relative inline-flex h-5 w-9 items-center rounded-full bg-black/15 transition"
                >
                  <span className="inline-block h-4 w-4 translate-x-0.5 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              {/* Mensajes temporales (con subtexto) */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-start justify-between gap-3 text-left hover:bg-black/5 active:bg-black/10 transition"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-[#54656f] shrink-0 mt-[2px]">
                    {/* disappearing-messages-refreshed */}
                    <svg viewBox="0 0 24 24" height="18" width="18" fill="none">
                      <path
                        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C12.0547 22 12.1094 21.9996 12.1639 21.9987C12.7775 21.9888 13.2669 21.4834 13.257 20.8698C13.2471 20.2563 12.7417 19.7669 12.1281 19.7767C12.0855 19.7774 12.0428 19.7778 12 19.7778C7.70445 19.7778 4.22222 16.2955 4.22222 12C4.22222 7.70445 7.70445 4.22222 12 4.22222C12.0428 4.22222 12.0855 4.22257 12.1281 4.22325C12.7417 4.23314 13.2471 3.74375 13.257 3.13018C13.2669 2.51661 12.7775 2.0112 12.1639 2.00132C12.1094 2.00044 12.0547 2 12 2Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16.8592 3.25814C16.3231 2.95957 15.6465 3.15213 15.3479 3.68825C15.0493 4.22437 15.2419 4.90102 15.778 5.19959C15.8522 5.24089 15.9256 5.28338 15.9983 5.32703C16.5243 5.643 17.2069 5.4727 17.5229 4.94665C17.8389 4.4206 17.6686 3.738 17.1425 3.42203C17.0491 3.36591 16.9546 3.31127 16.8592 3.25814Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19.0534 6.47712C19.5794 6.16115 20.262 6.33145 20.578 6.8575C20.6341 6.95093 20.6887 7.04537 20.7419 7.14077C21.0404 7.67689 20.8479 8.35353 20.3118 8.65211C19.7756 8.95068 19.099 8.75811 18.8004 8.22199C18.7591 8.14782 18.7166 8.07439 18.673 8.00173C18.357 7.47568 18.5273 6.79309 19.0534 6.47712Z"
                        fill="currentColor"
                      />
                      <path
                        d="M21.9987 11.8361C21.9888 11.2225 21.4834 10.7331 20.8698 10.743C20.2563 10.7529 19.7669 11.2583 19.7767 11.8719C19.7774 11.9145 19.7778 11.9572 19.7778 12C19.7778 12.0428 19.7774 12.0855 19.7767 12.1281C19.7669 12.7417 20.2563 13.2471 20.8698 13.257C21.4834 13.2669 21.9888 12.7775 21.9987 12.1639C21.9996 12.1094 22 12.0547 22 12C22 11.9453 21.9996 11.8906 21.9987 11.8361Z"
                        fill="currentColor"
                      />
                      <path
                        d="M20.3118 15.3479C20.8479 15.6465 21.0404 16.3231 20.7419 16.8592C20.6887 16.9546 20.6341 17.0491 20.578 17.1425C20.262 17.6686 19.5794 17.8389 19.0534 17.5229C18.5273 17.2069 18.357 16.5243 18.673 15.9983C18.7166 15.9256 18.7591 15.8522 18.8004 15.778C19.099 15.2419 19.7756 15.0493 20.3118 15.3479Z"
                        fill="currentColor"
                      />
                      <path
                        d="M17.1425 20.578C17.6686 20.262 17.8389 19.5794 17.5229 19.0534C17.2069 18.5273 16.5243 18.357 15.9983 18.673C15.9256 18.7166 15.8522 18.7591 15.778 18.8004C15.2419 19.099 15.0493 19.7756 15.3479 20.3118C15.6465 20.8479 16.3231 21.0404 16.8592 20.7419C16.9546 20.6887 17.0491 20.6341 17.1425 20.578Z"
                        fill="currentColor"
                      />
                      <path
                        d="M16.7811 7.6229C16.5556 7.39749 16.1988 7.37213 15.9438 7.5634L11.3327 11.0217C10.6836 11.5085 10.6161 12.4574 11.1899 13.0312L11.3728 13.2141C11.9465 13.7878 12.8954 13.7204 13.3823 13.0713L16.8406 8.46018C17.0318 8.20516 17.0065 7.84831 16.7811 7.6229Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>

                  <div className="min-w-0">
                    <div className="text-[12px] text-[#111b21] truncate">
                      Mensajes temporales
                    </div>
                    <div className="text-[11px] text-[#667781] truncate">
                      Desactivados
                    </div>
                  </div>
                </div>
              </button>

              {/* Privacidad avanzada del chat (con subtexto) */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-start justify-between gap-3 text-left hover:bg-black/5 active:bg-black/10 transition"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="text-[#54656f] shrink-0 mt-[2px]">
                    {/* shield */}
                    <svg viewBox="0 0 24 24" height="18" width="18" fill="none">
                      <path
                        opacity="0.9"
                        d="M12 19.9C13.6167 19.4 14.9667 18.4125 16.05 16.9375C17.1333 15.4625 17.7667 13.8167 17.95 12H12V4.12502L6 6.37502V11.55C6 11.6667 6.01667 11.8167 6.05 12H12V19.9ZM12 21.9C11.8833 21.9 11.775 21.8917 11.675 21.875C11.575 21.8584 11.475 21.8334 11.375 21.8C9.125 21.05 7.33333 19.6625 6 17.6375C4.66667 15.6125 4 13.4334 4 11.1V6.37502C4 5.95836 4.12083 5.58336 4.3625 5.25002C4.60417 4.91669 4.91667 4.67502 5.3 4.52502L11.3 2.27502C11.5333 2.19169 11.7667 2.15002 12 2.15002C12.2333 2.15002 12.4667 2.19169 12.7 2.27502L18.7 4.52502C19.0833 4.67502 19.3958 4.91669 19.6375 5.25002C19.8792 5.58336 20 5.95836 20 6.37502V11.1C20 13.4334 19.3333 15.6125 18 17.6375C16.6667 19.6625 14.875 21.05 12.625 21.8C12.525 21.8334 12.425 21.8584 12.325 21.875C12.225 21.8917 12.1167 21.9 12 21.9Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>

                  <div className="min-w-0">
                    <div className="text-[12px] text-[#111b21] truncate">
                      Privacidad avanzada del chat
                    </div>
                    <div className="text-[11px] text-[#667781] truncate">
                      Desactivado
                    </div>
                  </div>
                </div>
              </button>

              {/* Cifrado (con descripción) */}
              <div className="w-full px-4 py-3 flex items-start gap-3">
                <span className="text-[#54656f] shrink-0 mt-[2px]">
                  {/* lock-refreshed */}
                  <svg viewBox="0 0 24 24" height="18" width="18" fill="none">
                    <path
                      d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V10C4 9.45 4.19583 8.97917 4.5875 8.5875C4.97917 8.19583 5.45 8 6 8H7V6C7 4.61667 7.4875 3.4375 8.4625 2.4625C9.4375 1.4875 10.6167 1 12 1C13.3833 1 14.5625 1.4875 15.5375 2.4625C16.5125 3.4375 17 4.61667 17 6V8H18C18.55 8 19.0208 8.19583 19.4125 8.5875C19.8042 8.97917 20 9.45 20 10V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM6 20H18V10H6V20ZM12 17C12.55 17 13.0208 16.8042 13.4125 16.4125C13.8042 16.0208 14 15.55 14 15C14 14.45 13.8042 13.9792 13.4125 13.5875C13.0208 13.1958 12.55 13 12 13C11.45 13 10.9792 13.1958 10.5875 13.5875C10.1958 13.9792 10 14.45 10 15C10 15.55 10.1958 16.0208 10.5875 16.4125C10.9792 16.8042 11.45 17 12 17ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>

                <div className="min-w-0">
                  <div className="text-[12px] text-[#111b21]">Cifrado</div>
                  <div className="text-[11px] text-[#667781] leading-snug">
                    Los mensajes están cifrados de extremo a extremo. Haz clic para verificarlo.
                  </div>
                </div>
              </div>
            </div>

            {/*foteer */}
            <div className="bg-white border-t border-black/10 mt-4 flex flex-col gap-3">
              {/* Añadir a Favoritos */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-black/5 active:bg-black/10 transition"
              >
                <span className="text-[#54656f] shrink-0">
                  {/* favorite-refreshed */}
                  <svg viewBox="0 0 24 24" height="18" width="18" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 20.9951C11.7667 20.9951 11.5292 20.9534 11.2875 20.8701C11.0458 20.7867 10.8333 20.6534 10.65 20.4701L8.925 18.8951C7.15833 17.2784 5.5625 15.6742 4.1375 14.0826C2.7125 12.4909 2 10.7367 2 8.82007C2 7.2534 2.525 5.94507 3.575 4.89507C4.625 3.84507 5.93333 3.32007 7.5 3.32007C8.38333 3.32007 9.21667 3.50757 10 3.88257C10.7833 4.25757 11.45 4.77007 12 5.42007C12.55 4.77007 13.2167 4.25757 14 3.88257C14.7833 3.50757 15.6167 3.32007 16.5 3.32007C18.0667 3.32007 19.375 3.84507 20.425 4.89507C21.475 5.94507 22 7.2534 22 8.82007C22 10.7367 21.2917 12.4951 19.875 14.0951C18.4583 15.6951 16.85 17.3034 15.05 18.9201L13.35 20.4701C13.1667 20.6534 12.9542 20.7867 12.7125 20.8701C12.4708 20.9534 12.2333 20.9951 12 20.9951ZM11.05 7.42007C10.5667 6.73674 10.05 6.2159 9.5 5.85757C8.95 5.49924 8.28333 5.32007 7.5 5.32007C6.5 5.32007 5.66667 5.6534 5 6.32007C4.33333 6.98674 4 7.82007 4 8.82007C4 9.68674 4.30833 10.6076 4.925 11.5826C5.54167 12.5576 6.27917 13.5034 7.1375 14.4201C7.99583 15.3367 8.87917 16.1951 9.7875 16.9951C10.6958 17.7951 11.4333 18.4534 12 18.9701C12.5667 18.4534 13.3042 17.7951 14.2125 16.9951C15.1208 16.1951 16.0042 15.3367 16.8625 14.4201C17.7208 13.5034 18.4583 12.5576 19.075 11.5826C19.6917 10.6076 20 9.68674 20 8.82007C20 7.82007 19.6667 6.98674 19 6.32007C18.3333 5.6534 17.5 5.32007 16.5 5.32007C15.7167 5.32007 15.05 5.49924 14.5 5.85757C13.95 6.2159 13.4333 6.73674 12.95 7.42007C12.8333 7.58674 12.6917 7.71174 12.525 7.79507C12.3583 7.8784 12.1833 7.92007 12 7.92007C11.8167 7.92007 11.6417 7.8784 11.475 7.79507C11.3083 7.71174 11.1667 7.58674 11.05 7.42007Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="text-[12px] text-[#111b21]">Añadir a Favoritos</span>
              </button>

              {/* Bloquear */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-black/5 active:bg-black/10 transition"
              >
                <span className="text-[#e1193e] shrink-0">
                  {/* block-refreshed */}
                  <svg viewBox="0 0 24 24" height="18" width="18" fill="none">
                    <path
                      d="M12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C12.9 20 13.7667 19.8542 14.6 19.5625C15.4333 19.2708 16.2 18.85 16.9 18.3L5.7 7.1C5.15 7.8 4.72917 8.56667 4.4375 9.4C4.14583 10.2333 4 11.1 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20ZM18.3 16.9C18.85 16.2 19.2708 15.4333 19.5625 14.6C19.8542 13.7667 20 12.9 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C11.1 4 10.2333 4.14583 9.4 4.4375C8.56667 4.72917 7.8 5.15 7.1 5.7L18.3 16.9Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="text-[12px] text-[#e1193e]">
                  {`Bloquear a ${
                    data.nombre?.trim() ? data.nombre.trim() : "Sin nombre"
                  }`}
                </span>
              </button>

              {/* Reportar */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-black/5 active:bg-black/10 transition"
              >
                <span className="text-[#e1193e] shrink-0">
                  {/* report-refreshed */}
                  <svg viewBox="0 0 24 24" height="18" width="18" fill="none">
                    <path
                      d="M3 16C2.46667 16 2 15.8 1.6 15.4C1.2 15 1 14.5333 1 14V12C1 11.8833 1.01667 11.7583 1.05 11.625C1.08333 11.4917 1.11667 11.3667 1.15 11.25L4.15 4.2C4.3 3.86667 4.55 3.58333 4.9 3.35C5.25 3.11667 5.61667 3 6 3H17V16L11 21.95C10.75 22.2 10.4542 22.3458 10.1125 22.3875C9.77083 22.4292 9.44167 22.3667 9.125 22.2C8.80833 22.0333 8.575 21.8 8.425 21.5C8.275 21.2 8.24167 20.8917 8.325 20.575L9.45 16H3ZM15 15.15V5H6L3 12V14H12L10.65 19.5L15 15.15ZM20 3C20.55 3 21.0208 3.19583 21.4125 3.5875C21.8042 3.97917 22 4.45 22 5V14C22 14.55 21.8042 15.0208 21.4125 15.4125C21.0208 15.8042 20.55 16 20 16H17V14H20V5H17V3H20Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="text-[12px] text-[#e1193e]">
                  {`Reportar a ${
                    data.nombre?.trim() ? data.nombre.trim() : "Sin nombre"
                  }`}
                </span>
              </button>

              {/* Eliminar chat */}
              <button
                type="button"
                className="w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-black/5 active:bg-black/10 transition"
              >
                <span className="text-[#e1193e] shrink-0">
                  {/* delete-refreshed */}
                  <svg viewBox="0 0 24 24" height="18" width="18" fill="none">
                    <path
                      d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4H9V3.5C9 3.22386 9.22386 3 9.5 3H14.5C14.7761 3 15 3.22386 15 3.5V4H19C19.5523 4 20 4.44772 20 5C20 5.55228 19.5523 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 16.5C9 16.7761 9.22386 17 9.5 17H10.5C10.7761 17 11 16.7761 11 16.5V8.5C11 8.22386 10.7761 8 10.5 8H9.5C9.22386 8 9 8.22386 9 8.5V16.5ZM13 16.5C13 16.7761 13.2239 17 13.5 17H14.5C14.7761 17 15 16.7761 15 16.5V8.5C15 8.22386 14.7761 8 14.5 8H13.5C13.2239 8 13 8.22386 13 8.5V16.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="text-[12px] text-[#e1193e]">Eliminar chat</span>
              </button>
            </div>
          </div>

        </div>


    </aside>
  );
}
