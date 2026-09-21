const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function toFaDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

export function toEnDigits(value: string): string {
  return value.replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)));
}

export function formatToman(amount: number): string {
  const formatted = Math.round(amount).toLocaleString("en-US");
  return `${toFaDigits(formatted)} تومان`;
}

export function formatPhoneDisplay(phone: string): string {
  const digits = toEnDigits(phone).replace(/\D/g, "");
  let national = digits;
  if (national.startsWith("98")) national = "0" + national.slice(2);
  if (national.startsWith("0098")) national = "0" + national.slice(4);
  if (national.length === 10 && national.startsWith("9")) national = "0" + national;
  if (national.length === 11 && national.startsWith("09")) {
    return toFaDigits(`${national.slice(0, 4)} ${national.slice(4, 7)} ${national.slice(7)}`);
  }
  return toFaDigits(phone);
}

export function toTelHref(phone: string): string {
  const digits = toEnDigits(phone).replace(/\D/g, "");
  if (digits.startsWith("98")) return `tel:+${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `tel:+98${digits.slice(1)}`;
  if (digits.startsWith("9") && digits.length === 10) return `tel:+98${digits}`;
  return `tel:${phone}`;
}

export function toWhatsAppHref(phone: string, text?: string): string {
  const digits = toEnDigits(phone).replace(/\D/g, "");
  let intl = digits;
  if (intl.startsWith("0") && intl.length === 11) intl = "98" + intl.slice(1);
  if (intl.startsWith("9") && intl.length === 10) intl = "98" + intl;
  const url = `https://wa.me/${intl}`;
  return text ? `${url}?text=${encodeURIComponent(text)}` : url;
}

export function instagramUrl(id: string): string {
  const handle = id.replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "");
  return `https://www.instagram.com/${handle}`;
}

function div(a: number, b: number) {
  return Math.floor(a / b);
}

export function gregorianToJalali(gy: number, gm: number, gd: number): [number, number, number] {
  const g_d_n = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  let gy2 = gm > 2 ? gy + 1 : gy;
  let days =
    355666 +
    365 * gy +
    div(gy2 + 3, 4) -
    div(gy2 + 99, 100) +
    div(gy2 + 399, 400) +
    gd +
    g_d_n[gm - 1];
  let jy = -1595 + 33 * div(days, 12053);
  days %= 12053;
  jy += 4 * div(days, 1461);
  days %= 1461;
  if (days > 365) {
    jy += div(days - 1, 365);
    days = (days - 1) % 365;
  }
  const jm = days < 186 ? 1 + div(days, 31) : 7 + div(days - 186, 30);
  const jd = 1 + (days < 186 ? days % 31 : (days - 186) % 30);
  return [jy, jm, jd];
}

export function formatJalaliDate(date = new Date()): string {
  const [jy, jm, jd] = gregorianToJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const pad = (n: number) => String(n).padStart(2, "0");
  return toFaDigits(`${jy}/${pad(jm)}/${pad(jd)}`);
}

export function formatJalaliDateTime(date = new Date()): string {
  const time = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  return `${formatJalaliDate(date)}  ${toFaDigits(time)}`;
}

export function formatJalaliFromIso(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
    if (!m) return toFaDigits(iso);
    const [jy, jm, jd] = gregorianToJalali(Number(m[1]), Number(m[2]), Number(m[3]));
    return toFaDigits(`${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`);
  }
  return formatJalaliDate(d);
}
