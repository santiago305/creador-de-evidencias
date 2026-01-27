import { useMemo } from "react";
import bgWhatsapp from "../../assets/1.png";
import { WhatsappInputBar } from "./WhatsappInputBar";
import type { WhatsappData } from "./whatsappTypes";
import {
  MessageGroup,
  DayChip,
  Bubble,
  type MsgStatus,
} from "./WhatsappPieces";

function getPeruDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const lookup = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return {
    year: Number(lookup.year),
    month: Number(lookup.month),
    day: Number(lookup.day),
  };
}

function parsePeruDateOnly(fechaHora: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/.exec(
    fechaHora.trim()
  );
  if (!match) return null;
  const [, y, m, d] = match;
  return { year: Number(y), month: Number(m), day: Number(d) };
}

function formatDateDMY({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}) {
  return `${day}/${month}/${year}`;
}

function getDayChipText(fechaHora: string) {
  const input = parsePeruDateOnly(fechaHora);
  if (!input) return "Hoy";

  const todayPeru = getPeruDateParts(new Date());

  const todayUtc = Date.UTC(todayPeru.year, todayPeru.month - 1, todayPeru.day);
  const inputUtc = Date.UTC(input.year, input.month - 1, input.day);
  const diffDays = Math.floor((todayUtc - inputUtc) / 86_400_000);

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";

  if (diffDays >= 2 && diffDays <= 6) {
    const dayIndex = new Date(inputUtc).getUTCDay();
    const dayNames = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    return dayNames[dayIndex] ?? "Hoy";
  }

  return formatDateDMY(input);
}

function parseLocalDateTime(fechaHora: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})$/.exec(
    fechaHora.trim()
  );
  if (!match) return null;
  const [, y, m, d, h, min] = match;
  return new Date(
    Number(y),
    Number(m) - 1,
    Number(d),
    Number(h),
    Number(min)
  );
}

function formatTimeShort(date: Date) {
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const period = hours24 >= 12 ? "p. m." : "a. m.";
  return `${hours12}:${minutes} ${period}`;
}

