'use client';

import { useState } from 'react';
import { TextInput, Button, Container, Paper, Text, Loader, Code, Stack, Card, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { analyzeSEO } from '../utils/api';

export default function SEOPage() {
  const [url, setUrl] = useState('');
  const [seoReport, setSeoReport] = useState<any>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [optimizedMeta, setOptimizedMeta] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSEOAnalysis = async () => {
    if (!url) return;
    setLoading(true);
    const data = await analyzeSEO(url);
    setSeoReport(data.seo_report);
    setKeywords(data.keyword_data || []);
    setOptimizedMeta(data.optimized_html);
    setLoading(false);
  };

  return (
    <Container
      size="sm"
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <Card shadow="md" padding="xl" withBorder style={{ width: 500 }}>
        <Stack gap={16} mt="xs">
          <Text component="h2" style={{ textAlign: 'center' }}>SEO Analyzer</Text>
          
          <TextInput
            placeholder="Enter website URL"
            rightSection={<IconSearch />}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleSEOAnalysis} fullWidth>
            Analyze SEO
          </Button>

          {loading && <Loader />}

          {seoReport && (
            <Paper p="md" shadow="xs" withBorder>
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

          {keywords.length > 0 && (
            <Paper p="md" shadow="xs" withBorder>
              <Text fw={500}>Keyword Suggestions:</Text>
              <Code block mt="xs">{keywords.join(', ')}</Code>
            </Paper>
          )}

          {optimizedMeta && (
            <Paper p="md" shadow="xs" withBorder>
              <Text fw={500}>Optimized Metadata:</Text>
              <Code block mt="xs">{optimizedMeta}</Code>
            </Paper>
          )}
        </Stack>
      </Card>
    </Container>
  );
}
