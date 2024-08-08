import { useQuery } from "@tanstack/react-query";
import { useImmer } from "use-immer";
import { useMemoizedFn } from "ahooks";

import { getAllOssImagePromise } from "@/api";

import ImageToolbar from "./toolbar";
import ImageList from "./list";

function AllImages() {
  const [param, setParam] = useImmer({
    pageNumber: 1,
    pageSize: 20,
    keyword: ""
  });

  const {
    data: apiData,
    isPending,
    refetch
  } = useQuery({
    queryKey: ["listData", param],
    queryFn: () => getAllOssImagePromise(param),
    retry: false
    // enabled: !!userId,
  });

  const handleChangePage = useMemoizedFn((page: number, pageSize: number) => {
    setParam(draft => {
      draft.pageNumber = page;
      draft.pageSize = pageSize;
    });
  });

  return (
    <div style={{ padding: "12px" }}>
      <ImageToolbar refetch={refetch} />
      <ImageList
        loading={isPending}
        param={param}
        data={apiData?.data ?? []}
        total={apiData?.total ?? 0}
        onChangePage={handleChangePage}
      />
    </div>
  );
}

export default AllImages;
