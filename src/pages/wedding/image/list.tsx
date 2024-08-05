import { useDebounceEffect } from "ahooks";
import { Subscription } from "rxjs";
import { Table } from "antd";
import userImageStore from "./userImageContext";
import useImage from "./useImage";
import type { TableProps } from "antd";

function List() {
  const { keyword, page, list } = userImageStore();

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
      title: "title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "artist",
      dataIndex: "artist",
      key: "artist"
    },
    {
      title: "album",
      dataIndex: "album",
      key: "album"
    },
    {
      title: "path",
      dataIndex: "path",
      key: "path"
    }
  ];

  return (
    <div>
      <Table columns={columns} dataSource={list} />
    </div>
  );
}

export default List;
