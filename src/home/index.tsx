import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router";
import HeaderComponent from "@/component/header";
import SiderComponent from "@/component/sider";
import ProtectedRouter from "@/component/protected-route";
import styles from "./index.module.css";

const { Header, Sider, Content } = Layout;

function HomeComponent() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className={styles.appShell}>
      <Header className={styles.topBar}>
        <HeaderComponent
          collapsed={collapsed}
          onToggleNavigation={() => setCollapsed(value => !value)}
        />
      </Header>
      <Layout className={styles.body}>
        <Sider
          className={styles.sidebar}
          width={232}
          collapsedWidth={0}
          collapsed={collapsed}
          collapsible
          trigger={null}
          breakpoint="lg"
          onBreakpoint={setCollapsed}
        >
          <SiderComponent collapsed={collapsed} />
        </Sider>
        <Content className={styles.content}>
          <main className={styles.workspace}>
            <Outlet />
          </main>
        </Content>
      </Layout>
    </Layout>
  );
}

function Home() {
  return (
    <ProtectedRouter>
      <HomeComponent />
    </ProtectedRouter>
  );
}

export default Home;
