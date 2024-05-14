import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Sider, Content, Footer } = Layout;

function Home() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>Header</Header>
      <Layout>
        <Sider width="25%">Sider</Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default Home;
