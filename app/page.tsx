'use client';

import React from 'react';
import { HeroTitle } from './components/hero-section/HeroTitle';
import { motion } from 'framer-motion';

// Optional: Simple NavBar component for a top menu
const NavBar: React.FC = () => {
  return (
    <nav
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        zIndex: 10,
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Veil</div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="#why-us" style={{ color: '#fff', textDecoration: 'none' }}>
          Why Us
        </a>
        <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>
          Contact
        </a>
        <a href="#blogs" style={{ color: '#fff', textDecoration: 'none' }}>
          Blogs
        </a>
      </div>
    </nav>
  );
};

// Animated background orb
const AnimatedBackground: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.7, scale: 1 }}
      transition={{ duration: 2, ease: 'easeInOut' }}
      style={{
        position: 'absolute',
        top: '30%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, #00bfff, #001f3f)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 1,
      }}
    />
  );
};

const HomePage: React.FC = () => {
  return (
    <motion.div
      // --- Original Framer Motion settings ---
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      // --- Original container styles (plus position: 'relative' for the orb) ---
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '10vw', // Keeps content left-aligned
        backgroundColor: '#000', // Pure black background
        color: 'white',
        margin: 0,
        padding: 0,
        overflow: 'hidden', // Ensures no scroll issues
      }}
    >
      {/* Uncomment to show NavBar */}
      {/* <NavBar /> */}

      <AnimatedBackground />

      {/* Original HeroTitle usage */}
      <HeroTitle />
    </motion.div>
  );
};

export default HomePage;
