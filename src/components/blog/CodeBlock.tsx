'use client';

import React, { useState } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Check, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './blog.module.css';

// Register optimized languages if needed, but PrismAsyncLight loads on demand usually
// or we can import specific ones to bundle them. For now, rely on async loading.

interface CodeBlockProps {
    language: string;
    value: string;
    showLineNumbers?: boolean;
}

export default function CodeBlock({ language, value, showLineNumbers = true }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Determine if code is long enough to collapse (e.g. > 15 lines)
    const lineCount = value.split('\n').length;
    const shouldCollapse = lineCount > 20;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy code', err);
        }
    };

    return (
        <div className={styles.codeBlockWrapper}>
            <div className={styles.codeHeader}>
                <span className={styles.codeLanguage}>{language || 'code'}</span>
                <button
                    onClick={handleCopy}
                    className={styles.copyButton}
                    aria-label="Copy to clipboard"
                >
                    {copied ? (
                        <>
                            <Check size={16} />
                            <span>Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={16} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>

            <div
                className={`${styles.codeContainer} ${shouldCollapse && !isExpanded ? styles.collapsed : ''}`}
            >
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    showLineNumbers={showLineNumbers}
                    customStyle={{
                        margin: 0,
                        borderRadius: '0 0 8px 8px',
                        fontSize: '0.9rem',
                        lineHeight: '1.5',
                        background: '#1e1e1e', // Match vscDarkPlus bg
                    }}
                    lineNumberStyle={{
                        minWidth: '2.5em',
                        paddingRight: '1em',
                        paddingLeft: '0.5em',
                        textAlign: 'right',
                        color: '#6e7681',
                        borderRight: '1px solid #444',
                        marginRight: '1em',
                        userSelect: 'none',
                    }}
                    wrapLines={true}
                    wrapLongLines={false} // Allow horizontal scroll
                >
                    {value}
                </SyntaxHighlighter>
            </div>

            {shouldCollapse && (
                <button
                    className={styles.expandButton}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp size={16} /> Show Less
                        </>
                    ) : (
                        <>
                            <ChevronDown size={16} /> Show More
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
