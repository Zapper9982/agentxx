"use client";

import { useEffect, useState } from "react";
import {
  TextInput,
  Button,
  Container,
  Paper,
  Text,
  Loader,
  Code,
  Stack,
  Card,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { addContent } from "../utils/api";

export default function SEOPage() {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddContent = async () => {
    if (!url) return;
    setLoading(true);
    const data = await addContent(url);
    setContent(data);
    setLoading(false);
  };

  return (
    <Container
      size="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card shadow="md" padding="xl" withBorder style={{ width: 500 }}>
        <Stack gap={16} mt="xs">
          <Text component="h2" style={{ textAlign: "center" }}>
            SEO Analyzer
          </Text>

          <TextInput
            placeholder="Enter website URL"
            rightSection={<IconSearch />}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleAddContent} fullWidth>
            Analyze SEO
          </Button>

          {loading && <Loader />}

          {content && (
            <Paper p="md" shadow="xs" withBorder>
              <Text fw={500}>Content Analysis:</Text>
              <Stack gap={16} mt="xs">
                {(Array.isArray(content) ? content : [content]).map(
                  (item, index) => (
                    <Paper key={index} p="sm" shadow="xs" withBorder>
                      {Object.entries(item).map(([key, value]) => (
                        <Text key={key} mt={4}>
                          <strong>{key}:</strong>{" "}
                          {typeof value === "object" && value !== null ? (
                            <pre
                              style={{
                                whiteSpace: "pre-wrap",
                                wordWrap: "break-word",
                              }}
                            >
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          ) : (
                            String(value)
                          )}
                        </Text>
                      ))}
                    </Paper>
                  )
                )}
              </Stack>
            </Paper>
          )}
          
        </Stack>
      </Card>
    </Container>
  );
}
