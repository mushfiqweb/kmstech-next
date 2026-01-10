'use client';

import sanitizeHtml from 'sanitize-html';
import styles from './blog.module.css';

interface BlogContentProps {
    content: string; // HTML content
}

export default function BlogContent({ content }: BlogContentProps) {
    // Hashnode returns HTML content. We need to sanitize it before rendering.
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
