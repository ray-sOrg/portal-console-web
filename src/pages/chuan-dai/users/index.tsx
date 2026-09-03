import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Alert, Avatar, Button, Descriptions, Drawer, Empty, Input,
  Select, Skeleton, Table, Tag, Typography
} from "antd";
import { ReloadOutlined, UserOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import {
  getChuanDaiUser, getChuanDaiUsers,
  type ChuanDaiRole, type ChuanDaiUser, type ChuanDaiUserFilters
} from "@/api/chuan-dai-user";
import styles from "./index.module.css";

const ROLE_LABELS = { HOST: "主人", GUEST: "客人" };
const GENDER_LABELS = { MALE: "男", FEMALE: "女", OTHER: "其他" };
const formatTime = (value: string | null) =>
  value && dayjs(value).isValid() ? dayjs(value).format("YYYY-MM-DD HH:mm") : "—";

function RoleTag({ role }: { role: ChuanDaiRole }) {
  return <Tag color={role === "HOST" ? "green" : "default"}>{ROLE_LABELS[role] ?? role}</Tag>;
}

function UserIdentity({ user }: { user: ChuanDaiUser }) {
  return (
    <div className={styles.identity}>
      <Avatar size={40} src={user.avatar || undefined} icon={<UserOutlined />} />
      <div>
        <strong>{user.nickname || user.account}</strong>
        <span>@{user.account}</span>
      </div>
    </div>
  );
}

function UserDetail({ id, onClose }: { id: string; onClose: () => void }) {
  const { data: user, error, isPending, isFetching, refetch } = useQuery({
    queryKey: ["chuan-dai-user", id],
    queryFn: () => getChuanDaiUser(id),
    retry: false,
    gcTime: 0
  });

  return (
    <Drawer title="用户详情" open onClose={onClose} size={520}>
      {error ? (
        <Alert type="error" showIcon title="无法加载用户详情" description={error.message}
          action={<Button loading={isFetching} onClick={() => void refetch()}>重试</Button>} />
      ) : isPending ? <Skeleton active avatar paragraph={{ rows: 8 }} /> : user ? (
        <>
          <div className={styles.detailHeader}>
            <UserIdentity user={user} />
            <RoleTag role={user.role} />
          </div>
          <Descriptions column={1} bordered size="small" items={[
            { key: "id", label: "用户 ID", children: <Typography.Text className={styles.identifier} copyable>{user.id}</Typography.Text> },
            { key: "account", label: "账号", children: user.account },
            { key: "nickname", label: "昵称", children: user.nickname || "未设置" },
            { key: "phone", label: "手机号", children: user.phone || "未绑定" },
            { key: "gender", label: "性别", children: user.gender ? GENDER_LABELS[user.gender] ?? user.gender : "未设置" },
            { key: "birthday", label: "生日", children: user.birthday || "未设置" },
            { key: "bio", label: "个人简介", children: <span className={styles.bio}>{user.bio || "未填写"}</span> },
            { key: "createdAt", label: "注册时间", children: formatTime(user.createdAt) },
            { key: "lastLoginAt", label: "最近登录", children: user.lastLoginAt ? formatTime(user.lastLoginAt) : "暂无登录记录" },
            { key: "updatedAt", label: "资料更新", children: formatTime(user.updatedAt) }
          ]} />
        </>
      ) : null}
    </Drawer>
  );
}

function UserList() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ChuanDaiUserFilters>({
    pageNumber: 1, pageSize: 10, keyword: "", role: ""
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { data, error, isFetching, refetch } = useQuery({
    queryKey: ["chuan-dai-users", filters],
    queryFn: () => getChuanDaiUsers(filters),
    retry: false,
    gcTime: 0
  });
  const filtered = Boolean(filters.keyword || filters.role);
  const resetFilters = () => {
    setSearch("");
    setFilters(current => ({ ...current, keyword: "", role: "", pageNumber: 1 }));
  };
  const columns: ColumnsType<ChuanDaiUser> = [
    { title: "用户", key: "identity", width: 240, render: (_, user) => <UserIdentity user={user} /> },
    { title: "角色", dataIndex: "role", width: 100, render: (role: ChuanDaiRole) => <RoleTag role={role} /> },
    { title: "手机号", dataIndex: "phone", width: 150, render: (phone: string | null) => phone || <span className={styles.muted}>未绑定</span> },
    { title: "注册时间", dataIndex: "createdAt", width: 170, render: formatTime },
    { title: "最近登录", dataIndex: "lastLoginAt", width: 170, render: (value: string | null) => value ? formatTime(value) : <span className={styles.muted}>暂无记录</span> },
    { title: "操作", key: "actions", width: 100, fixed: "right", render: (_, user) => (
      <Button type="link" onClick={() => setSelectedId(user.id)} aria-label={`查看${user.nickname || user.account}的详情`}>查看详情</Button>
    ) }
  ];

  return (
    <section className={styles.page}>
      <header className={styles.pageHeader}>
        <div>
          <p>CHUAN DAI COMMUNITY</p>
          <h1>用户管理</h1>
          <span>查看川傣注册用户、个人资料与最近登录情况。</span>
        </div>
        <div className={styles.summary} aria-live="polite">
          <span>{filtered ? "符合条件的用户" : "注册用户"}</span>
          <strong>{error || !data ? "—" : data.total}<small>人</small></strong>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <Input.Search allowClear aria-label="搜索川傣用户"
            placeholder="搜索账号、昵称或手机号" maxLength={100} value={search}
            onChange={event => {
              setSearch(event.target.value);
              if (!event.target.value) setFilters(current => ({ ...current, keyword: "", pageNumber: 1 }));
            }}
            onSearch={value => setFilters(current => ({ ...current, keyword: value.trim(), pageNumber: 1 }))}
          />
          <Select<ChuanDaiRole | ""> aria-label="用户角色" value={filters.role}
            onChange={role => setFilters(current => ({ ...current, role, pageNumber: 1 }))}
            options={[{ value: "", label: "全部角色" }, { value: "HOST", label: "主人" }, { value: "GUEST", label: "客人" }]} />
          {filtered ? <Button onClick={resetFilters}>重置</Button> : null}
        </div>
        <Button icon={<ReloadOutlined />} loading={isFetching} onClick={() => void refetch()}>刷新</Button>
      </div>

      {error ? (
        <Alert type="error" showIcon title="无法加载川傣用户" description={error.message}
          action={<Button onClick={() => void refetch()} loading={isFetching}>重试</Button>} />
      ) : (
        <Table<ChuanDaiUser> rowKey="id" columns={columns} dataSource={data?.items ?? []}
          loading={isFetching} scroll={{ x: 930 }}
          pagination={{
            current: data?.pageNumber ?? filters.pageNumber,
            pageSize: filters.pageSize, total: data?.total ?? 0,
            showSizeChanger: true, pageSizeOptions: [10, 20, 50, 100],
            showTotal: total => `共 ${total} 位用户`,
            onChange: (pageNumber, pageSize) => setFilters(current => ({
              ...current, pageNumber: pageSize === current.pageSize ? pageNumber : 1, pageSize
            }))
          }}
          locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={isFetching ? "正在加载用户…" : filtered ? "没有找到符合条件的用户" : "暂无注册用户，用户在川傣注册后会显示在这里"}>
            {filtered && !isFetching ? <Button onClick={resetFilters}>清除筛选</Button> : null}
          </Empty> }} />
      )}
      {selectedId ? <UserDetail key={selectedId} id={selectedId} onClose={() => setSelectedId(null)} /> : null}
    </section>
  );
}

export default UserList;
