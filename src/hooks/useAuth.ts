"use client";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    token,
    user: storedUser,
    isAuthenticated,
    setToken,
    setUser,
    logout: storeLogout,
  } = useAuthStore();

  const loginMutation = useLogin();
  const { data: freshUser } = useUser();

  const user = freshUser || storedUser;

  useEffect(() => {
    if (freshUser) {
      setUser(freshUser);
    }
  }, [freshUser, setUser]);

  const login = async (email: string, password: string) => {
    const result = await loginMutation.mutateAsync({ email, password });
    setToken(result.token);
    router.push("/dashboard");
  };

  const logout = () => {
    storeLogout();
    queryClient.clear();
    document.cookie = "auth-token=; path=/; max-age=0";
    router.push("/login");
  };

  return {
    token,
    user,
    isAuthenticated,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message || null,
    login,
    logout,
    clearError: () => loginMutation.reset(),
  };
}
