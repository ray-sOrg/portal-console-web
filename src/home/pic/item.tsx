import { MovieScreenWidth, MovieScreenHeight } from "../../utils";

function PicItem({ src }: { src: string }) {
  return (
    <div
      style={{
        width: MovieScreenWidth,
        height: MovieScreenHeight,
        margin: "48px 0"
      }}
    >
      <img
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
        src={src}
        alt=""
      />
    </div>
  );
}

export default PicItem;
