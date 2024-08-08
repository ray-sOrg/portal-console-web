import FavoriteSvg from "@/assets/svg/favorite.svg?react";
import PngSvg from "@/assets/svg/png.svg?react";
import AllImages from "./all-images";
import MyFavorite from "./my-favorite";
import { Tabs } from "antd";

const options = [
  {
    key: "allImages",
    label: "所有图片",
    icon: <PngSvg style={{ position: "relative", top: "2px" }} />,
    children: <AllImages />
  },
  {
    key: "favorite",
    label: "我的收藏",
    icon: <FavoriteSvg style={{ position: "relative", top: "2px" }} />,
    children: <MyFavorite />
  }
];

function ImageList() {
  return (
    <div style={{ backgroundColor: "#fff", padding: 12 }}>
      <Tabs
        defaultActiveKey="2"
        items={options.map(item => {
          return {
            key: item.key,
            label: item.label,
            children: item.children,
            icon: item.icon
          };
        })}
      />
    </div>
  );
}

export default ImageList;
