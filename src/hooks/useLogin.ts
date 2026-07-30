import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth";
import type { LoginRequest } from "@/types/user";

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
  });
}
