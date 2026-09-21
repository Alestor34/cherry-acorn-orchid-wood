import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { o as getAdminData } from "./admin-i7IBbW5w.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-query-DQSxaPyT.js
function useAdminData() {
	return useQuery({
		queryKey: ["admin-data"],
		queryFn: () => getAdminData()
	});
}
//#endregion
export { useAdminData as t };
