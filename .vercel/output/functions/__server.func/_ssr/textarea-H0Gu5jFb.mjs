import { t as cn } from "./utils-CYBaDj9o.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/textarea-H0Gu5jFb.js
var import_jsx_runtime = require_jsx_runtime();
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		dir: "ltr",
		className: cn("peer inline-flex h-7 w-12 shrink-0 items-center rounded-full border border-line bg-line", "data-[state=checked]:border-green data-[state=checked]:bg-green", "transition-[background-color] duration-150 focus-visible:ring-2 focus-visible:ring-orange/35", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-paper shadow-card transition-transform duration-150 data-[state=checked]:translate-x-5" })
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-28 w-full rounded-md border border-line bg-paper px-3 py-2.5 text-base text-ink outline-none", "placeholder:text-muted focus-visible:ring-2 focus-visible:ring-orange/35", className),
		...props
	});
}
//#endregion
export { Textarea as n, Switch as t };
