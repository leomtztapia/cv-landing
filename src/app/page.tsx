'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import styles from './page.module.css';

export default function Home() {
  const links = [
    {
      label: 'CV',
      href: '/cv',
    },
    {
      label: 'Foto y Video',
      href: 'https://www.leomtztapia.com',
      external: true,
    },
    {
      label: 'Web Design',
      href: '/portafolio-web',
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Left side - Portrait */}
        <motion.div
          className={styles.portraitSection}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Image
            src="/portrait.jpg"
            alt="Leonardo Martínez"
            width={400}
            height={500}
            priority
            className={styles.portrait}
          />
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          className={styles.contentSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <header className={styles.header}>
            <h1>LEONARDO</h1>
            <h1>MARTÍNEZ</h1>
          </header>

          <nav className={styles.nav}>
            {links.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                className={styles.link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                [{link.label}]
              </motion.a>
            ))}
          </nav>
        </motion.div>
      </div>
    </main>
  );
}
