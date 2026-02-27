import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import UserList from "./users";
import MenuList from "./menu";
import PhotoList from "./photos";
import OrderList from "./orders";

const items: TabsProps["items"] = [
  {
    key: "menu",
    label: "菜单",
    children: <MenuList />
  },
  {
    key: "users",
    label: "用户",
    children: <UserList />
  },
  {
    key: "photos",
    label: "照片",
    children: <PhotoList />
  },
  {
    key: "orders",
    label: "订单",
    children: <OrderList />
  }
];

function ChuanDai() {
  const navigate = useNavigate();
  const location = useLocation();

  // 从 URL 获取当前 tab
  const currentTab = location.pathname.split("/").pop() || "users";

  const handleChange = (key: string) => {
    navigate(`/chuan-dai/${key}`);
  };

  return (
    <Tabs
      activeKey={currentTab}
      items={items}
      onChange={handleChange}
    />
  );
}

export default ChuanDai;
