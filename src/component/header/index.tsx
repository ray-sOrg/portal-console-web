import { Avatar, Popconfirm } from "antd";
import { useCreation, useMemoizedFn } from "ahooks";
import useGlobalStore from "@/store";
import { loginOut } from "@/api";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function Header() {
  const user = useGlobalStore(state => state.user);
  const navigate = useNavigate();

  const firstChart = useCreation(
    () => (user ? user?.username?.[0].toUpperCase() : "空"),
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
      <span className={styles.title} onClick={handleHome}>
        Ray
      </span>
      <div className={styles.info}>
        <Avatar shape="square" size={42}>
          {firstChart}
        </Avatar>
        <Popconfirm
          title="确定退出当前用户？"
          okText="是"
          cancelText="否"
          onConfirm={handleLoginOut}
        >
          <span className={styles.loginOut}>退出</span>
        </Popconfirm>
      </div>
    </div>
  );
}

export default Header;
