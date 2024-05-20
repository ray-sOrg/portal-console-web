import { create } from "zustand";
import { Page, User } from "types";

interface UserListStore {
  isModalOpen: boolean;
  loading: boolean;
  page: Page;
  keyword: string;
  userList: User[];
  total: number;
  setIsModalOpen: (isModalOpen: boolean) => void;
  setLoading: (loading: boolean) => void;
  setPage: (page: Page) => void;
  setKeyword: (keyword: string) => void;
}

const useUserListStore = create<UserListStore>(set => ({
  isModalOpen: false,
  loading: true,
  page: { pageNumber: 1, pageSize: 10 },
  keyword: "",
  userList: [],
  total: 0,
  setIsModalOpen: isModalOpen => set({ isModalOpen }),
  setLoading: loading => set({ loading }),
  setPage: page => set(state => ({ ...state.page, page })),
  setKeyword: keyword => set({ keyword })
}));

export default useUserListStore;
