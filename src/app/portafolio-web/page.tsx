'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

const projects = [
  {
    id: 1,
    title: 'Straik',
    description: 'Plataforma digital innovadora',
    url: 'www.straik.app',
    fullUrl: 'https://www.straik.app',
    color: '#FF6B6B',
    screenshots: [
      { id: 1, alt: 'Inicio' },
      { id: 2, alt: 'Dashboard' },
      { id: 3, alt: 'Detalles' },
    ],
  },
  {
    id: 2,
    title: 'The Secret Pizza Club',
    description: 'Comunidad gastronómica exclusiva',
    url: 'www.thesecretpizzaclub.com',
    fullUrl: 'https://www.thesecretpizzaclub.com',
    color: '#FFD93D',
    screenshots: [
      { id: 1, alt: 'Inicio' },
      { id: 2, alt: 'Recetas' },
      { id: 3, alt: 'Comunidad' },
    ],
  },
  {
    id: 3,
    title: 'Liga Premium',
    description: 'Plataforma de competiciones deportivas',
    url: 'www.ligapremium.com',
    fullUrl: 'https://www.ligapremium.com',
    color: '#6BCB77',
    screenshots: [
      { id: 1, alt: 'Inicio' },
      { id: 2, alt: 'Torneos' },
      { id: 3, alt: 'Resultados' },
    ],
  },
  {
    id: 4,
    title: 'Ale Picazarri',
    description: 'Portafolio profesional creativo',
    url: 'www.alepicazarri.pages.dev',
    fullUrl: 'https://www.alepicazarri.pages.dev',
    color: '#4D96FF',
    screenshots: [
      { id: 1, alt: 'Inicio' },
      { id: 2, alt: 'Trabajos' },
      { id: 3, alt: 'Contacto' },
    ],
  },
  {
    id: 5,
    title: 'Dr. Valdez',
    description: 'Sitio profesional médico',
    url: 'www.drvaldez.vercel.app',
    fullUrl: 'https://www.drvaldez.vercel.app',
    color: '#9F8EDD',
    screenshots: [
      { id: 1, alt: 'Inicio' },
      { id: 2, alt: 'Servicios' },
      { id: 3, alt: 'Contacto' },
    ],
  },
];

export default function PortafolioWebPage() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [activeScreenshot, setActiveScreenshot] = useState<{ [key: number]: number }>({});

  const handleNextScreenshot = (projectId: number, totalScreenshots: number) => {
    setActiveScreenshot((prev) => ({
      ...prev,
      [projectId]: ((prev[projectId] || 0) + 1) % totalScreenshots,
    }));
  };

  const handlePrevScreenshot = (projectId: number, totalScreenshots: number) => {
    setActiveScreenshot((prev) => ({
      ...prev,
      [projectId]:
        ((prev[projectId] || 0) - 1 + totalScreenshots) % totalScreenshots,
    }));
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← Volver
        </Link>
        <h1>Portafolio Web</h1>
        <p>Proyectos de diseño y desarrollo</p>
      </header>

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <div
            key={project.id}
            className={styles.projectCard}
            onClick={() =>
              setActiveProject(activeProject === project.id ? null : project.id)
            }
          >
            <div className={styles.projectHeader}>
              <h2>{project.title}</h2>
              <span className={styles.arrow}>
                {activeProject === project.id ? '▼' : '▶'}
              </span>
            </div>

            <p className={styles.description}>{project.description}</p>

            <a
              href={project.fullUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.projectLink}
              onClick={(e) => e.stopPropagation()}
            >
              {project.url} →
            </a>

            {activeProject === project.id && (
              <div className={styles.carousel}>
                <div className={styles.screenshotContainer}>
                  <div
                    className={styles.placeholder}
                    style={{
                      backgroundColor: project.color + '20',
                      borderColor: project.color,
                    }}
                  >
                    <div className={styles.placeholderContent}>
                      <span className={styles.screenshot}>📸</span>
                      <p>
                        Screenshot{' '}
                        {(activeScreenshot[project.id] || 0) + 1} de{' '}
                        {project.screenshots.length}
                      </p>
                      <small>
                        {
                          project.screenshots[
                            activeScreenshot[project.id] || 0
                          ].alt
                        }
                      </small>
                    </div>
                  </div>
                </div>

                <div className={styles.carouselControls}>
                  <button
                    className={styles.carouselBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevScreenshot(project.id, project.screenshots.length);
                    }}
                  >
                    ← Anterior
                  </button>

                  <div className={styles.dots}>
                    {project.screenshots.map((_, idx) => (
                      <div
                        key={idx}
                        className={`${styles.dot} ${
                          idx === (activeScreenshot[project.id] || 0)
                            ? styles.activeDot
                            : ''
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    className={styles.carouselBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextScreenshot(project.id, project.screenshots.length);
                    }}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <Link href="/">Volver a inicio</Link>
      </footer>
    </main>
  );
}
