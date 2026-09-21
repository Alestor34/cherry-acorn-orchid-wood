import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as Label, t as Input } from "./label-BrmqiiCH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/image-field-BzJum9bZ.js
var import_jsx_runtime = require_jsx_runtime();
async function fileToJpegDataUrl(file, maxWidth = 1200, quality = .8) {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, maxWidth / bitmap.width);
	const width = Math.round(bitmap.width * scale);
	const height = Math.round(bitmap.height * scale);
	const canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext("2d");
	if (!ctx) throw new Error("canvas");
	ctx.drawImage(bitmap, 0, 0, width, height);
	return canvas.toDataURL("image/jpeg", quality);
}
function ImageField({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }),
		value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: value,
			alt: "",
			className: "mb-2 h-28 w-full rounded-md object-cover"
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "file",
			accept: "image/*",
			onChange: async (e) => {
				const file = e.target.files?.[0];
				if (!file) return;
				onChange(await fileToJpegDataUrl(file));
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "mt-2",
			value: value.startsWith("data:") ? "" : value,
			placeholder: "یا آدرس تصویر",
			onChange: (e) => onChange(e.target.value)
		})
	] });
}
//#endregion
export { ImageField as t };
