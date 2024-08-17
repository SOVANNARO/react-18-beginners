import { create } from "zustand";

interface AuthStore {
  user: string;
  login: (username: string) => void;
  logout: () => void;
}

const userAuthStore = create<AuthStore>((set) => ({
  user: "",
  login: (username: string) => set((state) => ({ ...state, user: username })),
  logout: () => set((state) => ({ ...state, user: "" })),
}));

export default userAuthStore;
