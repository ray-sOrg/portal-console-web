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
  deleteLoading: boolean;
  page: Page;
  keyword: string;
  list: WeddingImage[];
  total: number;
  setCredentials: (credentials: Credentials) => void;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  setDeleteLoading: (loading: boolean) => void;
  setPage: (page: Page) => void;
  setKeyword: (keyword: string) => void;
}

const useWeddingImageListStore = create<WeddingImageListStore>(set => ({
  credentials: null,
  isModalOpen: false,
  loading: true,
  deleteLoading: false,
  page: { pageNumber: 1, pageSize: 20 },
  keyword: "",
  list: [],
  total: 0,
  setCredentials: (credentials: Credentials) => set({ credentials }),
  setIsModalOpen: isModalOpen => set({ isModalOpen }),
  setLoading: loading => set({ loading }),
  setDeleteLoading: deleteLoading => set({ deleteLoading }),
  setPage: page => set(state => ({ ...state.page, page })),
  setKeyword: keyword => set({ keyword })
}));

export default useWeddingImageListStore;
