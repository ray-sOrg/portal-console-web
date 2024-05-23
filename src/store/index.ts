import { create } from "zustand";

import type { User } from "types";

interface GLobalStore {
  user: User | null;
  setUser: (params: User) => void;
  clearUser: () => void;
}

const useGlobalStore = create<GLobalStore>(set => ({
  user: null,

  setUser: (user: User) => set({ user }),

  clearUser: () => set({ user: null })
}));

export default useGlobalStore;
