import { Subscription } from "rxjs";
import { useMemoizedFn } from "ahooks";
import { getWeddingMusic } from "@/api";
import { notification } from "antd";
import useMusicListStore from "./userMusicContext";

const useMusicList = () => {
  const { page, keyword, setLoading } = useMusicListStore();

  const fetch = useMemoizedFn(() => {
    setLoading(true);
    let subscription: Subscription | null = null; // 声明 subscription 变量
    try {
      subscription = getWeddingMusic({ ...page, keyword }).subscribe({
        next: data => {
          if (data.code === 200) {
            // 更新 store 中的数据
            useMusicListStore.setState({
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

  const deleteUserFn = useMemoizedFn((uuid: string) => {
    // console.log("deleteUserFn", uuid);
    // deleteUser({ uuid }).subscribe({
    //   next: data => {
    //     if (data.code === 200) {
    //       fetch();
    //     }
    //   },
    //   error: error => {
    //     notification.open({
    //       type: "error",
    //       message: error?.message
    //     });
    //   }
    // });
  });

  return { fetch, deleteUser: deleteUserFn };
};

export default useMusicList;
