import { useState, useEffect, memo } from "react";
import { Flex, Button, Input, Modal, Popconfirm } from "antd";
import { FileSyncOutlined, SyncOutlined } from "@ant-design/icons";
import { useMemoizedFn } from "ahooks";
import { syncOssImages, watchOssImagesProgress } from "@/api";

const { Search } = Input;

interface Props {
  refetch: () => void;
}

function ImageToolbar(props: Props) {
  const { refetch } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSyncImage = useMemoizedFn(() => {
    syncOssImages().subscribe({
      next: res => {
        if (res.code === 200) {
          let taskId = res.task_id;
          if (taskId) {
            setTaskId(taskId);
            setIsModalOpen(true);

            const sub = setInterval(() => {
              watchOssImagesProgress(taskId).subscribe({
                next: data => {
                  setData(data);
                  // 在这里处理响应数据
                  if (data.data.state === "SUCCESS") {
                    clearInterval(sub); // 停止轮询
                    setSubscription(null); // 清除订阅
                  }
                },
                error: error => {
                  console.error("Error fetching task status:", error);
                  clearInterval(sub); // 发生错误时也停止轮询
                  setSubscription(null); // 清除订阅
                }
              });
            }, 1000);

            setSubscription(sub); // 保存订阅对象
          }
        }
      },
      error: err => {
        console.log(err);
      }
    });
  });

  useEffect(() => {
    if (!isModalOpen && subscription) {
      clearInterval(subscription);
      setSubscription(null); // 清除订阅
    }
  }, [isModalOpen, subscription]);

  return (
    <>
      <Modal
        title="Oss 同步进度"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>{taskId}</p>
        <p>
          <span>{data?.state}</span>：<span>{data?.total}</span>
        </p>
      </Modal>
      <Flex
        style={{
          marginBottom: "20px"
        }}
        gap="middle"
        justify="space-between"
      >
        <div>
          <Button
            type="primary"
            icon={<SyncOutlined />}
            style={{ marginRight: 12 }}
            onClick={refetch}
          />
        </div>
        <div>
          <Popconfirm
            title="确认"
            description="确定同步OSS？"
            okText="确认"
            cancelText="取消"
            onConfirm={handleSyncImage}
            okType="danger"
          >
            <Button danger type="primary" icon={<FileSyncOutlined />}>
              同步OSS
            </Button>
          </Popconfirm>
          <Search
            placeholder=""
            allowClear
            defaultValue={""}
            onSearch={() => {}}
            style={{ width: 200, marginLeft: 8 }}
          />
        </div>
      </Flex>
    </>
  );
}

export default memo(ImageToolbar);
