import { useState } from "react";
import { Flex, Button, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Table from "./table";
import AddModal from "./add-user-modal";

const { Search } = Input;

function User() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenAddUserModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div style={{ padding: "12px" }}>
      <AddModal
        isModalOpen={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      />
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
            onSearch={() => {}}
            style={{ width: 200 }}
          />
        </div>
      </Flex>
      <Table />
    </div>
  );
}

export default User;
