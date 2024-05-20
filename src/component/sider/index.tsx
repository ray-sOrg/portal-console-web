import { Menu, MenuProps } from "antd";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
type MenuClickEventHandler = Required<MenuProps>["onClick"];

const items: MenuItem[] = [
  {
    key: "user",
    icon: <UserOutlined />,
    label: "用户"
  },
  {
    key: "upload",
    icon: <UploadOutlined />,
    label: "上传图片"
  }
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
