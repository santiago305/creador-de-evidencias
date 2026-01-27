import { useMemo } from "react";
import type { WhatsappData } from "./whatsappTypes";

type Status =
  | { type: "hidden" }
  | { type: "online" }
  | { type: "lastSeen"; text: string };

export function WhatsappHeaderUser({ data }: { data: WhatsappData }) {
  const status = useMemo<Status>(() => {
    const r = Math.random();

    // 20%: no mostrar nada
    if (r < 0.2) return { type: "hidden" };

    // 25%: mostrar "en línea"
    if (r < 0.45) return { type: "online" };

    // 55%: mostrar "últ. vez ..."
    const now = new Date();
    const minutesNow = now.getHours() * 60 + now.getMinutes();

    // 65% hoy, 35% ayer
    const showToday = Math.random() >= 0.35;

    const target = new Date(now);
    const randomMinutes = showToday
      ? Math.floor(Math.random() * (minutesNow + 1)) // nunca pasa la hora actual
      : Math.floor(Math.random() * 24 * 60); // cualquier hora del día

    if (!showToday) target.setDate(now.getDate() - 1);

    // reset a medianoche y luego setea minutos aleatorios
    target.setHours(0, 0, 0, 0);
    target.setMinutes(randomMinutes);

    const hours24 = target.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = String(target.getMinutes()).padStart(2, "0");
    const period = hours24 >= 12 ? "p. m." : "a. m.";
    const time = `${hours12}:${minutes} ${period}`;

    const text = showToday
      ? `últ. vez hoy a la(s) ${time}`
      : `ayer a la(s) ${time}`;

    return { type: "lastSeen", text };
  }, [data]);

  return (
    <div className="w-full bg-white px-3 py-2 border-b border-black/10">
      <div className="flex items-center justify-between gap-2">
        {/* Left: avatar + name + status */}
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Avatar */}
          <div className="h-9 w-9 rounded-full overflow-hidden shrink-0">
            <span
              aria-hidden="true"
              data-icon="default-contact-refreshed"
              className="text-black"
            >
              <svg
                viewBox="0 0 48 48"
                height="212"
                width="212"
                preserveAspectRatio="xMidYMid meet"
                className="rounded-3xl w-full h-full bg-[#F7F5F3] flex justify-center items-center border border-[#e0dfde]"
                fill="none"
              >
                <title>default-contact-refreshed</title>
                <path
                  d="M24 23q-1.857 0-3.178-1.322Q19.5 20.357 19.5 18.5t1.322-3.178T24 14t3.178 1.322Q28.5 16.643 28.5 18.5t-1.322 3.178T24 23m-6.75 10q-.928 0-1.59-.66-.66-.662-.66-1.59v-.9q0-.956.492-1.758A3.3 3.3 0 0 1 16.8 26.87a16.7 16.7 0 0 1 3.544-1.308q1.8-.435 3.656-.436 1.856 0 3.656.436T31.2 26.87q.816.422 1.308 1.223T33 29.85v.9q0 .928-.66 1.59-.662.66-1.59.66z"
                  fill="#606263"
                  className="xvt3oi1"
                ></path>
              </svg>
            </span>
          </div>

          {/* Name + status */}
          <div className="min-w-0 leading-tight">
            <div className="text-[13px] font-normal text-[#111b21] truncate">
              {data.nombre?.trim() ? data.nombre : "Aracely MD"}
            </div>

            {/* Status line: online / last seen / hidden */}
            {status.type !== "hidden" && (
              <div
                className={`text-[9px] truncate ${
                  status.type === "online"
                    ? "text-[#667781] font-medium"
                    : "text-[#667781]"
                }`}
              >
                {status.type === "online" ? "en línea" : status.text}
              </div>
            )}
          </div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-1 shrink-0 text-[#54656f]">
          {/* Video */}
          <span
            aria-hidden="true"
            data-icon="video-call-refreshed"
            className="text-black w-5 h-5"
          >
            <svg
              viewBox="0 0 24 24"
              height="20"
              width="20"
              preserveAspectRatio="xMidYMid meet"
              fill="none"
            >
              <title>video-call-refreshed</title>
              <path
                d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H16C16.55 4 17.0208 4.19583 17.4125 4.5875C17.8042 4.97917 18 5.45 18 6V10.5L21.15 7.35C21.3167 7.18333 21.5 7.14167 21.7 7.225C21.9 7.30833 22 7.46667 22 7.7V16.3C22 16.5333 21.9 16.6917 21.7 16.775C21.5 16.8583 21.3167 16.8167 21.15 16.65L18 13.5V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H4ZM4 18H16V6H4V18Z"
                fill="currentColor"
              />
            </svg>
          </span>

          {/* Arrow */}
          <span aria-hidden="true" className="text-black">
            <svg viewBox="0 0 24 24" height="16" preserveAspectRatio="xMidYMid meet" fill="none">
              <title>ic-arrow-drop-down</title>
              <path
                d="M11.475 14.475L7.85001 10.85C7.80001 10.8 7.76251 10.7458 7.73751 10.6875C7.71251 10.6292 7.70001 10.5667 7.70001 10.5C7.70001 10.3667 7.74585 10.25 7.83751 10.15C7.92918 10.05 8.05001 10 8.20001 10H15.8C15.95 10 16.0708 10.05 16.1625 10.15C16.2542 10.25 16.3 10.3667 16.3 10.5C16.3 10.5333 16.25 10.65 16.15 10.85L12.525 14.475C12.4417 14.5583 12.3583 14.6167 12.275 14.65C12.1917 14.6833 12.1 14.7 12 14.7C11.9 14.7 11.8083 14.6833 11.725 14.65C11.6417 14.6167 11.5583 14.5583 11.475 14.475Z"
                fill="currentColor"
              />
            </svg>
          </span>

          {/* Search */}
          <span
            aria-hidden="true"
            data-icon="search-refreshed"
            className="w-6 h-6 text-black ml-2"
          >
            <svg viewBox="0 0 24 24" height="22" width="22" preserveAspectRatio="xMidYMid meet" fill="none">
              <title>search-refreshed</title>
              <path
                d="M9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L20.3 18.9C20.4833 19.0833 20.575 19.3167 20.575 19.6C20.575 19.8833 20.4833 20.1167 20.3 20.3C20.1167 20.4833 19.8833 20.575 19.6 20.575C19.3167 20.575 19.0833 20.4833 18.9 20.3L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                fill="currentColor"
              />
            </svg>
          </span>

          {/* Menu */}
          <button
            type="button"
            className="h-9 w-9 grid place-items-center rounded-full hover:bg-black/5 active:bg-black/10 transition text-black"
            aria-label="Menú"
            title="Menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.6" />
              <circle cx="12" cy="12" r="1.6" />
              <circle cx="12" cy="19" r="1.6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
