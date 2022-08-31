import { NavItem } from "../../api/contentful/dtos/nav-item";
import { formatUrl } from "../../utils/string-helper";
import styles from './Header.module.scss';

interface Props {
  navItems: NavItem[];
}

export default function Header({ navItems }: Props) {
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} navbar navbar-expand-lg`}>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            {navItems.map(link => (
              <li key={link.urlPath} className="nav-item">
                <a className="nav-link mx-2" href={formatUrl(link.urlPath)}>{link.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
