function PicItem({ src }: { src: string }) {
  return (
    <div style={{ width: "80vw", height: "43.24vw", margin: "48px 0" }}>
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
