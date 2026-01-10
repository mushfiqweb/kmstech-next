'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './blog.module.css';
import { useEffect, useState } from 'react';

interface PaginationProps {
    currentPage: number;
    totalPosts: number;
    postsPerPage: number;
}

export default function Pagination({ currentPage, totalPosts, postsPerPage }: PaginationProps) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    // Generate page numbers to display
    // Strategy: Always show first, last, and window around current
    // e.g. 1 ... 4 5 6 ... 10
    const getPageNumbers = () => {
        const delta = 1; // Number of pages to show on each side of current
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        return rangeWithDots;
    };

    const pages = getPageNumbers();

    return (
        <div className={styles.paginationWrapper}>
            <div className={styles.paginationInfo}>
                Showing {(currentPage - 1) * postsPerPage + 1}-{Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts} posts
            </div>

            <div className={styles.pagination}>
                {/* Previous Button */}
                {currentPage > 1 ? (
                    <Link
                        href={`/blogs?page=${currentPage - 1}`}
                        className={styles.paginationBtn}
                        aria-label="Previous Page"
                    >
                        <ArrowLeft size={20} />
                        <span className="sr-only-mobile">Prev</span>
                    </Link>
                ) : (
                    <span
                        className={`${styles.paginationBtn} ${styles.disabled}`}
                        aria-disabled="true"
                    >
                        <ArrowLeft size={20} />
                        <span className="sr-only-mobile">Prev</span>
                    </span>
                )}

                {/* Numbered Pages */}
                <div className={styles.pageNumbers}>
                    {pages.map((page, index) => (
                        <div key={index}>
                            {page === '...' ? (
                                <span className={styles.dots}>...</span>
                            ) : (
                                <Link
                                    href={`/blogs?page=${page}`}
                                    className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
                                    aria-current={currentPage === page ? 'page' : undefined}
                                >
                                    {page}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>

                {/* Next Button */}
                {currentPage < totalPages ? (
                    <Link
                        href={`/blogs?page=${currentPage + 1}`}
                        className={styles.paginationBtn}
                        aria-label="Next Page"
                    >
                        <span className="sr-only-mobile">Next</span>
                        <ArrowRight size={20} />
                    </Link>
                ) : (
                    <span
                        className={`${styles.paginationBtn} ${styles.disabled}`}
                        aria-disabled="true"
                    >
                        <span className="sr-only-mobile">Next</span>
                        <ArrowRight size={20} />
                    </span>
                )}
            </div>
        </div>
    );
}
