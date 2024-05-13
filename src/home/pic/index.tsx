import { Suspense, lazy } from "react";
const LazyImageItem = lazy(() => import("./item"));

const data = [
  "/images/WechatIMG3847.webp",
  "/images/WechatIMG3847-compressed.webp",
  "/images/WechatIMG3454.webp",
  "/images/WechatIMG3454-compressed.webp",
  "/images/WechatIMG3453.webp",
  "/images/WechatIMG3453-compressed.webp"
];

function PicWrap() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      <Suspense fallback={<div>Loading...</div>}>
        {data.map(i => (
          <LazyImageItem key={i} src={i} />
        ))}
      </Suspense>
    </div>
  );
}

export default PicWrap;
