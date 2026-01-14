'use client';

import React from 'react';
import { BlogHeader } from '../blog/BlogHeader';
import { BlogFooter } from '../blog/BlogFooter';
import styles from '../blog/blog.module.css';

interface ExplainerLayoutProps {
    children: React.ReactNode;
}

export function ExplainerLayout({ children }: ExplainerLayoutProps) {
    return (
        <div className={styles.blogContainer}>
            <BlogHeader />
            <main className={styles.blogMain}>
                {children}
            </main>
            <BlogFooter />
        </div>
    );
}
