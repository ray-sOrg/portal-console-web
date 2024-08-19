import { Subscription } from "rxjs";
import { useMemoizedFn } from "ahooks";
import {
  getWeddingImage,
  get_oss_credentials,
  deleteWeddingImage,
  editWeddingImage
} from "@/api";
import { notification } from "antd";
import useWeddingImageListStore from "./userImageContext";

const useImageList = () => {
  const { page, keyword, setLoading, setDeleteLoading, setCredentials } =
    useWeddingImageListStore();

  const initOssCredentials = useMemoizedFn(() => {
    try {
      get_oss_credentials("image").subscribe(res => {
        setCredentials(res);
      });
    } catch (error) {}
  });

  const fetch = useMemoizedFn(() => {
    setLoading(true);
    let subscription: Subscription | null = null; // 声明 subscription 变量
    try {
      subscription = getWeddingImage({ ...page, keyword }).subscribe({
        next: data => {
          if (data.code === 200) {
            // 更新 store 中的数据
            useWeddingImageListStore.setState({
              list: data.data,
              total: data.total
            });
          }
        },
        error: error => {
          notification.open({
            type: "error",
            message: error?.message
          });
        },
        complete: () => {
          setLoading(false);
        }
      });
    } catch (error: any) {
      setLoading(false);
      notification.open({
        type: "error",
        message: error?.message
      });
    }
    return subscription; // 返回 subscription
  });

  const deleteImageFn = useMemoizedFn((id: string | number) => {
    setDeleteLoading(true);
    deleteWeddingImage({ id }).subscribe({
      next: data => {
        if (data.code === 200) {
          fetch();
        }
      },
      error: error => {
        notification.open({
          type: "error",
          message: error?.message
        });
      },
      complete: () => {
        setDeleteLoading(false);
      }
    });
  });

  const changeShowImageFn = useMemoizedFn(
    (id: string | number, isShow: boolean) => {
      setLoading(true);
      editWeddingImage({ id, isShow }).subscribe({
        next: data => {
          if (data.code === 200) {
            fetch();
          }
        },
        error: error => {
          notification.open({
            type: "error",
            message: error?.message
          });
        },
        complete: () => {
          setLoading(false);
        }
      });
    }
  );

  return { fetch, initOssCredentials, deleteImageFn, changeShowImageFn };
};

export default useImageList;
