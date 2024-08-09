import {
  Modal,
  Form,
  FormProps,
  Input,
  Button,
  Flex,
  notification,
  Upload
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useMemoizedFn, useUpdateEffect } from "ahooks";
import pick from "lodash-es/pick";
import { addWeddingImage } from "@/api";
import userImageStore from "./userImageContext";
import useImage from "./useImage";
import type { UploadProps } from "antd";

const { Dragger } = Upload;

type FieldType = {
  title: string;
  description: string;
  url: string;
  file?: any;
};

const initialValues = {
  title: "",
  description: "",
  file: null,
  url: ""
};

function ModalAdd() {
  const { isModalOpen, setIsModalOpen, credentials } = userImageStore();

  const { fetch, initOssCredentials } = useImage();

  useUpdateEffect(() => {
    if (isModalOpen && !credentials) {
      initOssCredentials();
    }
  }, [isModalOpen]);

  const [form] = Form.useForm<FieldType>();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    const url = values.file?.file?.url;
    if (url) {
      const params = pick(values, ["title", "description"]);
      addWeddingImage({ ...params, url }).subscribe({
        next: data => {
          if (data.code === 200) {
            notification.open({
              type: "success",
              message: "创建成功～"
            });
            form.resetFields();
            handleOk();
          }
        },
        error: error => {
          notification.open({
            type: "error",
            message: error?.message
          });
        }
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = useMemoizedFn(
    errorInfo => {
      console.log("Failed:", errorInfo);
    }
  );

  const handleUploadChange: UploadProps["onChange"] = ({ file }) => {
    if (file.status === "done" && file.url) {
      form.setFieldValue("url", file.url);
    }
  };

  const handleUploadRemove = () => {
    form.setFieldValue("file", null);
  };

  const getExtraData: UploadProps["data"] = useMemoizedFn(file => ({
    key: `${credentials?.dir}${file.name}`,
    OSSAccessKeyId: credentials?.accessId,
    policy: credentials?.policy,
    Signature: credentials?.signature
  }));

  const handleBeforeUpload: UploadProps["beforeUpload"] = useMemoizedFn(
    async file => {
      if (!credentials) return false;
      file.url = `${credentials.dir}${file.name}`;
      return true;
    }
  );

  const handleOk = useMemoizedFn(() => {
    setIsModalOpen(false);
    fetch();
  });

  const handleCancel = useMemoizedFn(() => {
    setIsModalOpen(false);
  });

  if (!credentials) {
    return null;
  }

  return (
    <Modal
      title="添加展示图片"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        name="add-form"
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
          label="标题"
          name="title"
          rules={[
            { required: true, message: "Please input sing name!" },
            { type: "string", min: 1, message: "至少1个字符" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          name="description"
          label="描述"
          rules={[{ required: true, message: "Please input singer name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="文件"
          name="file"
          rules={[{ required: true }]}
        >
          <Dragger
            name="file"
            multiple={false}
            action={credentials.host}
            onChange={handleUploadChange}
            onRemove={handleUploadRemove}
            data={getExtraData}
            beforeUpload={handleBeforeUpload}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
        </Form.Item>

        <Flex justify="flex-end" gap="small">
          <Button onClick={handleCancel}>取消</Button>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
}

export default ModalAdd;
