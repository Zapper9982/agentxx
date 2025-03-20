import { Button, Container, Group, Text } from '@mantine/core';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import classes from './HeroTitle.module.css';

const texts = [
  "Check Broken Links",
  "Analyze SEO",
  "Detect Old Content",
  "Improve Website Performance"
];

export function HeroTitle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={classes.wrapper} style={{ padding: '40px 0', textAlign: 'left' }}>
      <Container size={10000} className={classes.inner}>
        <h1 className={classes.title} style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '10px' }}>
          Your <Text component="span" inherit style={{ color: '#00FFFF' }}>
            one-stop solution
          </Text> to
        </h1>

        <motion.h2
          key={texts[index]}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '2.3rem',
            fontWeight: 700,
            color: '#FFFFFF',
            marginBottom: '15px',
          }}
        >
          {texts[index]}
        </motion.h2>

        <Text className={classes.description} color="gray" style={{ fontSize: '1.1rem', maxWidth: '600px', lineHeight: '1.6' }}>
          Analyze SEO, detect broken links, and optimize your website's performance with cutting-edge tools.
        </Text>

        <Group className={classes.controls} style={{ marginTop: '30px', gap: '15px' }}>
          <Button
            size="lg"
            className={classes.control}
            variant="filled"
            style={{
              backgroundColor: '#00FFFF',
              color: '#000',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            Get Started
          </Button>
        </Group>
      </Container>
    </div>
  );
}
