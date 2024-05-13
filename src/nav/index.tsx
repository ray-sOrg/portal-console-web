import { Link } from "react-router-dom";
import styles from "./index.module.css";

function Nav() {
  return (
    <nav>
      <div className={styles.wrap}>
        <div>
          <Link to="/images">Images</Link>
        </div>
        <div className={styles.title}>
          <Link to="/">Ray</Link>
        </div>
        <div />
      </div>
    </nav>
  );
}

export default Nav;
