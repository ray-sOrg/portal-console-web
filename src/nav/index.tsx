import { Link } from "react-router-dom";
import styles from "./index.module.css";

function Nav() {
  console.log("test");
  return (
    <nav>
      <div className={styles.wrap}>
        <div />
        <div className={styles.title}>
          <Link to="/" className={styles.link}>
            Ray
          </Link>
        </div>
        <div className={styles.images}>
          <Link to="/images">Images</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
