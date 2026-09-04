import { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { useMemoizedFn } from "ahooks";
import { useNavigate } from "react-router";
import { finalize } from "rxjs";
import { login } from "@/api";
import type { FormProps } from "antd";
import styles from "./index.module.css";

type FieldType = {
  username: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = useMemoizedFn(values => {
    setSubmitting(true);

    login(values)
      .pipe(finalize(() => setSubmitting(false)))
      .subscribe({
        next: res => {
          if (res?.code !== 200) {
            notification.error({
              message: "登录失败",
              description: res?.message || "请检查用户名和密码"
            });
            return;
          }

          if (res.data?.uuid) {
            navigate("/");
          }
        },
        error: () => {
          notification.error({
            message: "暂时无法登录",
            description: "请检查网络连接后重试"
          });
        }
      });
  });

  return (
    <main className={styles.page}>
      <section className={styles.brandPanel} aria-label="Ray Console">
        <div className={styles.brandMark} aria-hidden="true">
          R
        </div>
        <div className={styles.brandContent}>
          <p className={styles.eyebrow}>Management workspace</p>
          <h1>Ray Console</h1>
          <p className={styles.brandStatement}>
            清晰掌握每一项内容，专注处理真正重要的工作。
          </p>
        </div>
        <div className={styles.panelFooter}>
          <span>OPERATIONS</span>
          <span>EST. 2024</span>
        </div>
      </section>

      <section className={styles.loginPanel}>
        <div className={styles.mobileBrand}>
          <span className={styles.mobileMark}>R</span>
          <span>Ray Console</span>
        </div>

        <div className={styles.formWrap}>
          <header className={styles.formHeader}>
            <p className={styles.formKicker}>安全登录</p>
            <h2>欢迎回来</h2>
            <p>使用 TT829 统一账号进入管理台。</p>
          </header>

          <Button
            className={styles.submitButton}
            type="primary"
            size="large"
            block
            onClick={() => window.location.assign("/api/auth/oidc/login?app=console")}
          >
            使用统一账号登录
          </Button>

          <div className={styles.legacyDivider}>迁移期间旧账号登录</div>

          <Form<FieldType>
            className={styles.form}
            layout="vertical"
            requiredMark={false}
            onFinish={onFinish}
            autoComplete="on"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <Input
                size="large"
                placeholder="请输入用户名"
                autoComplete="username"
                autoFocus
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                size="large"
                placeholder="请输入密码"
                autoComplete="current-password"
              />
            </Form.Item>

            <Button
              className={styles.submitButton}
              type="primary"
              htmlType="submit"
              size="large"
              loading={submitting}
              block
            >
              {submitting ? "正在登录" : "使用旧账号登录"}
            </Button>
          </Form>

          <p className={styles.securityNote}>仅限授权用户访问</p>
        </div>

        <p className={styles.copyright}>Ray Console · Internal Workspace</p>
      </section>
    </main>
  );
}

export default Login;
