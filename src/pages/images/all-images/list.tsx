import { memo } from "react";
import { Table, Button } from "antd";
import { useImmer } from "use-immer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CopyOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useCreation } from "ahooks";
import { CDN_CONFIG } from "@/config/index";
import Preview from "./preview";
import type { OssImage } from "@/types";

import styles from "./index.module.css";

interface Props {
  loading: boolean;
  total: number;
  param: { pageNumber: number; pageSize: number; keyword: string };
  data: OssImage[];
  onChangePage: (page: number, pageSize: number) => void;
}

function List(props: Props) {
  const { loading, data, total, param, onChangePage } = props;

  const [modalProps, setModalProps] = useImmer({
    visible: false,
    imageUrl: ""
  });

  const columns = useCreation(
    () => [
      {
        title: "名称",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "路径",
        dataIndex: "path",
        key: "path",
        render: (_val: string) => (
          <div>
            <span>{_val}</span>
            <CopyToClipboard
              text={`${CDN_CONFIG?.url}/${_val}`}
              onCopy={() => {}}
            >
              <CopyOutlined className={styles.copyBtn} />
            </CopyToClipboard>
          </div>
        )
      },
      {
        title: "大小",
        dataIndex: "size",
        key: "size"
      },
      {
        title: "更新时间",
        dataIndex: "upload_time",
        key: "upload_time",
        render: (_val: string) =>
          dayjs(_val).utc().format("YYYY-MM-DD HH:mm:ss")
      },
      {
        title: "最后修改时间",
        dataIndex: "last_modified",
        key: "last_modified",
        render: (_val: string) =>
          dayjs(_val).utc().format("YYYY-MM-DD HH:mm:ss")
      },
      {
        title: "操作",
        dataIndex: "action",
        key: "action",
        render: (_val: string, record: any) => (
          <div>
            <Button
              type="text"
              onClick={() =>
                setModalProps(draft => {
                  draft.visible = true;
                  draft.imageUrl = `${CDN_CONFIG?.url}/${record.path}`;
                })
              }
            >
              预览
            </Button>
          </div>
        )
      }
    ],
    []
  );

  const handleCloseModal = () => {
    setModalProps(draft => {
      draft.visible = false;
      draft.imageUrl = "";
    });
  };

  return (
    <>
      <Preview {...modalProps} onCancel={handleCloseModal} />
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          total,
          pageSize: param.pageSize,
          current: param.pageNumber,
          onChange: onChangePage
        }}
      />
    </>
  );
}

export default memo(List);
