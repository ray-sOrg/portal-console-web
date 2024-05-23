import { Button, Form, Input, Flex, notification } from "antd";
import { useMemoizedFn } from "ahooks";
import { useNavigate } from "react-router-dom";
import { login } from "api";
import type { FormProps } from "antd";

type FieldType = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = useMemoizedFn(values => {
    login(values).subscribe(res => {
      if (res?.code !== 200) {
        return notification.open({
          type: "error",
          message: res?.message
        });
      }
      if (res.code === 200) {
        if (res?.token) {
          notification.open({
            type: "success",
            message: `用户${res.data?.username}登录成功～`,
            duration: 800
          });
          setTimeout(() => {
            navigate("/");
          }, 800);
        }
      }
    });
  });

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = useMemoizedFn(
    errorInfo => {
      console.log("Failed:", errorInfo);
    }
  );

  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "60px 0 20px",
        marginTop: "30vh"
      }}
    >
      <Flex justify="center">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </div>
  );
}

export default Login;
