import { t as cn } from "./utils-CYBaDj9o.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-CPuZPRKB.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "orange", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium", {
			orange: "bg-orange-soft text-orange-dark",
			green: "bg-green-soft text-green-dark",
			red: "bg-accent-red-soft text-accent-red",
			muted: "bg-line/70 text-muted"
		}[tone], className),
		children
	});
}
//#endregion
export { Badge as t };
