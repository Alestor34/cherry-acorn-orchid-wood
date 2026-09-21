//#region node_modules/.nitro/vite/services/ssr/assets/persian-CmQp06wC.js
var FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
function toFaDigits(value) {
	return String(value).replace(/\d/g, (d) => FA_DIGITS[Number(d)] ?? d);
}
function toEnDigits(value) {
	return value.replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)));
}
function formatToman(amount) {
	return `${toFaDigits(Math.round(amount).toLocaleString("en-US"))} تومان`;
}
function formatPhoneDisplay(phone) {
	let national = toEnDigits(phone).replace(/\D/g, "");
	if (national.startsWith("98")) national = "0" + national.slice(2);
	if (national.startsWith("0098")) national = "0" + national.slice(4);
	if (national.length === 10 && national.startsWith("9")) national = "0" + national;
	if (national.length === 11 && national.startsWith("09")) return toFaDigits(`${national.slice(0, 4)} ${national.slice(4, 7)} ${national.slice(7)}`);
	return toFaDigits(phone);
}
function toTelHref(phone) {
	const digits = toEnDigits(phone).replace(/\D/g, "");
	if (digits.startsWith("98")) return `tel:+${digits}`;
	if (digits.startsWith("0") && digits.length === 11) return `tel:+98${digits.slice(1)}`;
	if (digits.startsWith("9") && digits.length === 10) return `tel:+98${digits}`;
	return `tel:${phone}`;
}
function toWhatsAppHref(phone, text) {
	let intl = toEnDigits(phone).replace(/\D/g, "");
	if (intl.startsWith("0") && intl.length === 11) intl = "98" + intl.slice(1);
	if (intl.startsWith("9") && intl.length === 10) intl = "98" + intl;
	const url = `https://wa.me/${intl}`;
	return text ? `${url}?text=${encodeURIComponent(text)}` : url;
}
function instagramUrl(id) {
	return `https://www.instagram.com/${id.replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "")}`;
}
function div(a, b) {
	return Math.floor(a / b);
}
function gregorianToJalali(gy, gm, gd) {
	const g_d_n = [
		0,
		31,
		59,
		90,
		120,
		151,
		181,
		212,
		243,
		273,
		304,
		334
	];
	let gy2 = gm > 2 ? gy + 1 : gy;
	let days = 355666 + 365 * gy + div(gy2 + 3, 4) - div(gy2 + 99, 100) + div(gy2 + 399, 400) + gd + g_d_n[gm - 1];
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
	return [
		jy,
		jm,
		jd
	];
}
function formatJalaliDate(date = /* @__PURE__ */ new Date()) {
	const [jy, jm, jd] = gregorianToJalali(date.getFullYear(), date.getMonth() + 1, date.getDate());
	const pad = (n) => String(n).padStart(2, "0");
	return toFaDigits(`${jy}/${pad(jm)}/${pad(jd)}`);
}
function formatJalaliDateTime(date = /* @__PURE__ */ new Date()) {
	const time = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
	return `${formatJalaliDate(date)}  ${toFaDigits(time)}`;
}
function formatJalaliFromIso(iso) {
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
//#endregion
export { instagramUrl as a, toTelHref as c, formatToman as i, toWhatsAppHref as l, formatJalaliFromIso as n, toEnDigits as o, formatPhoneDisplay as r, toFaDigits as s, formatJalaliDateTime as t };
