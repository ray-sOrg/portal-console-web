import { Flex, Button, Input } from "antd";
import { useMemoizedFn } from "ahooks";
import { FileSyncOutlined, SyncOutlined } from "@ant-design/icons";
import useImage from "./useImage";
import userImageStore from "./userImageContext";

const { Search } = Input;

function MusicToolbar() {
  const { fetch } = useImage();
  const { setIsModalOpen } = userImageStore();

  const handleOpenAddModal = useMemoizedFn(() => {
    setIsModalOpen(true);
  });
  const handleFetch = useMemoizedFn(() => fetch());

  return (
    <>
      <Flex
        style={{
          marginBottom: "20px",
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
          <Button
            type="primary"
            icon={<FileSyncOutlined />}
            onClick={handleOpenAddModal}
          >
            新增
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
