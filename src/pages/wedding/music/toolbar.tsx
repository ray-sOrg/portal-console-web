import { Flex, Button, Input } from "antd";
import { FileSyncOutlined, SyncOutlined } from "@ant-design/icons";

const { Search } = Input;

function MusicToolbar() {
  const handleFetch = () => {};
  return (
    <>
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
            onClick={handleFetch}
          />
          <Button type="primary" icon={<FileSyncOutlined />}>
            上传
          </Button>
        </div>
        <div>
          <Search
            placeholder=""
            allowClear
            defaultValue={""}
            onSearch={() => {}}
            style={{ width: 200 }}
          />
        </div>
      </Flex>
    </>
  );
}

export default MusicToolbar;
