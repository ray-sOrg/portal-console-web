import { Menu, MenuProps } from "antd";
import {
  FileJpgOutlined,
  UserOutlined,
  SketchOutlined,
  CoffeeOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router";
import styles from "./index.module.css";

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

interface SiderProps {
  collapsed: boolean;
}

function Sider({ collapsed }: SiderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeRoutes = getActiveRoute(location.pathname, items);

  const handleClick: MenuClickEventHandler = info => {
    if (!info?.key) return;
    navigate(`/${info.key}`);
  };

  return (
    <nav className={styles.navigation} aria-label="主导航">
      <div className={styles.sectionLabel} data-collapsed={collapsed}>
        工作空间
      </div>
      <Menu
        className={styles.menu}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleClick}
        selectedKeys={activeRoutes}
      />
      <div className={styles.navFooter} data-collapsed={collapsed}>
        <span className={styles.footerMark}>R</span>
        <div>
          <strong>Ray Console</strong>
          <span>v0.1 · Internal</span>
        </div>
      </div>
    </nav>
  );
}

export default Sider;
