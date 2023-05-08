import { NavLink } from "@remix-run/react";
import styles from "../Page.module.css";
import { Link } from "~/components/navigation/Link";

export function PageNavigation() {
  return (
    <nav title="Main navigation">
      <ul className={styles["page-navigation"]}>
        <li>
          <NavLink to="/">Docs</NavLink>
        </li>
        <li>
          <NavLink to="/showcase">Showcase</NavLink>
        </li>
        <li>
          <Link to="https://github.com/yuschick/horologist">GitHub</Link>
        </li>
      </ul>
    </nav>
  );
}
