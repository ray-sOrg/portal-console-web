import Item from "./item";

const data = [
  "/images/WechatIMG3847.webp",
  "/images/WechatIMG3454.webp",
  "/images/WechatIMG3453.webp"
];

function PicWrap() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {data.map(i => (
        <Item key={i} src={i} />
      ))}
    </div>
  );
}

export default PicWrap;
