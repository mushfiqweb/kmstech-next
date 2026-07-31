'use client';

import React, { useEffect, useState } from 'react';
import styles from './search-algo.module.css';
import { SEARCH_ALGORITHMS, ALGORITHM_GROUPS } from './algorithmsData';
import { ListFilter } from 'lucide-react';

export function SearchAlgoTOC() {
    const [activeId, setActiveId] = useState<string>('linear-search');

    useEffect(() => {
        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0.1,
            }
        );

        SEARCH_ALGORITHMS.forEach((algo) => {
            const el = document.getElementById(algo.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string, e: React.MouseEvent) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -90;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveId(id);
        }
    };

    return (
        <aside className={styles.tocContainer}>
            <div className={styles.tocTitle}>
                <ListFilter size={16} color="#00ff75" />
                Algorithm Index
            </div>

            <nav className={styles.tocGroupWrapper}>
                {ALGORITHM_GROUPS.map((group) => {
                    const groupAlgos = SEARCH_ALGORITHMS.filter((a) => a.group === group.name);
                    if (groupAlgos.length === 0) return null;

                    return (
                        <div key={group.name} className={styles.tocGroupBlock}>
                            <div className={styles.tocGroupHeader}>{group.name}</div>
                            <ul className={styles.tocList}>
                                {groupAlgos.map((algo) => {
                                    const isActive = activeId === algo.id;
                                    return (
                                        <li key={algo.id} className={styles.tocItem}>
                                            <a
                                                href={`#${algo.id}`}
                                                onClick={(e) => scrollToSection(algo.id, e)}
                                                className={`${styles.tocLink} ${isActive ? styles.active : ''}`}
                                            >
                                                <span>{algo.name}</span>
                                                <span className={styles.tocCategoryTag}>{algo.category}</span>
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
