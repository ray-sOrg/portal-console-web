import { Flex, Button, Input } from "antd";
import { FileSyncOutlined, SyncOutlined } from "@ant-design/icons";
import { useMemoizedFn } from "ahooks";
import { syncOssImages } from "api";

const { Search } = Input;

function ImageToolbar() {
  const handleSyncImage = useMemoizedFn(() => {
    syncOssImages().subscribe({
      next: res => {
        console.log(res);
      },
      error: err => {
        console.log(err);
      }
    });
  });

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
          onClick={() => {}}
        />
        <Button
          type="primary"
          icon={<FileSyncOutlined />}
          onClick={handleSyncImage}
        >
          同步OSS
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
  );
}

export default ImageToolbar;
