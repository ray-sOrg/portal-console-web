// @ts-nocheck
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
import useGlobalStore from "@/store";
import { addUser } from "@/api";
import userMusicStore from "./userMusicContext";
import useMusic from "./useMusic";
import type { UploadProps } from "antd";

const { Dragger } = Upload;

type FieldType = {
  title: string;
  artist: string;
  file: any;
  path?: string;
  album?: string;
};

const initialValues = {
  title: "",
  artist: "",
  file: null,
  path: "",
  album: ""
};

function ModalAdd() {
  const credentials = useGlobalStore(state => state.credentials!);
  const { isModalOpen, setIsModalOpen } = userMusicStore();

  console.info("credentials", credentials);

  const { fetch } = useMusic();

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = values => {
    addUser(values).subscribe({
      next: data => {
        if (data.code === 200) {
          notification.open({
            type: "success",
            message: `用户${values.username}创建成功～`
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
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  const handleUploadChange: UploadProps["onChange"] = ({ fileList }) => {
    console.log("Aliyun OSS:", fileList);
    // onChange?.([...fileList]);
  };

  const handleUploadRemove = (file: UploadFile) => {
    const files = (value || []).filter(v => v.url !== file.url);

    // if (onChange) {
    //   onChange(files);
    // }
  };

  const getExtraData: UploadProps["data"] = file => ({
    key: `${OSSData?.dir}${file.name}`,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature
  });

  const handleBeforeUpload: UploadProps["beforeUpload"] = async file => {
    if (!credentials) return false;
    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = Date.now() + suffix;
    file.url = `${credentials.dir}${filename}`;
    return true;
  };

  const handleOk = () => {
    setIsModalOpen(false);
    fetch();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (!credentials) {
    return null;
  }

  return (
    <Modal
      title="添加音乐"
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <Form
        name="add"
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
          label="歌名"
          name="title"
          rules={[
            { required: true, message: "Please input sing name!" },
            { type: "string", min: 1, message: "至少1个字符" }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          name="artist"
          label="歌手"
          rules={[{ required: true, message: "Please input singer name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="专辑"
          name="album"
          rules={[{ required: false }]}
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
