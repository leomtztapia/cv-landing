import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const options = [
    {
      title: 'CV',
      href: '/cv',
      icon: '📄',
    },
    {
      title: 'Foto y Video',
      href: 'https://www.leomtztapia.com',
      icon: '📸',
      external: true,
    },
    {
      title: 'Web Design',
      href: '/portafolio-web',
      icon: '🌐',
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.content}>
        <header className={styles.header}>
          <h1>Leonardo Martínez</h1>
          <p>Creatividad Digital</p>
        </header>

        <nav className={styles.grid}>
          {options.map((option) => (
            <a
              key={option.href}
              href={option.href}
              target={option.external ? '_blank' : undefined}
              rel={option.external ? 'noopener noreferrer' : undefined}
              className={styles.card}
            >
              <div className={styles.icon}>{option.icon}</div>
              <h2>{option.title}</h2>
            </a>
          ))}
        </nav>
      </div>

      <footer className={styles.footer}>
        <p>© 2026 Leonardo Martínez. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
