import { Menu, MenuProps } from "antd";
import {
  FileJpgOutlined,
  UserOutlined,
  SketchOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];
type MenuClickEventHandler = Required<MenuProps>["onClick"];

const items: MenuItem[] = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: "用户"
  },
  {
    key: "image",
    icon: <FileJpgOutlined />,
    label: "图片管理"
  },
  {
    key: "wedding",
    icon: <SketchOutlined />,
    label: "婚礼"
  },
  {
    key: "chuan-dai",
    icon: <CoffeeOutlined />,
    label: "川傣"
  }
  // {
  //   key: "test",
  //   icon: <ToolOutlined />,
  //   label: "测试"
  // }
];

const getActiveRoute = (pathname: string, items: MenuItem[]): string[] => {
  const activeKeys: string[] = [];
  items.forEach(item => {
    if (item && item.key && pathname.startsWith(`/${item.key}`)) {
      activeKeys.push(item.key as string);
    }
  });
  return activeKeys;
};

const currentPathname = window.location.pathname;
const activeRoutes = getActiveRoute(currentPathname, items);

function Sider() {
  const navigate = useNavigate();

  const handleClick: MenuClickEventHandler = info => {
    if (!info?.key) return;
    navigate(info?.key);
  };

  return (
    <Menu
      style={{ height: "100%" }}
      mode="inline"
      items={items}
      onClick={handleClick}
      defaultSelectedKeys={activeRoutes}
    />
  );
}

export default Sider;
