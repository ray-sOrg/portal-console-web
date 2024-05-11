const data = [
  "/images/WechatIMG3847.jpg",
  "/images/WechatIMG3454.jpg",
  "/images/WechatIMG3453.jpg"
];

function Home() {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {data.map(i => (
        <div style={{ width: "80vw", height: "43.24vw", margin: "48px 0" }}>
          <img
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            src={i}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}

export default Home;
