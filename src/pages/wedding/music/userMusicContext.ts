import { create } from "zustand";
import { Page, WeddingMusic } from "@/types";

interface WeddingMusicListStore {
  isModalOpen: boolean;
  loading: boolean;
  page: Page;
  keyword: string;
  list: WeddingMusic[];
  total: number;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  setPage: (page: Page) => void;
  setKeyword: (keyword: string) => void;
}

const useUserListStore = create<WeddingMusicListStore>(set => ({
  isModalOpen: false,
  loading: true,
  page: { pageNumber: 1, pageSize: 10 },
  keyword: "",
  list: [],
  total: 0,
  setIsModalOpen: isModalOpen => set({ isModalOpen }),
  setLoading: loading => set({ loading }),
  setPage: page => set(state => ({ ...state.page, page })),
  setKeyword: keyword => set({ keyword })
}));

export default useUserListStore;
