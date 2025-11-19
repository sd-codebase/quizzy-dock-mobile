import React from 'react';
import Markdown from 'react-native-markdown-display';

interface MarkdownRendererProps {
  content: string;
}

/**
 * MarkdownRenderer Component
 * Renders markdown content using react-native-markdown-display
 * With minimal padding for compact display
 */
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Markdown
      style={{
        body: {
          marginTop: 0,
          marginBottom: 0,
          marginHorizontal: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
        },
        paragraph: {
          marginTop: 0,
          marginBottom: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
        },
      }}
    >
      {content}
    </Markdown>
  );
}