function getTimeOfDayParts(date: Date) {
  const hour = date.getHours();

  if (hour < 12) {
    return { saludo: "Buenos dias", tramo: "manana" };
  }

  if (hour < 19) {
    return { saludo: "Buenas tardes", tramo: "tarde" };
  }

  return { saludo: "Buenas noches", tramo: "noche" };
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(arr: readonly T[], rng: () => number) {
  return arr[Math.floor(rng() * arr.length)];
}

function linesToSpans(lines: string[]) {
  return lines.map((line, idx) => (
    <span key={`${idx}-${line.slice(0, 8)}`}>{line}</span>
  ));
}

export function WhatsappConversation({ data }: { data: WhatsappData }) {
  const messages = useMemo(() => {
    const seed = Math.floor((Date.now() + Math.random() * 1_000_000) % 1_000_000_000);
    const rng = mulberry32(seed);

    const baseDate = parseLocalDateTime(data.fechaHora) ?? new Date();
    const { saludo, tramo } = getTimeOfDayParts(baseDate);

    const nombreCliente = data.nombre?.trim() ? data.nombre.trim() : "Pedro Vazquez";
    const nombreAsesor = data.nombreAsesor?.trim()
      ? data.nombreAsesor.trim()
      : "Maria Perez";

    const trato = rng() < 0.5 ? "Sr." : "Sra.";

    const firma = "Asesora de Impulsa A365";

    const firstMessageLines = [
      `${saludo} ${trato} ${nombreCliente}.`,
      `Le saluda ${nombreAsesor} de la empresa Impulsa A365 por encargo del Banco de la Nacion.`,
      `Ha sido un gusto contactarlo y de acuerdo con la llamada telefonica que tuvimos en la ${tramo}, puede acercarse a la agencia mas cercana con su DNI, boleta de pago y tarjeta Multired para realizar el desembolso y asi pueda aprovechar esta super promocion.`,
      "Desea que le envie por este medio, la propuesta que hoy conversamos?",
      "Cualquier consulta, estoy para apoyarlo.",
      `${nombreAsesor}`,
      firma,
    ];

    const respuestasCliente = [
      "Hola, si por favor envieme la propuesta.",
      "Gracias, quedo atento(a) a la propuesta.",
      "De acuerdo, puede enviarla por aqui.",
      "Buenas, si me la puede compartir por este medio.",
      "Ok, espero la propuesta. Gracias.",
    ];

    const cierresAsesor = [
      "Perfecto, en seguida se la envio.",
      "Listo, ya le comparto los detalles.",
      "Con gusto, envio la propuesta ahora mismo.",
      "Entendido, le envio la propuesta en un momento.",
    ];

    const detalleBase = [
      "Propuesta:",
      data.monto?.trim() ? `- Monto: ${data.monto}` : "- Monto: N/A",
      data.tasa?.trim() ? `- Tasa: ${data.tasa}` : "- Tasa: N/A",
      data.cuota?.trim() ? `- Cuota: ${data.cuota}` : "- Cuota: N/A",
      data.plazo?.trim() ? `- Plazo: ${data.plazo}` : "- Plazo: N/A",
    ];

    const t1 = new Date(baseDate);
    const t2 = new Date(baseDate);
    t2.setMinutes(t2.getMinutes() + (1 + Math.floor(rng() * 4)));
    const t3 = new Date(t2);
    t3.setMinutes(t3.getMinutes() + (1 + Math.floor(rng() * 3)));
    const t4 = new Date(t3);
    t4.setMinutes(t4.getMinutes() + (1 + Math.floor(rng() * 3)));

    const status: MsgStatus = rng() < 0.7 ? "read" : "delivered";

    return [
      {
        side: "out" as const,
        time: formatTimeShort(t1),
        status,
        lines: firstMessageLines,
      },
      {
        side: "in" as const,
        time: formatTimeShort(t2),
        lines: [pick(respuestasCliente, rng)],
      },
      {
        side: "out" as const,
        time: formatTimeShort(t3),
        status,
        lines: [pick(cierresAsesor, rng)],
      },
      {
        side: "out" as const,
        time: formatTimeShort(t4),
        status,
        lines: detalleBase,
      },
    ];
  }, [data]);

  return (
    <div className="w-full h-full">
      {/* Fondo WhatsApp */}
      <div className="relative h-full">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{ backgroundImage: `url(${bgWhatsapp})` }}
        />

        <div className="relative flex h-full flex-col">
          {/* Mensajes */}
          <div className="flex-1 w-full h-full ">
            <div className="w-full h-full">
              <DayChip text={getDayChipText(data.fechaHora)} />
              
              {messages.map((msg, idx) => {
                const prev = messages[idx - 1];
                const firstInGroup = !prev || prev.side !== msg.side;
                return (
                  <MessageGroup key={`${idx}-${msg.time}-${msg.side}`}>
                    <Bubble
                      side={msg.side}
                      firstInGroup={firstInGroup}
                      time={msg.time}
                      status={msg.status}
                    >
                      {linesToSpans(msg.lines)}
                    </Bubble>
                  </MessageGroup>
                );
              })}
            </div>
            
          </div>

          <WhatsappInputBar />
        </div>
      </div>
    </div>
  );
}

// export function Componeteleft () {
//   type CSSVars = React.CSSProperties & {
//     [key: `--${string}`]: string | number;
//   };
//   return (
//     <div>
//       <div className="relative pb-0.5">
//         <div className="flex flex-col">
//           <div>
//             <div className="flex items-start px-15.75 flex-col">
//               <span></span>

//               <div className="max-w-[60%] relative flex-none text-[14.2px] leading-4.75">
//                 <span
//                   className="absolute -left-1.75 text-white"
//                 >
//                   <svg
//                     viewBox="0 0 8 13"
//                     height="13"
//                     width="8"
//                     preserveAspectRatio="xMidYMid meet"
//                     version="1.1"
//                     x="0px"
//                     y="0px"
//                     enableBackground="new 0 0 8 13"
//                   >
//                     <title>tail-in</title>
//                     <path
//                       opacity="0.13"
//                       fill="#0000000"
//                       d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
//                     ></path>
//                     <path
//                       fill="currentColor"
//                       d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
//                     ></path>
//                   </svg>
//                 </span>

//                 <div className="
//                   relative 
//                   z-200 
//                   rounded-[7.5px] 
//                   rounded-tl-none 
//                   bg-white
//                   shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]
//                 ">
//                   <span aria-label="Marely:"></span>

