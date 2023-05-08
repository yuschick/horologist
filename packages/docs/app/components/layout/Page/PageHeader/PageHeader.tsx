import { Link } from "~/components/navigation/Link";
import styles from "../Page.module.css";
import { PageNavigation } from "../PageNavigation";

export function PageHeader() {
  return (
    <header className={styles["page-header"]}>
      <Link aria-label="Return to home" to="/">
        <img
          className={styles["page-header-logo"]}
          src="/images/horologist-logo-name.svg"
          alt="Horologist name logo"
        />
      </Link>

      <PageNavigation />
    </header>
  );
}
