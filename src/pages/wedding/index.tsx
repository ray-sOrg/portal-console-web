import MusicSvg from "@/assets/svg/music.svg?react";
import ImageSvg from "@/assets/svg/image.svg?react";
import { Tabs } from "antd";
import MusicComponent from "./music";
import ImageComponent from "./image";

const options = [
  {
    key: "music",
    icon: <MusicSvg style={{ position: "relative", top: "2px" }} />,
    label: "音乐",
    children: <MusicComponent />
  },
  {
    key: "image",
    icon: <ImageSvg style={{ position: "relative", top: "2px" }} />,
    label: "图片",
    children: <ImageComponent />
  }
];

function Wedding() {
  return (
    <div style={{ padding: "12px", backgroundColor: "#fff" }}>
      <Tabs
        items={options.map(item => {
          return {
            key: item.key,
            label: item.label,
            icon: item.icon,
            children: item.children
          };
        })}
      />
    </div>
  );
}

export default Wedding;