//                   <div>
//                     <div className="pt-1.5 pb-2 ps-2.25 pe-1.75 box-border select-text">
//                       <div
//                         className=""
//                         data-pre-plain-text="[2:26 p. m., 26/1/2026] Marely: "
//                       >
//                         <div className="relative wrap-break-word whitespace-pre-wrap overflow-x-hidden overflow-y-hidden">
//                           <span
//                             data-testid="selectable-text"
//                             dir="ltr"
//                             className="visible select-text font-normal text-sm leading-5 tracking-[0.01rem]"
//                             style={{ minHeight: "0px" }}
//                           >
//                             {/* como hay mas de un sapam se le pone la clase block para bajar añ siguiente pero menos al ultimo spam */}
//                             <span>
//                               hola
//                             </span>
//                             <span>
//                               hola
//                             </span>
//                           </span>

//                           <span>
//                             <span aria-hidden="true" className="inline-flex h-0 pt-0 pb-0 align-middle invisible pe-1 ps-1 leading-3.75 text-[0.6875rem]">
//                               <span className="">2:26 p.&nbsp;m.</span>
//                             </span>
//                           </span>
//                         </div>
//                       </div>

//                       <div className="relative z-10 float-right -mt-2.5 -mb-1.25 ps-1 pe-0">
//                         <div className="flex items-center h-3.75 whitespace-nowrap text-[0.6875rem] leading-3.75 text-[rgba(0,0,0,0.6)]">
//                           <span className="inline-block align-top" dir="auto">
//                             <span
//                               className="min-w-0 max-w-full inline font-normal font-inherit text-[0.75rem] leading-4 text-[rgba(0,0,0,0.6)] wrap-break-word break-all whitespace-pre-line select-text"
//                               style={
//                                 {
//                                   "--x-fontSize": "12px",
//                                   "--x-lineHeight": "8.5313px",
//                                 } as CSSVars
//                               }
//                             >
//                               2:26 p.&nbsp;m.
//                             </span>
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <span></span>
//                   <div></div>
//                 </div>

//                 <div className="">
//                   <div className="">
//                     <div></div>
//                   </div>
//                 </div>

//                 <span aria-label="Este es un mensaje temporal"></span>
//               </div>

//               <div className=""></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   )

// }

// export function Componeteright () {
//   type CSSVars = React.CSSProperties & {
//     [key: `--${string}`]: string | number;
//   };
//   return (
//     <div>
//       <div className="relative pb-0.5">
//         <div className="flex flex-col">
//           <div>
//             <div className="flex items-end px-15.75 flex-col">
//               <span></span>

//               <div className="max-w-[60%] relative flex-none text-[14.2px] leading-4.75">
//                 <span
//                   className="absolute -right-1.75 text-[#D9FDD3]"
//                 >
//                   <svg 
//                   viewBox="0 0 8 13" 
//                   height="13" 
//                   width="8" 
//                   preserveAspectRatio="xMidYMid meet"
//                   version="1.1" x="0px" y="0px" enable-background="new 0 0 8 13">
//                     <path opacity="0.13" d="M5.188,1H0v11.193l6.467-8.625 C7.526,2.156,6.958,1,5.188,1z">
//                     </path>
//                     <path fill="currentColor" d="M5.188,0H0v11.193l6.467-8.625C7.526,1.156,6.958,0,5.188,0z">
//                     </path>
//                   </svg>
//                 </span>

//                 <div className="
//                   relative 
//                   z-200 
//                   rounded-[7.5px] 
//                   rounded-tr-none 
//                   bg-[#D9FDD3]
//                   shadow-[0_1px_0.5px_rgba(11,20,26,0.13)]
//                 ">
//                   <span aria-label="Marely:"></span>

//                   <div>
//                     <div className="pt-1.5 pb-2 ps-2.25 pe-1.75 box-border select-text">
//                       <div
//                         className=""
//                         data-pre-plain-text="[2:26 p. m., 26/1/2026] Marely: "
//                       >
//                         <div className="relative wrap-break-word whitespace-pre-wrap overflow-x-hidden overflow-y-hidden">
//                           <span
//                             data-testid="selectable-text"
//                             dir="ltr"
//                             className="visible select-text font-normal text-sm leading-5 tracking-[0.01rem]"
//                             style={{ minHeight: "0px" }}
//                           >
//                             {/* como hay mas de un sapam se le pone la clase block para bajar añ siguiente pero menos al ultimo spam */}
//                             <span>
//                               hola
//                             </span>
//                             <span>
//                               hola
//                             </span>
//                           </span>

