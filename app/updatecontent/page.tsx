'use client';

import { useState } from 'react';
import { TextInput, Button, Container, Paper, Text, Loader, Code, Stack, Card, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { updateContent } from '../utils/api';

export default function UpdateContentPage() {
  const [url, setUrl] = useState('');
  const [outdated, setOutdated] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleUpdateContent = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const data = await updateContent(url);
      // Filter only objects with analysis.outdated true
      const filtered = data.filter((item: any) => item.analysis?.outdated === true);
      setOutdated(filtered);
    } catch (er) {
      console.error("Error fetching updated data", er);
    }
    setLoading(false);
  };

  return (
    <Container
      size="sm"
 
    >
      <Card shadow="xl" padding="xl" withBorder style={{ width: '100%', maxWidth: 600, borderRadius: 12 }}>
        <Stack gap={24}>
          <Title  order={1}>Check For Updation in Content </Title>
          <Text  color="dimmed">
            Enter a website URL to check for outdated SEO content.
          </Text>
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
          {loading && <Loader variant="dots" />}
          {outdated.length > 0 && (
            <Paper p="md" shadow="sm" withBorder>
              <Title order={3}>Outdated Content</Title>
              <Stack gap={16} mt="md">
                {outdated.map((report) => (
                  <Paper key={report.id} p="md" shadow="xs" withBorder style={{ borderRadius: 8 }}>
                    <Text><strong>ID:</strong> {report.id}</Text>
                    <Text mt="xs"><strong>Reason:</strong> {report.analysis?.reason}</Text>
                    {report.analysis?.suggestion && (
                      <Text mt="xs" color="teal">
                        <strong>Suggestion:</strong> {report.analysis.suggestion}
                      </Text>
                    )}
                    <Text mt="xs" >Original Content:</Text>
                    <Code block>{report.orignal_content}</Code>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          )}
          {!loading && outdated.length === 0 && (
            <Text  color="gray">
              {url ? 'No outdated content found.' : 'Please enter a URL to start.'}
            </Text>
          )}
        </Stack>
      </Card>
    </Container>
  );
}
