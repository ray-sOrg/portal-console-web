import { create } from "zustand";
import { Page, WeddingImage } from "@/types";

interface WeddingImageListStore {
  isModalOpen: boolean;
  loading: boolean;
  page: Page;
  keyword: string;
  list: WeddingImage[];
  total: number;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  setPage: (page: Page) => void;
  setKeyword: (keyword: string) => void;
}

const useWeddingImageListStore = create<WeddingImageListStore>(set => ({
  isModalOpen: false,
  loading: true,
  page: { pageNumber: 1, pageSize: 20 },
  keyword: "",
  list: [],
  total: 0,
  setIsModalOpen: isModalOpen => set({ isModalOpen }),
  setLoading: loading => set({ loading }),
  setPage: page => set(state => ({ ...state.page, page })),
  setKeyword: keyword => set({ keyword })
}));

export default useWeddingImageListStore;
