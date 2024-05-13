import { Link } from "react-router-dom";
import styles from "./index.module.css";

function Nav() {
  return (
    <nav>
      <div className={styles.wrap}>
        <div />
        <div className={styles.title}>
          <Link to="/">Ray</Link>
        </div>
        <div className={styles.images}>
          <Link to="/images">Images</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
