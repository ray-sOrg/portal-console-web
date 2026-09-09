import { Subscription } from "rxjs";
import { useDebounceEffect } from "ahooks";
import userListStore from "./userListContext";
import Table from "./table";
import Toolbar from "./toolbar";
import useUserList from "./useUserList";

function User() {
  const { keyword, page } = userListStore();
  const { fetch } = useUserList();

  useDebounceEffect(
    () => {
      const subscription: Subscription | null = fetch();
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    },
    [page, keyword],
    { leading: true }
  );

  return (
    <div style={{ padding: "12px" }}>
      <Toolbar />
      <Table />
    </div>
  );
}

export default User;
