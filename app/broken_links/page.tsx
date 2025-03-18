'use client';

import { useState, useEffect } from 'react';
import { TextInput, Button, Container, Paper, Text, Stack, Card, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { getErrorLinks } from '../utils/api';

export default function SEOPage() {
  const [url, setUrl] = useState('');
  const [links, setLinks] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const messages = [
    'AAnalyzing links...',
    'SScanning for errors...',
    'IIdentifying broken links...',
    'AAlmost done...',
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  useEffect(() => {
    let cycleInterval;
    if (loading) {
      cycleInterval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % messages.length);
      }, 5000);
    } else {
      setMessageIndex(0);
    }
    return () => cycleInterval && clearInterval(cycleInterval);
  }, [loading]);

  useEffect(() => {
    if (loading) {
      const fullMessage = messages[messageIndex];
      setTypedText('');
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        setTypedText((prev) => prev + fullMessage.charAt(charIndex));
        charIndex++;
        if (charIndex === fullMessage.length) clearInterval(typingInterval);
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [messageIndex, loading]);

  const handleSEOAnalysis = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const data = await getErrorLinks(url);
      const validLinks = data.filter(item => Array.isArray(item.broken_links) && item.broken_links.length > 0);
      setLinks(validLinks);
    } catch (error) {
      console.error('Error fetching broken links:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" pt={40}>
      <Title order={1} align="center" style={{ fontSize: '4rem', fontWeight: 700 }}>
        <span style={{ color: 'lightskyblue' }}>Broken Link</span> Detector
      </Title>
      <Text align="center" color="dimmed" mt={10}>
        Enter a website URL to detect broken links and analyze the page.
      </Text>

      <Card shadow="xl" padding="xl" withBorder style={{ width: '100%', maxWidth: 600, borderRadius: 12, margin: '40px auto' }}>
        <Stack gap={24}>
          <TextInput
            placeholder="Enter website URL"
            rightSection={<IconSearch size={16} />}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            radius="md"
            size="md"
          />
          <Button onClick={handleSEOAnalysis} fullWidth radius="md">
            Analyze Links
          </Button>
        </Stack>
      </Card>

      {(loading || links.length >= 0) && (
        <Paper p="xl" shadow="lg" withBorder mt={40} style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', fontFamily: 'monospace', borderRadius: '8px', width: '100%', padding: '20px', minHeight: '200px' }}>
          <div style={{ padding: '10px 20px', borderBottom: '1px solid #333', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
            <Text ml="auto" style={{ fontSize: '0.8rem' }}>Terminal</Text>
          </div>

          <div style={{ padding: '20px' }}>
            {loading ? (
              <div style={{ whiteSpace: 'pre-wrap' }}>{typedText}</div>
            ) : links.length === 0 ? (
              <div style={{ color: '#50fa7b', fontWeight: 'bold' }}>✔ No broken links found.</div>
            ) : (
              links.map((link, index) => (
                <div key={index} style={{ marginBottom: '1em' }}>
                  <div style={{ color: '#d4d4d4' }}>Broken Link {index + 1}</div>
                  <div style={{ color: '#888' }}>────────────────────────────</div>
                  <div>
                    <span style={{ color: '#d4d4d4' }}>Context: </span>
                    <span style={{ color: '#f8f8f2' }}>{link.context_used || 'N/A'}</span>
                  </div>
                  {link.suggestions?.length > 0 && (
                    <div>
                      <span style={{ color: '#50fa7b' }}>Suggestions: </span>
                      {link.suggestions.map((s, i) => (
                        <div key={i} style={{ color: '#f1fa8c' }}>{s}</div>
                      ))}
                    </div>
                  )}
                  <div style={{ color: '#888', marginTop: '8px' }}>{'─'.repeat(50)}</div>
                </div>
              ))
            )}
          </div>
        </Paper>
      )}

      {!loading && !url && (
        <Text align="center" color="gray" mt={20}>
          Please enter a URL to start.
        </Text>
      )}
    </Container>
  );
}
