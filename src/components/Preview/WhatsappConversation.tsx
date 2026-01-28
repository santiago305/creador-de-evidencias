import { useMemo, type ReactNode } from "react";
import bgWhatsapp from "../../assets/1.png";
import { WhatsappInputBar } from "./WhatsappInputBar";
import type { WhatsappData } from "./whatsappTypes";
import respuestasClienteData from "../../data/respuestasCliente.json";
import respuestasContinuacionAsesorData from "../../data/respuestasContinuacionAsesor.json";
import {
  MessageGroup,
  EncryptedMessage,
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

function getFirstName(fullName: string) {
  const cleaned = fullName.trim();
  if (!cleaned) return "";
  return cleaned.split(/\s+/)[0] ?? "";
}

function formatMoneyValue(value: string, useThousands: boolean) {
  const cleaned = value.replace(/[^0-9.,-]/g, "").trim();
  if (!cleaned) return null;

  const normalized = cleaned.replace(/,/g, "");
  const numberValue = Number.parseFloat(normalized);
  if (Number.isNaN(numberValue)) return null;

  return numberValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: useThousands,
  });
}

function linesToSpans(lines: ReactNode[]) {
  return lines.map((line, idx) => {
    const key =
      typeof line === "string" ? `${idx}-${line.slice(0, 8)}` : `${idx}`;
    return <span key={key}>{line}</span>;
  });
}

