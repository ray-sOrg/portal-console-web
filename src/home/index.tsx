import { Outlet } from "react-router-dom";
import Nav from "../nav";

function Home() {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default Home;
