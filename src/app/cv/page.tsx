'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './page.module.css';

export default function CVPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const addHoverEffects = () => {
      try {
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!doc) return;

        // Inyectar SVG filter para ruido en hover
        const svg = doc.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('style', 'display: none;');
        svg.innerHTML = `
          <defs>
            <filter id="cvNoiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.7"
                numOctaves="3"
                result="noise"
                seed="1"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        `;
        doc.body.appendChild(svg);

        // Agregar efectos de hover a elementos de texto
        const textElements = doc.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a');
        textElements.forEach((el) => {
          el.addEventListener('mouseenter', () => {
            (el as HTMLElement).style.filter = 'url(#cvNoiseFilter) brightness(0.95)';
            (el as HTMLElement).style.fontWeight = 'bold';
          });

          el.addEventListener('mouseleave', () => {
            (el as HTMLElement).style.filter = 'none';
            (el as HTMLElement).style.fontWeight = 'inherit';
          });
        });

        // Buscar y ocultar elementos con texto "DESCARGAR"
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
        console.log('No se puede acceder al contenido del iframe');
      }
    };

    // Agregar efectos cuando el iframe carga
    iframe.addEventListener('load', addHoverEffects);

    // Intentar también al poco tiempo
    setTimeout(addHoverEffects, 500);

    return () => {
      iframe.removeEventListener('load', addHoverEffects);
    };
  }, []);

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backBtn}>
        ← Volver
      </Link>

      <iframe
        src="/cv-leo-web.html"
        title="CV Leonardo Martínez"
        className={styles.cvIframe}
        ref={iframeRef}
      />
    </main>
  );
}
