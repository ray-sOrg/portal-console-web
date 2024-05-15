import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderComponent from "component/header";
import FooterComponent from "component/footer";

const { Header, Sider, Content, Footer } = Layout;

function Home() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <HeaderComponent />
      </Header>
      <Layout>
        <Sider width="25%">Sider</Sider>
        <Content>
          <Outlet />
        </Content>
      </Layout>
      <Footer>
        <FooterComponent />
      </Footer>
    </Layout>
  );
}

export default Home;
