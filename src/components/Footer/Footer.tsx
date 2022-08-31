import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span>Website built by</span>
      &nbsp;
      <a href="https://www.joelbalmer.me/" target="_blank" rel="noopener noreferrer">Joel Balmer</a>
    </footer>
  );
}