import {
  Modal,
  Form,
  FormProps,
  Input,
  Select,
  Button,
  Flex,
  notification
} from "antd";
import { addUser } from "api";

interface Props {
  isModalOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

type FieldType = {
  username: string;
  password: string;
  role: string;
};

const roleOptions = [
  { value: "user", label: "普通用户" },
  { value: "admin", label: "管理员" },
  { value: "super_admin", label: "超级管理员" }
];
const initialValues = { role: "user", username: "", password: "" };

function ModalAddUser(props: Props) {
  const { isModalOpen, onOk, onCancel } = props;

  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    addUser(values).subscribe({
      next: data => {
        if (data.user_id) {
          api.success({ message: `用户${values.username}创建成功～` });
          onOk();
        }
      },
      error: error => {
        api.error({ message: error?.message });
      }
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="添加用户"
        open={isModalOpen}
        footer={null}
        onCancel={onCancel}
      >
        <Form
          name="register"
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 400, marginTop: 12, marginBottom: 12 }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          scrollToFirstError
        >
          <Form.Item<FieldType>
            label="账号"
            name="username"
            rules={[
              { required: true, message: "Please input your username!" },
              { type: "string", min: 6, message: "至少6个字符" }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            label="角色"
            name="role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select
              defaultValue="user"
              style={{ width: 120 }}
              onChange={() => {}}
              options={roleOptions}
            />
          </Form.Item>

          <Flex justify="flex-end" gap="small">
            <Button onClick={onCancel}>取消</Button>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Flex>
        </Form>
      </Modal>
    </>
  );
}

export default ModalAddUser;
