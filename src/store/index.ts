import { create } from "zustand";

import type { User } from "@/types";

interface Credentials {
  dir: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}
interface GLobalStore {
  user: User | null;
  credentials: Credentials | null;
  setCredentials: (params: Credentials) => void;
  setUser: (params: User) => void;
  clearUser: () => void;
}

const useGlobalStore = create<GLobalStore>(set => ({
  user: null,
  credentials: null,
  setCredentials: (credentials: Credentials) => set({ credentials }),
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null })
}));

export default useGlobalStore;
