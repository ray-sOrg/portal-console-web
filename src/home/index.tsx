import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderComponent from "component/header";
import SiderComponent from "component/sider";
import FooterComponent from "component/footer";

const { Header, Sider, Content, Footer } = Layout;

function Home() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <HeaderComponent />
      </Header>
      <Layout>
        <Sider width={200}>
          <SiderComponent />
        </Sider>
        <Content style={{ padding: "12px" }}>
          <div
            style={{
              height: "100%",
              borderRadius: "4px"
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Footer>
        <FooterComponent />
      </Footer>
    </Layout>
  );
}

export default Home;