//                           <span>
//                             <span aria-hidden="true" className="inline-flex h-0 pt-0 pb-0 align-middle invisible pe-1 ps-1 leading-3.75 text-[0.6875rem]">
//                               <span className="w-4.75 shrink-0 grow-0"></span>
//                               <span className="shrink-0 grow-0">2:26 p.&nbsp;m.</span>
//                             </span>
//                           </span>
//                         </div>
//                       </div>

//                       <div className="relative z-10 float-right -mt-2.5 -mb-1.25 ps-1 pe-0">
//                         <div className="flex items-center h-3.75 whitespace-nowrap cursor-pointer text-[0.6875rem] leading-3.75  text-[rgba(0,0,0,0.6)]">
//                           <span className="inline-block align-top" dir="auto">
//                             <span
//                               className="min-w-0 max-w-full inline font-normal font-inherit text-[0.75rem] leading-4 text-[rgba(0,0,0,0.6)] wrap-break-word break-all whitespace-pre-line select-text"
//                               style={
//                                 {
//                                   "--x-fontSize": "12px",
//                                   "--x-lineHeight": "8.5313px",
//                                 } as CSSVars
//                               }
//                             >
//                               2:26 p.&nbsp;m.
//                             </span>
//                           </span>
//                           <div 
//                           className="inline-block ps-0.75 text-[rgba(0,0,0,0.6)]"
//                           >
//                             <span aria-hidden="false" aria-label=" Leído " data-icon="msg-dblcheck" className="text-[#007BFC]"
//                             // los coles pueden alternar de #007BFC a  rgba(0, 0, 0, .6)
//                             >
//                               <svg viewBox="0 0 16 11" height="11" width="16" preserveAspectRatio="xMidYMid meet" fill="none">
//                                 <title>msg-dblcheck</title>
//                                 <path d="M11.0714 0.652832C10.991 0.585124 10.8894 0.55127 10.7667 0.55127C10.6186 0.55127 10.4916 0.610514 10.3858 0.729004L4.19688 8.36523L1.79112 6.09277C1.7488 6.04622 1.69802 6.01025 1.63877 5.98486C1.57953 5.95947 1.51817 5.94678 1.45469 5.94678C1.32351 5.94678 1.20925 5.99544 1.11192 6.09277L0.800883 6.40381C0.707784 6.49268 0.661235 6.60482 0.661235 6.74023C0.661235 6.87565 0.707784 6.98991 0.800883 7.08301L3.79698 10.0791C3.94509 10.2145 4.11224 10.2822 4.29844 10.2822C4.40424 10.2822 4.5058 10.259 4.60313 10.2124C4.70046 10.1659 4.78086 10.1003 4.84434 10.0156L11.4903 1.59863C11.5623 1.5013 11.5982 1.40186 11.5982 1.30029C11.5982 1.14372 11.5348 1.01888 11.4078 0.925781L11.0714 0.652832ZM8.6212 8.32715C8.43077 8.20866 8.2488 8.09017 8.0753 7.97168C7.99489 7.89128 7.8891 7.85107 7.75791 7.85107C7.6098 7.85107 7.4892 7.90397 7.3961 8.00977L7.10411 8.33984C7.01947 8.43717 6.97715 8.54508 6.97715 8.66357C6.97715 8.79476 7.0237 8.90902 7.1168 9.00635L8.1959 10.0791C8.33132 10.2145 8.49636 10.2822 8.69102 10.2822C8.79681 10.2822 8.89838 10.259 8.99571 10.2124C9.09304 10.1659 9.17556 10.1003 9.24327 10.0156L15.8639 1.62402C15.9358 1.53939 15.9718 1.43994 15.9718 1.32568C15.9718 1.1818 15.9125 1.05697 15.794 0.951172L15.4386 0.678223C15.3582 0.610514 15.2587 0.57666 15.1402 0.57666C14.9964 0.57666 14.8715 0.635905 14.7657 0.754395L8.6212 8.32715Z" fill="currentColor">
//                                 </path>
//                               </svg>
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <span></span>
//                   <div>
//                   </div>
//                 </div>

//                 <div className="">
//                   <div className="">
//                     <div></div>
//                   </div>
//                 </div>

//                 <span aria-label="Este es un mensaje temporal"></span>
//               </div>

//               <div className=""></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   )

// }
