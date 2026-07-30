import { useQuery } from "@tanstack/react-query";
import { authService } from "@/services/auth";
import { useAuthStore } from "@/stores/auth.store";

export function useUser() {
  const token = useAuthStore((s) => s.token);

  return useQuery({
    queryKey: ["user"],
    queryFn: () => authService.getCurrentUser(),
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
