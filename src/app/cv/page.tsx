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

        // Inyectar CSS para fondo blanco y efectos de hover
        const style = doc.createElement('style');
        style.textContent = `
          /* Cambiar fondo a blanco agresivamente */
          * {
            background-color: initial !important;
          }

          body, html {
            background: #ffffff !important;
            background-color: #ffffff !important;
          }

          body * {
            background: transparent !important;
          }

          /* Efectos de hover en texto */
          p, span, div, a, h1, h2, h3, h4, h5, h6 {
            transition: all 0.3s ease !important;
          }

          p:hover, span:hover, div:hover, a:hover, h1:hover, h2:hover, h3:hover, h4:hover, h5:hover, h6:hover {
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3) !important;
            letter-spacing: 0.5px !important;
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
            const currentWeight = window.getComputedStyle(el).fontWeight;
            if (currentWeight === 'bold') {
              (el as HTMLElement).style.fontWeight = 'inherit';
            }
          });
        });

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
    setTimeout(hideElements, 2500);

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
