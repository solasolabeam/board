import { create } from "zustand";

export interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

export interface User {
  username: string;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
