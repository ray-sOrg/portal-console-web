import { create } from "zustand";
import { Page, WeddingImage } from "@/types";

interface Credentials {
  dir: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}
interface WeddingImageListStore {
  credentials: null | Credentials;
  isModalOpen: boolean;
  loading: boolean;
  page: Page;
  keyword: string;
  list: WeddingImage[];
  total: number;
  setCredentials: (credentials: Credentials) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  setPage: (page: Page) => void;
  setKeyword: (keyword: string) => void;
}

const useWeddingImageListStore = create<WeddingImageListStore>(set => ({
  credentials: null,
  isModalOpen: false,
  loading: true,
  page: { pageNumber: 1, pageSize: 20 },
  keyword: "",
  list: [],
  total: 0,
  setCredentials: (credentials: Credentials) => set({ credentials }),
  setIsModalOpen: isModalOpen => set({ isModalOpen }),
  setLoading: loading => set({ loading }),
  setPage: page => set(state => ({ ...state.page, page })),
  setKeyword: keyword => set({ keyword })
}));

export default useWeddingImageListStore;
