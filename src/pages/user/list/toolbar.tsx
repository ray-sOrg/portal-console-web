import { Flex, Button, Input } from "antd";
import { PlusOutlined, SyncOutlined } from "@ant-design/icons";
import userListStore from "./userListContext";
import useUserList from "./useUserList";

const { Search } = Input;

function Toolbar() {
  const { keyword, setKeyword, setIsModalOpen } = userListStore();
  const { fetch } = useUserList();

  const handleOpenAddUserModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Flex
      style={{
        padding: 20,
        marginBottom: "20px",
        backgroundColor: "#fff",
        borderRadius: "4px"
      }}
      gap="middle"
      justify="space-between"
    >
      <div>
        <Button
          type="primary"
          icon={<SyncOutlined />}
          style={{ marginRight: 12 }}
          onClick={fetch}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleOpenAddUserModal}
        >
          添加用户
        </Button>
      </div>
      <div>
        <Search
          placeholder=""
          allowClear
          defaultValue={keyword}
          onSearch={setKeyword}
          style={{ width: 200 }}
        />
      </div>
    </Flex>
  );
}

export default Toolbar;
