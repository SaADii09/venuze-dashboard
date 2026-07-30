import api from "@/lib/api";
import type { LoginRequest, LoginResponse, User } from "@/types/user";

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>("/login", credentials);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<User>("/users/2");
    return response.data;
  },

  async logout(): Promise<void> {
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-storage");
      document.cookie = "auth-token=; path=/; max-age=0";
    }
  },
};
