'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './blog.module.css';
import { useEffect, useState } from 'react';

interface PaginationProps {
    hasNextPage: boolean;
    endCursor: string | null;
    currentPage: number;
}

export default function Pagination({ hasNextPage, endCursor, currentPage }: PaginationProps) {
    const router = useRouter();
    const [canGoBack, setCanGoBack] = useState(false);

    useEffect(() => {
        // A simple check if we are deeper in history than just entering the page
        // reliable "canGoBack" is hard in browser, but checking history length > 1 is a proxy
        if (window.history.length > 1 && currentPage > 1) {
            setCanGoBack(true);
        }
    }, [currentPage]);

    const handlePrevious = () => {
        router.back();
    };

    return (
        <div className={styles.pagination}>
            {(canGoBack || currentPage > 1) ? (
                <button
                    onClick={handlePrevious}
                    className={styles.paginationBtn}
                    aria-label="Previous Page"
                >
                    <ArrowLeft size={20} />
                    <span>Prev</span>
                </button>
            ) : (
                <button
                    disabled
                    className={styles.paginationBtn}
                    aria-label="Previous Page"
                    style={{ opacity: 0.5 }}
                >
                    <ArrowLeft size={20} />
                    <span>Prev</span>
                </button>
            )}

            <span className={styles.pageIndicator}>{currentPage}</span>

            {hasNextPage && endCursor ? (
                <Link
                    href={`/blogs?after=${endCursor}&page=${currentPage + 1}`}
                    className={styles.paginationBtn}
                    aria-label="Next Page"
                >
                    <span>Next</span>
                    <ArrowRight size={20} />
                </Link>
            ) : (
                <button disabled className={styles.paginationBtn} aria-label="Next Page">
                    <span>Next</span>
                    <ArrowRight size={20} />
                </button>
            )}
        </div>
    );
}
