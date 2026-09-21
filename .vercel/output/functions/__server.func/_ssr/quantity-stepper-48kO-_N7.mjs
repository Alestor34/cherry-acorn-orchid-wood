import { t as cn } from "./utils-CYBaDj9o.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { d as Minus, s as Plus } from "../_libs/lucide-react.mjs";
import { s as toFaDigits } from "./persian-CmQp06wC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quantity-stepper-48kO-_N7.js
var import_jsx_runtime = require_jsx_runtime();
function QuantityStepper({ value, onChange, min = 1, max = 99, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex h-11 items-center rounded-md border border-line bg-paper", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-11 items-center justify-center text-ink disabled:text-muted",
				onClick: () => onChange(Math.max(min, value - 1)),
				disabled: value <= min,
				"aria-label": "کاهش تعداد",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "min-w-8 text-center tabular-nums text-sm font-medium",
				children: toFaDigits(value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "flex size-11 items-center justify-center text-ink disabled:text-muted",
				onClick: () => onChange(Math.min(max, value + 1)),
				disabled: value >= max,
				"aria-label": "افزایش تعداد",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
			})
		]
	});
}
//#endregion
export { QuantityStepper as t };
