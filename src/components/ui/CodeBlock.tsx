'use client';

import React, { useState } from 'react';
import { Highlight, type Language } from 'prism-react-renderer';
import github from 'prism-react-renderer/themes/github';
import dracula from 'prism-react-renderer/themes/dracula';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { type Branding } from '@/lib/branding';

interface CodeBlockProps {
  code: string;
  language: Language;
  branding: Branding;
  className?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
}

const availableThemes = {
  github,
  dracula,
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  branding,
  className,
  showLineNumbers = true,
  showCopyButton = true,
}) => {
  const [copied, setCopied] = useState(false);
  const theme = availableThemes[branding.codeBlockTheme ?? 'github'];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="relative group">
      <Highlight
        theme={theme}
        code={code.trim()}
        language={language}
      >
        {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cn(
              'relative p-4 overflow-x-auto rounded-lg text-sm',
              'border border-gray-200 dark:border-gray-700',
              highlightClassName,
              className
            )}
            style={style}
          >
            {showCopyButton && (
              <button
                onClick={copyToClipboard}
                className={cn(
                  'absolute top-2 right-2 p-2 rounded-md',
                  'opacity-0 group-hover:opacity-100 transition-opacity duration-200',
                  'flex items-center justify-center',
                  'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600',
                  'hover:bg-gray-50 dark:hover:bg-gray-700'
                )}
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            )}
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {showLineNumbers && (
                    <span className="select-none text-gray-400 mr-4 text-xs inline-block w-8 text-right">
                      {i + 1}
                    </span>
                  )}
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
};
