import { useDebounceEffect } from "ahooks";
import { Subscription } from "rxjs";
import { Table } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { CDN_CONFIG } from "@/config/index";
import userMusicStore from "./userMusicContext";
import useMusic from "./useMusic";
import type { TableProps } from "antd";

function List() {
  const { keyword, page, list } = userMusicStore();

  const { fetch } = useMusic();

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
      title: "ID",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "歌名",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "歌手",
      dataIndex: "artist",
      key: "artist"
    },
    {
      title: "专辑",
      dataIndex: "album",
      key: "album"
    },
    {
      title: "路径",
      dataIndex: "path",
      key: "path",
      render: _val => {
        return `${CDN_CONFIG?.url}/${_val}`;
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <CaretRightOutlined
            onClick={() => {
              window.open(`${CDN_CONFIG?.url}/${record.path}`);
            }}
          />
        );
      }
    }
  ];

  return (
    <div>
      <Table rowKey="id" columns={columns} dataSource={list} />
    </div>
  );
}

export default List;
