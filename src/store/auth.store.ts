import type { CurrentUser } from '@/interfaces/auth.interface';
import { create } from 'zustand';

const userLocal = localStorage.getItem("user");

let parsedUser: CurrentUser | null = null;
if (userLocal && userLocal !== "undefined") {
  try {
    parsedUser = JSON.parse(userLocal) as CurrentUser;
  } catch (error) {
    console.error("Lỗi parse user từ localStorage:", error);
    parsedUser = null;
  }
}

type AuthStore = {
  user: CurrentUser | null;
  setUser: (user: CurrentUser) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: parsedUser, // giá trị ban đầu
  setUser: (user: CurrentUser) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
      console.log("user", user)
    }
  },
  clearUser: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
