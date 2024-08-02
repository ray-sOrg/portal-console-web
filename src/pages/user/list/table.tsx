import { Table, Tag, Button, Popconfirm, TablePaginationConfig } from "antd";
import { useCreation } from "ahooks";
import dayjs from "dayjs";
import userListStore from "./userListContext";
import useUserList from "./useUserList";
import type { TableProps } from "antd";
import type { User } from "@/types";

const getRoleColor = (role: string) => {
  switch (role) {
    case "super_admin":
      return "#f2be45";
    case "admin":
      return "#e9e7ef";
    case "user":
      return "#a78e44";
    default:
      break;
  }
};

type TableOnChangeParams = Parameters<
  NonNullable<TablePaginationConfig["onChange"]>
>;

function TableComponent() {
  const { userList, loading, total, setPage } = userListStore();
  const { deleteUser } = useUserList();

  const columns: TableProps<User>["columns"] = useCreation(
    () => [
      {
        title: "用户名",
        dataIndex: "username",
        key: "username"
      },
      {
        title: "角色",
        key: "role",
        dataIndex: "role",
        render: (_, { role, uuid }) => (
          <Tag color={getRoleColor(role)} key={uuid}>
            {role}
          </Tag>
        )
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        render: val => dayjs(val).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        title: "Action",
        key: "action",
        render: (_, { uuid, username }) => (
          <Popconfirm
            title="删除用户"
            description={`确定要删除用户${username}吗？`}
            onConfirm={() => {
              deleteUser(uuid);
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" size="small" danger>
              删除
            </Button>
          </Popconfirm>
        )
      }
    ],
    []
  );

  const handleChangePage: (...args: TableOnChangeParams) => void = (
    page,
    pageSize
  ) => {
    setPage({
      pageNumber: page,
      pageSize: pageSize
    });
  };

  return (
    <Table
      rowKey="uuid"
      loading={loading}
      columns={columns}
      dataSource={userList}
      pagination={{
        size: "small",
        total,
        onChange: handleChangePage
      }}
    />
  );
}

export default TableComponent;
