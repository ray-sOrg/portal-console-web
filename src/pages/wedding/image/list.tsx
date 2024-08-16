import { useDebounceEffect } from "ahooks";
import { Subscription } from "rxjs";
import { useImmer } from "use-immer";
import { Table, Button } from "antd";
import { CDN_CONFIG } from "@/config/index";
import userImageStore from "./userImageContext";
import useImage from "./useImage";
import Preview from "./preview";
import type { TableProps } from "antd";

function List() {
  const { keyword, page, list } = userImageStore();
  const [modalProps, setModalProps] = useImmer({
    visible: false,
    imageUrl: ""
  });

  const { fetch } = useImage();

  useDebounceEffect(
    () => {
      let subscription: Subscription | null = fetch();
      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
      };
    },
    [page, keyword],
    { leading: true }
  );

  const columns: TableProps<(typeof list)[number]>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "描述",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "序号",
      dataIndex: "order",
      key: "order"
    },
    {
      title: "图片地址",
      dataIndex: "src",
      key: "src",
      render: _val => {
        return `${CDN_CONFIG?.url}/${_val}`;
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_val: string, record: any) => (
        <Button
          type="text"
          onClick={() =>
            setModalProps(draft => {
              draft.visible = true;
              draft.imageUrl = `${CDN_CONFIG?.url}/${record.src}`;
            })
          }
        >
          预览
        </Button>
      )
    }
  ];

  const handleCloseModal = () => {
    setModalProps(draft => {
      draft.visible = false;
      draft.imageUrl = "";
    });
  };

  return (
    <>
      <Preview {...modalProps} onCancel={handleCloseModal} />
      <Table columns={columns} dataSource={list} />
    </>
  );
}

export default List;
