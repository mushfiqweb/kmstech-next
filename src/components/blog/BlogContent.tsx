'use client';

import sanitizeHtml from 'sanitize-html';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import styles from './blog.module.css';
import CodeBlock from './CodeBlock';

interface BlogContentProps {
    content: string; // HTML content (fallback)
    markdown?: string; // Markdown content (preferred)
}

export default function BlogContent({ content, markdown }: BlogContentProps) {
    if (markdown) {
        return (
            <div className={styles.blogContent}>
                <ReactMarkdown
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const isInline = !match; // If no language class, treat as inline code usually, but often block code has it.
                            // Primitives for inline code:
                            if (!match && !String(children).includes('\n')) {
                                return (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }

                            return (
                                <CodeBlock
                                    language={match ? match[1] : ''}
                                    value={String(children).replace(/\n$/, '')}
                                />
                            );
                        },
                        // Handle custom twemoji tag passed by rehype-raw
                        // @ts-ignore
                        twemoji: ({ node, ...props }: any) => <span {...props} />,
                    }}
                >
                    {markdown}
                </ReactMarkdown>
            </div>
        );
    }

    // Fallback for HTML-only content
    const cleanContent = sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'iframe']),
        allowedAttributes: {
            ...sanitizeHtml.defaults.allowedAttributes,
            'iframe': ['src', 'width', 'height', 'title', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'],
            'img': ['src', 'alt', 'width', 'height', 'title']
        },
        allowedSchemes: ['http', 'https', 'mailto', 'tel'],
        allowedSchemesByTag: {
            iframe: ['http', 'https']
        }
    });

    return (
        <div
            className={styles.blogContent}
            dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
    );
}
