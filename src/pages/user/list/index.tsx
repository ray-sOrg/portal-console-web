import { Subscription } from "rxjs";
import { useDebounceEffect } from "ahooks";
import userListStore from "./userListContext";
import Table from "./table";
import AddModal from "./add-user-modal";
import Toolbar from "./toolbar";
import useUserList from "./useUserList";

function User() {
  const { keyword, page, isModalOpen, setIsModalOpen } = userListStore();
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

  const handleOk = () => {
    setIsModalOpen(false);
    fetch();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "12px" }}>
      <AddModal
        isModalOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
      <Toolbar />
      <Table />
    </div>
  );
}

export default User;
