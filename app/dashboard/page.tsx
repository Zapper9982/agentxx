'use client';
import { useState, useEffect } from 'react';
import { Container, Card, TextInput, Button, Stack, Title, Text, Paper } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useAnalysis } from '../contexts/Analysiscontext';
import { useRouter } from 'next/navigation';
import { updateContent, addContent, getErrorLinks, analyzeSEO } from '../utils/api';

export default function Dashboard() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUrl, setAnalysisData } = useAnalysis();
  const router = useRouter();

  // Typewriter effect states and messages (unchanged)
  const messages = [
    'Our AI is thinking...',
    'Please wait...',
    'Analyzing your content...',
    'Crunching data...',
    'Almost there...',
    'Processing your request...',
    'Generating insights...',
    'Scanning for patterns...',
    'Refining the output...',
    'Loading smart responses...',
    'Examining possibilities...',
    'Calculating probabilities...',
    'Formulating a response...',
    'Digging into data...',
    'Validating information...',
    'Searching for accuracy...',
    'Compiling relevant details...',
    'Assessing the best outcome...',
    'Interpreting your input...',
    'Making sense of the data...',
    'Understanding the context...'
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
    return () => {
      if (cycleInterval) clearInterval(cycleInterval);
    };
  }, [loading]);

  useEffect(() => {
    if (loading) {
      const fullMessage = messages[messageIndex];
      setTypedText('');
      let charIndex = 0;
      const typingInterval = setInterval(() => {
        setTypedText((prev) => prev + fullMessage.charAt(charIndex));
        charIndex++;
        if (charIndex === fullMessage.length) {
          clearInterval(typingInterval);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [messageIndex, loading]);

  const handleSubmit = async () => {
    if (!urlInput) return;
    setLoading(true);
    const trimmedUrl = urlInput.trim();
    // Save URL in context
    setUrl(trimmedUrl);
    try {
      // Call all API endpoints concurrently
      const [updateRes, addRes, errorRes, seoRes] = await Promise.all([
        updateContent(trimmedUrl),
        addContent(trimmedUrl),
        getErrorLinks(trimmedUrl),
        analyzeSEO(trimmedUrl)
      ]);
      // Store the responses in context
      setAnalysisData({
        update: updateRes,
        add: addRes,
        errorLinks: errorRes,
        seo: seoRes
      });
      // Navigate to a results page (e.g., updatecontent page)
      router.push('/updatecontent');
    } catch (error) {
      console.error("Error fetching analysis data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="md" pt={40}>
      <Title order={1} align="center" style={{ fontSize: '4rem', fontWeight: 700 }}>
        Dashboard
      </Title>
      <Text align="center" color="dimmed" mt={10}>
        Enter a website URL to analyze.
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
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            radius="md"
            size="md"
          />
          <Button onClick={handleSubmit} fullWidth radius="md">
            Analyze URL
          </Button>
        </Stack>
      </Card>
      {loading && (
        <Paper
          p="xl"
          shadow="lg"
          withBorder
          mt={40}
          style={{
            backgroundColor: '#1e1e1e',
            color: '#d4d4d4',
            fontFamily: 'monospace',
            borderRadius: '8px',
            width: '100%',
            padding: '20px',
            minHeight: '200px'
          }}
        >
          <div
            style={{
              padding: '10px 20px',
              borderBottom: '1px solid #333',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
            <Text ml="auto" style={{ fontSize: '0.8rem' }}>Terminal</Text>
          </div>
          <div style={{ padding: '20px', whiteSpace: 'pre-wrap' }}>
            {typedText}
          </div>
        </Paper>
      )}
    </Container>
  );
}
