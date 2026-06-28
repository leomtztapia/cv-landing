'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function CVPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const hideElements = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        // Inyectar CSS para ocultar elementos y cambiar fondo
        const style = doc.createElement('style');
        style.textContent = `
          /* Cambiar fondo a blanco */
          body, html {
            background: #ffffff !important;
          }

          /* Ocultar botón de descarga y elementos innecesarios */
          button[aria-label*="download"],
          button[aria-label*="Descargar"],
          button[aria-label*="PDF"],
          a[href*="download"],
          a[href*="pdf"],
          a[href*="PDF"],
          [class*="download"],
          [class*="Download"],
          [class*="descargar"],
          [class*="Descargar"],
          svg[aria-label*="download"],
          svg[aria-label*="Download"],
          *:has(> ::-webkit-external-text-disabled) {
            display: none !important;
          }

          /* Ocultar cualquier elemento que contenga "DESCARGAR" o "PDF" */
          *:has(> button:contains("DESCARGAR")),
          *:has(> button:contains("PDF")),
          *:has(> a:contains("DESCARGAR")),
          *:has(> a:contains("PDF")) {
            display: none !important;
          }
        `;
        doc.head.appendChild(style);

        // Buscar y ocultar elementos con texto "DESCARGAR" o "PDF"
        const allElements = doc.querySelectorAll('*');
        allElements.forEach((el) => {
          const text = el.textContent || '';
          if (
            (text.includes('DESCARGAR') || text.includes('Descargar')) &&
            (el.tagName === 'BUTTON' || el.tagName === 'A' || el.closest('button') || el.closest('a'))
          ) {
            const button = el.closest('button') || el.closest('a') || el;
            (button as HTMLElement).style.display = 'none';
          }
        });
      } catch (e) {
        // Los iframes de origen diferente no pueden ser accedidos
        console.log('No se puede acceder al contenido del iframe');
      }
    };

    // Intentar ocultar elementos cuando el iframe carga
    iframe.addEventListener('load', hideElements);

    // Intentar inmediatamente también
    setTimeout(hideElements, 500);
    setTimeout(hideElements, 1500);

    return () => {
      iframe.removeEventListener('load', hideElements);
    };
  }, []);

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backBtn}>
        ← Volver
      </Link>

      <iframe
        ref={iframeRef}
        src="/cv-leo-web.html"
        title="CV Leonardo Martínez"
        className={styles.cvIframe}
      />
    </main>
  );
}