export function WhatsappConversation({
  data,
  messageStatus,
}: {
  data: WhatsappData;
  messageStatus?: MsgStatus;
}) {
  const messages = useMemo(() => {
    const seed = Math.floor((Date.now() + Math.random() * 1_000_000) % 1_000_000_000);
    const rng = mulberry32(seed);

    const baseDate = parseLocalDateTime(data.fechaHora) ?? new Date();
    const { saludo, tramo } = getTimeOfDayParts(baseDate);

    const nombreCliente = data.nombre?.trim() ? data.nombre.trim() : "Pedro Vazquez";
    const nombreAsesor = data.nombreAsesor?.trim()
      ? data.nombreAsesor.trim()
      : "Maria Perez";
    const nombreAsesorFirst = getFirstName(nombreAsesor) || "Maria";



    const firma = "Asesora de Impulsa A365";

    const firstMessageLines = [
      `${saludo} Sr(a) ${nombreCliente}.`,
      `Le saluda ${nombreAsesor} de la empresa Impulsa A365 por encargo del Banco de la Nacion.`,
      `Ha sido un gusto contactarlo y de acuerdo con la llamada telefonica que tuvimos en la ${tramo}, puede acercarse a la agencia mas cercana con su DNI, boleta de pago y tarjeta Multired para realizar el desembolso y asi pueda aprovechar esta super promocion.`,
      "Desea que le envie por este medio, la propuesta que hoy conversamos?",
      "Cualquier consulta, estoy para apoyarlo.",
      `${nombreAsesor}`,
      firma,
    ];

    const respuestasCliente = respuestasClienteData;
    const normalizeReply = (lines: string[]) =>
      lines.map((line) => line.replace(/\{asesor\}/g, nombreAsesorFirst));

    const continuacionesAsesor = respuestasContinuacionAsesorData;

    const useThousandsMonto = rng() < 0.5;
    const useThousandsCuota = rng() < 0.5;

    const formattedMonto = data.monto?.trim()
      ? formatMoneyValue(data.monto, useThousandsMonto)
      : null;
    const formattedCuota = data.cuota?.trim()
      ? formatMoneyValue(data.cuota, useThousandsCuota)
      : null;

    const detalleBase: ReactNode[] = [
      "Simulación:",
      formattedMonto ? (
        <>
          Monto: <strong>S/{formattedMonto}</strong>
        </>
      ) : (
        <>
          Monto: <strong>N/A</strong>
        </>
      ),
      data.tasa?.trim() ? (
        <>
          Tasa: <strong>{data.tasa} %</strong>
        </>
      ) : (
        <>
          Tasa: <strong>N/A</strong>
        </>
      ),
      formattedCuota ? (
        <>
          Cuota: <strong>S/ {formattedCuota}</strong>
        </>
      ) : (
        <>
          Cuota: <strong>N/A</strong>
        </>
      ),
      data.plazo?.trim() ? (
        <>
          Plazo: <strong>{data.plazo} meses</strong>
        </>
      ) : (
        <>
          Plazo: <strong>N/A</strong>
        </>
      ),
    ];

    const statusForMessages: MsgStatus =
      messageStatus ?? (rng() < 0.7 ? "read" : "delivered");

    const replyLines = normalizeReply(pick(respuestasCliente, rng));
    const replyGapMinCount = Math.max(replyLines.length - 1, 0);

    const minTotal = replyGapMinCount + 3;
    const minAllowed = Math.max(4, minTotal);
    const maxAllowed = 7;
    const totalMinutes =
      minAllowed <= maxAllowed
        ? minAllowed + Math.floor(rng() * (maxAllowed - minAllowed + 1))
        : 7;

    const gapsCount = 3 + replyGapMinCount;
    const remaining = Math.max(0, totalMinutes - minTotal);
    const gapExtras = Array.from({ length: gapsCount }, () => 0);
    for (let i = 0; i < remaining; i += 1) {
      const idx = Math.floor(rng() * gapsCount);
      gapExtras[idx] += 1;
    }

    const gap1 = 1 + (gapExtras[0] ?? 0);
    const replyGaps = Array.from({ length: replyGapMinCount }, (_, i) => {
      return 1 + (gapExtras[i + 1] ?? 0);
    });
    const gap2 = 1 + (gapExtras[1 + replyGapMinCount] ?? 0);
    const gap3 = 1 + (gapExtras[2 + replyGapMinCount] ?? 0);

    const t1 = new Date(baseDate);
    const t2 = new Date(baseDate);
    t2.setMinutes(t2.getMinutes() + gap1);
    const t3 = new Date(t2);
    const replyGapTotal = replyGaps.reduce((sum, gap) => sum + gap, 0);
    t3.setMinutes(t3.getMinutes() + replyGapTotal + gap2);
    const t4 = new Date(t3);
    t4.setMinutes(t4.getMinutes() + gap3);
    const replyMessages = replyLines.map((line, idx) => {
      const time = new Date(t2);
      const offset = replyGaps
        .slice(0, idx)
        .reduce((sum, gap) => sum + gap, 0);
      time.setMinutes(time.getMinutes() + offset);
      return {
        side: "in" as const,
        time: formatTimeShort(time),
        lines: [line],
      };
    });

    const baseMessages: {
      side: "in" | "out";
      time: string;
      lines: ReactNode[];
      status?: MsgStatus;
    }[] = [
      {
        side: "out" as const,
        time: formatTimeShort(t1),
        status: statusForMessages,
        lines: firstMessageLines,
      },
      ...replyMessages,
      {
        side: "out" as const,
        time: formatTimeShort(t3),
        status: statusForMessages,
        lines: [pick(continuacionesAsesor, rng)],
      },
      {
        side: "out" as const,
        time: formatTimeShort(t4),
        status: statusForMessages,
        lines: detalleBase,
      },
    ];

    return baseMessages;
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
              <EncryptedMessage />
            
              {messages.map((msg, idx) => {
                const prev = messages[idx - 1];
                const isFirst = !prev || prev.side !== msg.side;
                const groupKey = `${msg.side}-${idx}`;

                if (!isFirst) return null;

                const group = [msg];
                for (let i = idx + 1; i < messages.length; i += 1) {
                  if (messages[i].side !== msg.side) break;
                  group.push(messages[i]);
                }

                return (
                  <MessageGroup key={groupKey}>
                    {group.map((item, itemIdx) => (
                      <Bubble
                        key={`${groupKey}-${itemIdx}`}
                        side={item.side}
                        firstInGroup={itemIdx === 0}
                        time={item.time}
                        status={item.status}
                      >
                        {linesToSpans(item.lines)}
                      </Bubble>
                    ))}
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
