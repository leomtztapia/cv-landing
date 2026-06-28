'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useState } from 'react';
import styles from './page.module.css';

const projects = [
  {
    id: 1,
    name: 'Straik.app',
    description: 'Bowling Tracker APP',
    image: '/projects/straik.svg',
    url: 'https://www.straik.app',
  },
  {
    id: 2,
    name: 'The Secret Pizza Club',
    description: 'Community Platform',
    image: '/projects/placeholder.svg',
    url: 'https://www.thesecretpizzaclub.com',
  },
  {
    id: 3,
    name: 'Liga Premium',
    description: 'Sports Competitions',
    image: '/projects/placeholder.svg',
    url: 'https://www.ligapremium.com',
  },
  {
    id: 4,
    name: 'Ale Picazarri',
    description: 'Creative Portfolio',
    image: '/projects/placeholder.svg',
    url: 'https://www.alepicazarri.pages.dev',
  },
  {
    id: 5,
    name: 'Dr. Valdez',
    description: 'Medical Professional Site',
    image: '/projects/placeholder.svg',
    url: 'https://www.drvaldez.vercel.app',
  },
];

export default function PortafolioWebPage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <main className={styles.main}>
      <Link href="/" className={styles.backBtn}>
        [← volver]
      </Link>

      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Web Design</h1>
        </header>

        <div className={styles.projectsList}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.projectItem}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className={styles.projectContent}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <h2>[{project.name}]</h2>
                  <p>- {project.description}</p>
                </a>
              </div>

              <div className={styles.projectImage}>
                <motion.div
                  className={styles.imageWrapper}
                  animate={
                    hoveredProject === project.id
                      ? { scale: 1.02, filter: 'brightness(0.95)' }
                      : { scale: 1, filter: 'brightness(1)' }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    width={400}
                    height={300}
                    className={styles.image}
                    priority={index === 0}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
