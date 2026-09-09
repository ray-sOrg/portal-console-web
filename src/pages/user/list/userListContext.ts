import { create } from "zustand";
import { Page, User } from "@/types";

interface UserListStore {
  loading: boolean;
  page: Page;
  keyword: string;
  userList: User[];
  total: number;
  setLoading: (loading: boolean) => void;
  setPage: (page: Page) => void;
  setKeyword: (keyword: string) => void;
}

const useUserListStore = create<UserListStore>(set => ({
  loading: true,
  page: { pageNumber: 1, pageSize: 10 },
  keyword: "",
  userList: [],
  total: 0,
  setLoading: loading => set({ loading }),
  setPage: page => set(state => ({ ...state.page, page })),
  setKeyword: keyword => set({ keyword })
}));

export default useUserListStore;
