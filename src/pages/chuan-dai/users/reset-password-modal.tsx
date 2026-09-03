import { useState } from "react";
import { Alert, Form, Input, Modal, Typography } from "antd";
import {
  resetChuanDaiPassword,
  type ChuanDaiUser,
  type ResetChuanDaiPassword
} from "@/api/chuan-dai-user";

interface Props {
  user: ChuanDaiUser;
  onClose: () => void;
  onSaved: () => void;
}

export default function ResetPasswordModal({ user, onClose, onSaved }: Props) {
  const [form] = Form.useForm<ResetChuanDaiPassword>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (values: ResetChuanDaiPassword) => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      await resetChuanDaiPassword(user.id, values);
      form.resetFields();
      onSaved();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "密码重置失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      title="重置川傣用户密码"
      open
      okText="确认重置"
      cancelText="取消"
      confirmLoading={submitting}
      cancelButtonProps={{ disabled: submitting }}
      closable={!submitting}
      keyboard={!submitting}
      mask={{ closable: !submitting }}
      onCancel={() => { if (!submitting) onClose(); }}
      onOk={() => form.submit()}
    >
      <Typography.Paragraph>
        账号：<Typography.Text strong>{user.account}</Typography.Text>
        {user.nickname ? `（${user.nickname}）` : ""}
      </Typography.Paragraph>
      <Alert
        type="warning"
        showIcon
        title="重置后，旧密码和该用户的所有川傣登录会话将失效。"
        description="无需原密码，请设置新密码后重新登录川傣。"
        style={{ marginBottom: 20 }}
      />
      {error ? <Alert type="error" showIcon title={error} style={{ marginBottom: 16 }} /> : null}
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        disabled={submitting}
        onFinish={submit}
        onValuesChange={() => setError(null)}
      >
        <Form.Item
          label="新密码"
          name="newPassword"
          extra="6–64 位，必须包含字母和数字。"
          rules={[
            { required: true, message: "请输入新密码" },
            { min: 6, max: 64, message: "密码必须为 6–64 位" },
            { pattern: /[a-zA-Z]/, message: "密码需包含字母" },
            { pattern: /[0-9]/, message: "密码需包含数字" }
          ]}
        >
          <Input.Password autoComplete="new-password" maxLength={64} placeholder="请输入新密码" autoFocus />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "请再次输入新密码" },
            ({ getFieldValue }) => ({
              validator(_, value: string) {
                return !value || getFieldValue("newPassword") === value
                  ? Promise.resolve()
                  : Promise.reject(new Error("两次输入的密码不一致"));
              }
            })
          ]}
        >
          <Input.Password autoComplete="new-password" maxLength={64} placeholder="请再次输入新密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
