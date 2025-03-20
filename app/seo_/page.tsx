'use client';

import { useState, useEffect } from 'react';
import { Container, Paper, Text, Title, Code, Stack, Button } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { analyzeSEO } from '../utils/api';
import { useAnalysis } from '../contexts/Analysiscontext';

export default function SEOPage() {
  // Use the URL and analysis data from context.
  const { url, analysisData, setAnalysisData } = useAnalysis();
  const [loading, setLoading] = useState(false);

  // Typewriter effect states and messages
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

  // Typewriter effect for current message
  useEffect(() => {
    if (loading) {
      const fullMessage = messages[messageIndex];
      setTypedText('');
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

  // Automatically run SEO analysis if URL exists and SEO data is not yet loaded.
  useEffect(() => {
    if (url && !analysisData?.seoReport) {
      handleSEOAnalysis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleSEOAnalysis = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const data = await analyzeSEO(url);
      // Store the SEO results in context
      setAnalysisData({
        ...analysisData,
        seoReport: data.seo_report,
        keywordData: data.keyword_data || [],
        optimizedHtml: data.optimized_html
      });
    } catch (error) {
      console.error("Error analyzing SEO:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract SEO data from context for display.
  const seoReport = analysisData?.seoReport;
  const keywords = analysisData?.keywordData || [];
  const optimizedMeta = analysisData?.optimizedHtml || '';

  return (
    <Container size="md" pt={40}>
      <Title order={1} align="center" style={{ fontSize: '4rem', fontWeight: 700 }}>
        <span style={{ color: 'lightskyblue' }}>SEO Analyzer</span>
      </Title>
      <Stack gap={16} mt="md">
        {/* Re-run analysis button */}
        <Button onClick={handleSEOAnalysis} fullWidth radius="md">
          Analyze SEO
        </Button>
      </Stack>

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

      {!loading && seoReport && (
        <Paper p="md" shadow="xs" withBorder mt={40} style={{ marginBottom: 16 }}>
          <Text fw={500}>SEO Report:</Text>
          <Stack gap={8} mt="xs">
            {Object.entries(seoReport).map(([key, value]) => (
              <Text key={key}>
                <strong>{key}:</strong> {String(value)}
              </Text>
            ))}
          </Stack>
        </Paper>
      )}

      {!loading && keywords.length > 0 && (
        <Paper p="md" shadow="xs" withBorder mt={20} style={{ marginBottom: 16 }}>
          <Text fw={500}>Keyword Suggestions:</Text>
          <Code block mt="xs">{keywords.join(', ')}</Code>
        </Paper>
      )}

      {!loading && optimizedMeta && (
        <Paper p="md" shadow="xs" withBorder mt={20}>
          <Text fw={500}>Optimized Metadata:</Text>
          <Code block mt="xs">{optimizedMeta}</Code>
        </Paper>
      )}

      {!loading && !seoReport && !keywords.length && !optimizedMeta && url && (
        <Text align="center" color="gray" mt={20}>
          No SEO data available.
        </Text>
      )}
    </Container>
  );
}
