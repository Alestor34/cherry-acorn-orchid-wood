import { useQuery } from "@tanstack/react-query";
import { getAdminData } from "@/lib/functions/admin";

export function useAdminData() {
  return useQuery({
    queryKey: ["admin-data"],
    queryFn: () => getAdminData(),
  });
}
