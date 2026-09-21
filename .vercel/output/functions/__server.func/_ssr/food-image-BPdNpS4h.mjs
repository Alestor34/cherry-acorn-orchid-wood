import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-CYBaDj9o.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/food-image-BPdNpS4h.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FoodImage({ src, alt, className, imgClassName, priority = false }) {
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("bg-orange-soft/60", className),
		"aria-hidden": true
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative overflow-hidden bg-orange-soft/50", className),
		children: [!loaded && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 animate-pulse bg-line/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src,
			alt,
			loading: priority ? "eager" : "lazy",
			fetchPriority: priority ? "high" : "auto",
			decoding: "async",
			onLoad: () => setLoaded(true),
			className: cn("size-full object-cover transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0", imgClassName)
		})]
	});
}
//#endregion
export { FoodImage as t };
