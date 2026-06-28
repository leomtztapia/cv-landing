'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);

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
      {/* SVG Filter for noise/distortion */}
      <svg style={{ display: 'none' }} width="0" height="0">
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              result="noise"
              seed="2"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="8"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className={styles.container}>
        {/* Left side - Portrait */}
        <motion.div
          className={styles.portraitSection}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className={styles.portraitWrapper}
          >
            <Image
              src="/portrait.jpg"
              alt="Leonardo Martínez"
              width={400}
              height={500}
              priority
              className={isHovering ? styles.portraitDistorted : styles.portrait}
            />
          </motion.div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          className={styles.contentSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <motion.header
            className={styles.header}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h1>leo/mtz/tapia</h1>
          </motion.header>

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
                [{link.label.toLowerCase()}]
              </motion.a>
            ))}
          </nav>
        </motion.div>
      </div>
    </main>
  );
}
