import { Avatar, Button, Popconfirm, Tooltip } from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from "@ant-design/icons";
import { useCreation, useMemoizedFn } from "ahooks";
import useGlobalStore from "@/store";
import { loginOut } from "@/api";
import { useLocation, useNavigate } from "react-router";
import styles from "./index.module.css";

interface HeaderProps {
  collapsed: boolean;
  onToggleNavigation: () => void;
}

const routeTitles: Record<string, { eyebrow: string; title: string }> = {
  user: { eyebrow: "Workspace", title: "用户管理" },
  image: { eyebrow: "Media library", title: "图片管理" },
  wedding: { eyebrow: "Wedding studio", title: "婚礼内容" },
  "chuan-dai": { eyebrow: "Chuan Dai", title: "川傣管理" }
};

function Header({ collapsed, onToggleNavigation }: HeaderProps) {
  const user = useGlobalStore(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const rootRoute = location.pathname.split("/").filter(Boolean)[0] ?? "user";
  const pageMeta = routeTitles[rootRoute] ?? {
    eyebrow: "Ray Console",
    title: "管理中心"
  };

  const firstChart = useCreation(
    () => (user?.username?.[0] ? user.username[0].toUpperCase() : "R"),
    [user]
  );

  const handleLoginOut = useMemoizedFn(() => {
    loginOut().subscribe(res => {
      if (res.code === 200) {
        navigate("/login");
      }
    });
  });

  const handleHome = useMemoizedFn(() => {
    navigate("/");
  });

  return (
    <div className={styles.header}>
      <div className={styles.leading}>
        <button
          className={styles.brand}
          type="button"
          onClick={handleHome}
          aria-label="返回 Ray Console 首页"
        >
          <span className={styles.brandMark} aria-hidden="true">R</span>
          <span className={styles.brandName}>Ray Console</span>
        </button>

        <Tooltip title={collapsed ? "展开导航" : "收起导航"}>
          <Button
            className={styles.menuButton}
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggleNavigation}
            aria-label={collapsed ? "展开导航" : "收起导航"}
          />
        </Tooltip>

        <div className={styles.pageIdentity}>
          <span>{pageMeta.eyebrow}</span>
          <strong>{pageMeta.title}</strong>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.status}>
          <i aria-hidden="true" />
          <span>系统在线</span>
        </div>
        <div className={styles.userMeta}>
          <strong>{user?.username ?? "Ray 用户"}</strong>
          <span>{user?.role?.replaceAll("_", " ") ?? "member"}</span>
        </div>
        <Avatar className={styles.avatar} size={38}>
          {firstChart}
        </Avatar>
        <Popconfirm
          title="确定退出当前用户？"
          okText="是"
          cancelText="否"
          onConfirm={handleLoginOut}
        >
          <Button
            className={styles.logoutButton}
            type="text"
            icon={<LogoutOutlined />}
            aria-label="退出登录"
          >
            退出
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default Header;
