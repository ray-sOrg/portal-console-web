import { Outlet } from "react-router-dom";
import Nav from "../nav";
import styles from "./index.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <Nav />
      <Outlet />
    </div>
  );
}

export default Home;
