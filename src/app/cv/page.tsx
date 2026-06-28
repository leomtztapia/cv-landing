'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function CVPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar el CV desde archivo externo
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Volver
        </Link>
        <h1>Curriculum Vitae</h1>
        <p>Leonardo Martínez</p>
      </header>

      <div className={styles.cvContainer}>
        {isLoading && <div className={styles.loader}>Cargando CV...</div>}

        <iframe
          src="/cv-leo-web.html"
          title="CV Leonardo Martínez"
          className={styles.cvIframe}
          onLoad={() => setIsLoading(false)}
        />

        <div className={styles.downloadSection}>
          <p>O descarga tu CV en formato PDF aquí:</p>
          <a href="/cv-leo-web.html" download className={styles.downloadBtn}>
            Descargar PDF ↓
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        <Link href="/">Volver a inicio</Link>
      </footer>
    </main>
  );
}
