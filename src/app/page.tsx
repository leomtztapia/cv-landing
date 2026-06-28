import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const options = [
    {
      title: 'Portafolio Foto & Video',
      description: 'Trabajos de fotografía y videografía',
      href: 'https://www.leomtztapia.com',
      icon: '📸',
      external: true,
    },
    {
      title: 'Curriculum Vitae',
      description: 'Experiencia, educación y habilidades',
      href: '/cv',
      icon: '📄',
    },
    {
      title: 'Portafolio Web',
      description: 'Proyectos de diseño y desarrollo web',
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
              <p>{option.description}</p>
              <span className={styles.arrow}>→</span>
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
