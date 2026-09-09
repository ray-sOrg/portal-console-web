import { Flex, Button, Input } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import userListStore from "./userListContext";
import useUserList from "./useUserList";

const { Search } = Input;

function Toolbar() {
  const { keyword, setKeyword } = userListStore();
  const { fetch } = useUserList();

  return (
    <Flex
      className="workspace-toolbar"
      style={{
        marginBottom: "20px"
      }}
      gap="middle"
      justify="space-between"
      wrap
    >
      <div className="workspace-toolbar__actions">
        <Button
          type="primary"
          icon={<SyncOutlined />}
          onClick={fetch}
        >
          刷新
        </Button>
      </div>
      <div className="workspace-toolbar__search">
        <Search
          placeholder="搜索用户"
          allowClear
          defaultValue={keyword}
          onSearch={setKeyword}
        />
      </div>
    </Flex>
  );
}

export default Toolbar;
