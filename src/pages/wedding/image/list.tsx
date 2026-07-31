import { Switch } from "antd";
import { useDebounceEffect } from "ahooks";
import { Subscription } from "rxjs";
import { useImmer } from "use-immer";
import { Table, Button, Popconfirm } from "antd";
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

  const { fetch, deleteImageFn, changeShowImageFn } = useImage();

  useDebounceEffect(
    () => {
      const subscription: Subscription | null = fetch();
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
      title: "是否显示",
      dataIndex: "is_show",
      key: "is_show",
      render: (_val: boolean, record) => (
        <Switch
          checkedChildren="显示"
          unCheckedChildren="隐藏"
          checked={_val}
          onClick={() => {
            changeShowImageFn(record.id, !_val);
          }}
        />
      )
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
      render: (_val: string, record) => (
        <>
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

          <Popconfirm
            title="确认删除这条数据吗？"
            onConfirm={() => deleteImageFn(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button danger type="text">
              删除
            </Button>
          </Popconfirm>
        </>
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
