'use client';

import { useState, useEffect } from 'react';
import { TextInput, Button, Container, Paper, Text, Stack, Card, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { updateContent } from '../utils/api';

export default function UpdateContentPage() {
  const [url, setUrl] = useState('');
  const [outdated, setOutdated] = useState([]);
  const [loading, setLoading] = useState(false);

  // Messages to display while loading
  const messages = [
    'OOur AI is thinking...',
    'PPlease wait...',
    'AAnalyzing your content...',
    'CCrunching data...',
    'AAlmost there...'
  ];
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  // Cycle through messages every 5 seconds while loading
  useEffect(() => {
    let cycleInterval;
    if (loading) {
      cycleInterval = setInterval(() => {
        setMessageIndex(prev => (prev + 1) % messages.length);
      }, 5000);
    } else {
      setMessageIndex(0);
    }
    return () => {
      if (cycleInterval) clearInterval(cycleInterval);
    };
  }, [loading]);

  // Typewriter effect for the current message
  useEffect(() => {
    if (loading) {
      const fullMessage = messages[messageIndex];
      setTypedText(''); // Reset the displayed text
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        setTypedText(prev => prev + fullMessage.charAt(charIndex));
        charIndex++;
        if (charIndex === fullMessage.length) {
          clearInterval(typingInterval);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [messageIndex, loading]);

  const handleUpdateContent = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const data = await updateContent(url);
      console.log('Fetched data:', data);
      if (!Array.isArray(data)) {
        console.error('Data is not an array:', data);
      }
      const filtered = Array.isArray(data)
        ? data.filter(item => item.analysis?.outdated === true)
        : [];
      setOutdated(filtered);
    } catch (er) {
      console.error("Error fetching updated data", er);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" pt={40}>
      <Title
        order={1}
        align="center"
        style={{ fontSize: '4rem', fontWeight: 700 }}
      >
        <span style={{ color: "lightskyblue" }}>Content Update</span> Suggestor
      </Title>
      <Text align="center" color="dimmed" mt={10}>
        Enter a website URL to analyze outdated content and get suggestions.
      </Text>
      
      <Card
        shadow="xl"
        padding="xl"
        withBorder
        style={{
          width: '100%',
          maxWidth: 600,
          borderRadius: 12,
          margin: '40px auto'
        }}
      >
        <Stack gap={24}>
          <TextInput
            placeholder="Enter website URL"
            rightSection={<IconSearch size={16} />}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            radius="md"
            size="md"
          />
          <Button onClick={handleUpdateContent} fullWidth radius="md">
            Check for Updates
          </Button>
        </Stack>
      </Card>
      
      {(loading || outdated.length > 0) && (
        <Paper
          p="xl"
          shadow="lg"
          withBorder
          mt={40}
          style={{
            backgroundColor: "#1e1e1e",
            color: "#d4d4d4",
            fontFamily: "monospace",
            borderRadius: "8px",
            width: "100%",
            padding: "20px",
            minHeight: "200px"
          }}
        >
          {/* Terminal header mimicking typical terminal window buttons */}
          <div style={{
            padding: "10px 20px",
            borderBottom: "1px solid #333",
            display: "flex",
            gap: "8px",
            alignItems: "center"
          }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ff5f56" }}></div>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#ffbd2e" }}></div>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#27c93f" }}></div>
            <Text ml="auto" style={{ fontSize: '0.8rem' }}>Terminal</Text>
          </div>
          <div style={{ padding: "20px" }}>
            {loading ? (
              <div style={{ whiteSpace: "pre-wrap" }}>{typedText}</div>
            ) : (
              outdated.map((report, index) => (
                <div key={report.id} style={{ marginBottom: '1em' }}>
                  <div style={{ color: '#d4d4d4' }}>Report {index + 1}</div>
                  <div style={{ color: '#888' }}>────────────────────────────</div>
                  <div>
                    <span style={{ color: '#d4d4d4' }}>ID: </span>
                    <span style={{ color: '#f8f8f2' }}>{report.id}</span>
                  </div>
                  <div>
                    <span style={{ color: '#ff79c6' }}>Reason: </span>
                    <span style={{ color: '#8be9fd' }}>{report.analysis?.reason}</span>
                  </div>
                  {report.analysis?.suggestion && (
                    <div>
                      <span style={{ color: '#50fa7b' }}>Suggestion: </span>
                      <span style={{ color: '#f1fa8c' }}>{report.analysis.suggestion}</span>
                    </div>
                  )}
                  <div style={{
                    fontSize: '0.8em',
                    marginLeft: '20px',
                    marginTop: '4px'
                  }}>
                    <details style={{ cursor: 'pointer' }}>
                      <summary style={{ color: '#bd93f9' }}>Original Content</summary>
                      <div style={{ color: '#6272a4', marginTop: '4px' }}>
                        {report.orignal_content}
                      </div>
                    </details>
                  </div>
                  <div style={{ color: '#888', marginTop: '8px' }}>
                    {'─'.repeat(50)}
                  </div>
                </div>
              ))
            )}
          </div>
        </Paper>
      )}
      
      {!loading && outdated.length === 0 && (
        <Text align="center" color="gray" mt={20}>
          {url ? 'No outdated content found.' : 'Please enter a URL to start.'}
        </Text>
      )}
    </Container>
  );
}
