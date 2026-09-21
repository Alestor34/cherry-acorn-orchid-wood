import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-CYBaDj9o.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function parseJsonArray(value) {
	if (!value) return [];
	try {
		const parsed = JSON.parse(value);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((item) => typeof item === "string");
	} catch {
		return [];
	}
}
function parseJsonObject(value) {
	if (!value) return {};
	try {
		const parsed = JSON.parse(value);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
		const out = {};
		for (const [k, v] of Object.entries(parsed)) if (typeof v === "string") out[k] = v;
		return out;
	} catch {
		return {};
	}
}
//#endregion
export { parseJsonArray as n, parseJsonObject as r, cn as t };
